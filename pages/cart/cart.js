import { getSetting, chooseAddress, openSetting, showModal, showToast} from '../../utils/asyncWx.js'
Page({
  data: {
    // 地址信息
    address: {},
    // 购物车数据
    cart: [],
    // 是否全部选中
    allChecked: false,
    // 总价格
    totalPrice: 0,
    // 总数量
    totalNum: 0
  },
  // 获取用户地址
  async handleAddress() {
    try{ 
       // 获取权限状态
    const res1 = await getSetting()
    const scopeAddress = res1.authSetting["scope.address"]
    //判断权限状态
    if(scopeAddress===false) {
      // 用户拒绝过授权,带领用户前往授权
      await openSetting()
    }  
    // 调用收货地址api
    const address = await chooseAddress()
      // 拼接完整地址
      address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
      // 将数据存储到本地存储中
      wx.setStorageSync("address", address);
    } catch(error) {
    console.log(error)
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 获取缓存中的收货地址数据
    const address = wx.getStorageSync("address")
    // 获取缓存中的购物车数据
    const cart = wx.getStorageSync("cart") || []
    // 判断购物车数组是否全部为选中
    // const allChecked = cart.length ? cart.every(v=>v.checked) : false
    this.setCart(cart)
    this.setData({
      address
    })
  },
  // 修改选中状态
  handleItemChange(e) {
    // 获取商品id
    const goods_id = e.currentTarget.dataset.id
    // 获取cart数组
    let {cart} = this.data
    // 根据商品id获取索引
    let index = cart.findIndex(v => v.goods_id === goods_id)
    // 改变选中状态
    cart[index].checked = !cart[index].checked
    // 将数据设置到data和缓存中
    this.setData({
      cart
    })
    this.setCart(cart)
    wx.setStorageSync("cart", cart)
  },
  // 设置购物车状态和修改底部数据
  setCart(cart) {
    wx.setStorageSync("cart", cart)
    let allChecked = true
    let totalPrice = 0
    let totalNum = 0
    cart.forEach(v => {
      if(v.checked){
        totalNum += v.num
        totalPrice += v.goods_price * v.num 
      }else{
        allChecked = false
      }
    })
    // 判断购物车是否为空数组
    allChecked = cart.length != 0 ? allChecked : false
    this.setData({
      cart,
      allChecked,
      totalNum,
      totalPrice
    })
  },
  // 全选和反选的复选框
  allCheckChange() {
    let {cart, allChecked} = this.data
    allChecked = !allChecked
    // 修改cart数组中每个项的checked和allChecked一致
    cart.forEach(v => v.checked = allChecked)
    this.setCart(cart)
  },
  // 修改商品数量
  async handleNumEdit(e) {
    const {operation, id} = e.currentTarget.dataset
    // console.log(operation, id)
    let {cart} = this.data
    const index = cart.findIndex(v => v.goods_id === id)
    if(cart[index].num === 1 && operation === -1) {
      const res = await showModal({content:'您确定删除该商品吗'})
      if (res.confirm) {
        cart.splice(index, 1)
        this.setCart(cart)
      }
    }else{
      cart[index].num = cart[index].num + operation
      this.setCart(cart)
    }
  },
  // 结算功能
  async handlePay() {
    const {address, totalNum} = this.data
    // 没有选择收货地址
    if(!address.userName) {
      await showToast({content: '请选择收货地址'})
      return ;
    }
    // 没有选择商品
    if(totalNum === 0) {
      await showToast({content: '请选择购买的商品'})
      return ;
    }
    wx.navigateTo({
      url: '/pages/pay/pay'
    })
  }
})