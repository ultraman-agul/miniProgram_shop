
Page({
  data: {
    tabs: [
      {
        id: 0,
        value: '商品收藏',
        isActive: true
      },
      {
        id: 1,
        value: '品牌收藏',
        isActive: false
      },
      {
        id: 2,
        value: '店铺收藏',
        isActive: false
      },
      {
        id: 3,
        value: '浏览足迹',
        isActive: false
      }
    ],
    collect: []
  },
  onShow() {
    const collect = wx.getStorageSync("collect");
    this.setData({
      collect
    })
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
})