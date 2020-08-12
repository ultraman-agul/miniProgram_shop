// 路径补全，解构出函数 request
import { request } from "../../request/index.js"
// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧大菜单列表数据
    leftMenuList:[],
    // 右侧菜单列表数据
    rightContent: [],
    // 当前选中分类索引
    currentIndex: 0,
    // 滚动条在最上方
    scrollTop: 0
  },
  // 请求获取的数据
  Cates: [],
  // 点击左侧菜单的效果
  handleItemTap(e){
    const { index } = e.currentTarget.dataset
    let rightContent = this.Cates[index].children
    this.setData({
      rightContent,
      currentIndex: index,
      // 重新设置scroll-view 距离顶部的距离
      scrollTop: 0
    })
     
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //1 获取本地存储的数据
    const Cates = wx.getStorageSync("cates")
    if(!Cates) {
      // 不存在
      this.getCates()
    }else{
      // 有旧的数据 ，判断是否过期
      if(Date.now() - Cates.time > 1000*300){
        // 超时
        this.getCates()
      }else{
        // 未超时，可以使用
        this.Cates = Cates.data
        let leftMenuList = this.Cates.map(v => v.cat_name)
        let rightContent = this.Cates[0].children
        this.setData({
          leftMenuList,
          rightContent
      })
    }
    }
      
  },
  // 获取左侧菜单
   async getCates() {
    // request({ url: '/categories'} ).then(result => {
    //     this.Cates = result.data.message
    //     // 把接口数据存进本地存储中
    //     wx.setStorageSync("cates", {time:Date.now(), data:this.Cates});
          
    //     // 左侧菜单
    //     let leftMenuList = this.Cates.map(v => v.cat_name)
    //     let rightContent = this.Cates[0].children
    //     this.setData({
    //       leftMenuList,
    //       rightContent
    //   })
    // })
    // 使用es7 的async await语法
    const res = await request({url:'/categories'})
    this.Cates = res
        // 把接口数据存进本地存储中
        wx.setStorageSync("cates", {time:Date.now(), data:this.Cates});          
        // 左侧菜单
        let leftMenuList = this.Cates.map(v => v.cat_name)
        let rightContent = this.Cates[0].children
        this.setData({
          leftMenuList,
          rightContent
      })
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