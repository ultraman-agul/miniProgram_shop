// pages/goods_detail/goods_detail.js
// 路径补全，解构出函数 request
import { request } from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {}
  },
  // 商品数据
  GoodsInfo: {},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    const { goods_id } = options
    this.getGoodsDetail(goods_id)
  },
  // 获取商品详情数据
  async getGoodsDetail(goods_id) {
    const goodsObj = await request({url: '/goods/detail', data: {goods_id}})
    this.GoodsInfo = goodsObj
    this.setData({
      goodsObj: {
        // 只传递用得上的数据
        goods_name: goodsObj.goods_name,
        goods_price: goodsObj.goods_price,
        // 部分iphone手机不支持.webp格式，最好找后台修改
        //这里手动临时修改.webp=>.jpg
        goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics: goodsObj.pics,
      }
    })
    console.log(this.data.goodsObj)
  },
  // 图片预览
  handlePreviewImage(e){
    // 获取图片链接的数组
    const urls = this.GoodsInfo.pics.map(v => v.pics_mid)
    // 获取当前点击预览的图片链接
    const current = e.currentTarget.dataset.url
    // 预览功能
    wx.previewImage({
      current, // 当前显示图片的http链接
      urls // 需要预览的图片http链接列表
    })
  },
  // 加入购物车
  handleCartAdd(){
    // console.log('添加购物车')
    let cart = wx.getStorageSync("cart") || [];
    let index = cart.findIndex(v => v.goods_id === this.GoodsInfo.goods_id)
    if (index === -1) {
      // 购物车不存在,首次添加到购物车
      this.GoodsInfo.num = 1
      cart.push(this.GoodsInfo)
    }else{
      // 存在++
      cart[index].num++
    }
    //设置到存储中
    wx.setStorageSync("cart", cart)
    // 弹框提示
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      mask: true,
    });
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