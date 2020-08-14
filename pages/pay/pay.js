import { getSetting, chooseAddress, openSetting, showModal, showToast, requestPayment} from '../../utils/asyncWx.js'
import { request } from "../../request/index.js"

Page({
  data: {
    // 地址信息
    address: {},
    // 购物车数据
    cart: [],
    // 总价格
    totalPrice: 0,
    // 总数量
    totalNum: 0
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 获取缓存中的收货地址数据
    const address = wx.getStorageSync("address")
    // 获取缓存中的购物车数据
    let cart = wx.getStorageSync("cart") || []
    // 过滤选中的商品
    cart = cart.filter(v => v.checked)
    let totalPrice = 0
    let totalNum = 0
    cart.forEach(v => {
      totalNum += v.num
      totalPrice += v.goods_price * v.num 
    })
    this.setData({
      address,
      cart,
      totalNum,
      totalPrice
    })
  },
  async handleToPay() {
   try{
      // 判断是否存在token，没有则跳转授权页面
      const token = wx.getStorageSync("token")
      if(!token) {
        wx.navigateTo({
          url: '/pages/auth/auth'
        })
        return ;
      }
      // 创建订单
      // 准备请求头
      // const header = { Authorization: token }
      // 准备请求体参数
      const order_price = this.data.totalPrice
      const consignee_addr = this.data.address.all
      let goods = []
      const {cart} = this.data
      cart.forEach(v => goods.push({
        goods_id: v.goods_id,
        goods_number: v.num,
        goods_price: v.goods_price
      }))
      const orderParams = {order_price, consignee_addr, goods}
      // 发送请求，创建订单，获取订单号
      const {order_number} = await request({url:'/my/orders/create', method:"POST", data: orderParams})
      // 发送请求，预支付接口
      const {pay} = await request({url: '/my/orders/req_unifiedorder', method:"POST", data: {order_number}})
      // 发起微信支付,这里没有开通微信支付功能，注释了下面代码
      // await requestPayment(pay)
      // 查询后台支付状态
      await request({url: '/my/orders/chkOrder', method:'POST',data:{order_number}})
      // 支付成功
      await showToast({content: '支付成功'})
      // 删除（过滤掉）购物车选中的商品，存入缓存中
      let newCart = wx.getStorageSync("cart")
      newCart = newCart.filter(v =>!v.checked)
      wx.setStorageSync("cart", newCart)
      // 跳转到订单页面
      wx.navigateTo({url: '/pages/order/order'})
    }catch(error){
      await showToast({content:'支付失败'})
    }
  }
})