import { request } from "../../request/index.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: '全部',
        isActive: true
      },
      {
        id: 1,
        value: '待付款',
        isActive: false
      },
      {
        id: 2,
        value: '待发货',
        isActive: false
      },
      {
        id: 3,
        value: '退款/退货',
        isActive: false
      }
    ],
    orders: []
  },
  onShow(){
    // 判断当前是否有token
    const token = wx.getStorageSync("token");
    if(!token){
      wx.navigateTo({
        url: '/pages/auth/auth'
      })
      return ;
    }

    // 拿参数type
    let pages =  getCurrentPages();
    let currentPage = pages[pages.length -1]
    console.log(currentPage.options)
    // 发起请求
    const {type} = currentPage.options
    // 显示对应的tab页
    this.titleChangeByIndex(type-1)
    this.getOrders(type)

  },
  async getOrders(type){
    const res = await request({url:'/my/orders/all',data:{type}})
    this.setData({
      orders: res.orders.map(v=>({...v,create_time_cn: new Date(v.create_time*1000).toLocaleString()}))
    })
  },
  // tab点击改变时
  handleTabItemChange(e) {
    //获取tab索引
    const {index} = e.detail
    this.titleChangeByIndex(index)
    // 重新发送请求
    this.getOrders(index+1)
  },
  titleChangeByIndex(index) {
    let {tabs} = this.data
    // 修改原数组
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false)
    // 复制到data
    this.setData({
      tabs
    })
  }
})