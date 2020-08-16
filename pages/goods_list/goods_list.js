// pages/goods_list/goods_list.js
// 路径补全，解构出函数 request
import { request } from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: '综合',
        isActive: true
      },
      {
        id: 1,
        value: '销量',
        isActive: false
      },
      {
        id: 2,
        value: '价格',
        isActive: false
      },
    ],
    goodsList: [],
    // 数据页数
    totalPages: 0
  },
  // 接口要用的参数
  QueryInfo: {
    query: '',
    cid: 0,
    pagenum: 1,
    pagesize: 10
  },
  // tab点击改变时
  handleTabItemChange(e) {
    //获取tab索引
    const {index} = e.detail
    let {tabs} = this.data
    // 修改原数组
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false)
    // 复制到data
    this.setData({
      tabs
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryInfo.cid = options.cid || ""
    this.QueryInfo.query = options.query || ""
    this.getGoodsList()
  },
  // 获取商品列表
  async getGoodsList() {
    const res = await request({url: '/goods/search',data: this.QueryInfo})

    //总数据条数
    const total = res.total
    this.totalPages = Math.ceil(total/this.QueryInfo.pagesize)
    // console.log(this.totalPages)
    this.setData({
      // 拼接下一页数据
      goodsList: [...this.data.goodsList, ...res.goods]
    })
    wx.stopPullDownRefresh()
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

  },
  // 到达页面底部
  onReachBottom() {
    if(this.QueryInfo.pagenum >= this.totalPages)
    {
      wx.showToast({
        title: '没有更多数据了'
      });
    }
    else {
      this.QueryInfo.pagenum++
      this.getGoodsList()
    }
    // console.log('俺是个就爱上了高科技')
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.setData({
      goodsList: []
    })
    this.QueryInfo.pagenum = 1
    this.getGoodsList()
  }
})