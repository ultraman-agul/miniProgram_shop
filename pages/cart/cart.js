// pages/cart/cart.js
import { getSetting, chooseAddress, openSetting } from '../../utils/asyncWx.js'
Page({

  /**
   * 页面的初始数据
   */
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
      address,
      cart,
      allChecked,
      totalNum,
      totalPrice
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})