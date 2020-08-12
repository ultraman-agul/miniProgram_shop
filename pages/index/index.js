// 路径补全，结构出函数 request
import { request } from "../../request/index.js"
//Page Object
Page({
  data: {
    swiperList: [],
    cateList: [],
    floorList: []
  },
  //options(Object)
  onLoad: function(options) {
    // 异步请求获取轮播图数据
    // var reqTask = wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success: (result) => {
    //     this.setData({
    //       swiperList: result.data.message
    //     })
    //   }
    // });
    this.getSwiperList()
    this.getCateList()
    this.getFloorList()
  },
  // 获取轮播图列表
  getSwiperList() {
    request({ url: '/home/swiperdata'} ).then(result => {
      this.setData({
        swiperList: result
      })
    })  
  }, 
  // 获取分类图片列表
  getCateList() {
    request({ url: '/home/catitems'} ).then(result => {
      this.setData({
        cateList: result
      })
    })  
  }, 
  // 获取楼层数据
  getFloorList() {
    request({ url: '/home/floordata'} ).then(result => {
      this.setData({
        floorList: result
      })
    }) 
  },
  onReady: function() {
    
  },
  onShow: function() {
    
  },
  onHide: function() {

  },
  onUnload: function() {

  },
  onPullDownRefresh: function() {

  },
  onReachBottom: function() {

  },
  onShareAppMessage: function() {

  },
  onPageScroll: function() {

  },
  //item(index,pagePath,text)
  onTabItemTap:function(item) {

  }
});
  