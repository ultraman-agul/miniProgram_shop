// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: '体验问题',
        isActive: true
      },
      {
        id: 1,
        value: '商品、商家投诉',
        isActive: false
      }
    ]
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
  }

})