// pages/goods_detail/goods_detail.js
// 路径补全，解构出函数 request
import { request } from "../../request/index.js"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj: {},
    isCollect: false
  },
  // 商品数据
  GoodsInfo: {},

  onShow: function () {
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1]
    let options = currentPage.options
    const { goods_id } = options
    this.getGoodsDetail(goods_id)
  },
  // 获取商品详情数据
  async getGoodsDetail(goods_id) {
    const goodsObj = await request({url: '/goods/detail', data: {goods_id}})
    this.GoodsInfo = goodsObj
    // 获取缓存中商品收藏的数组
    let collect = wx.getStorageSync("collect") || []
    // 判断是否收藏
    let isCollect = collect.some(v => v.goods_id === this.GoodsInfo.goods_id)
    this.setData({
      goodsObj: {
        // 只传递用得上的数据
        goods_name: goodsObj.goods_name,
        goods_price: goodsObj.goods_price,
        // 部分iphone手机不支持.webp格式，最好找后台修改
        //这里手动临时修改.webp=>.jpg
        goods_introduce: goodsObj.goods_introduce.replace(/\.webp/g, '.jpg'),
        pics: goodsObj.pics,
      },
      isCollect
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
      this.GoodsInfo.checked = true
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
  // 点击收藏
  handleCollect() {
    let isCollect = false
    let collect = wx.getStorageSync('collect') || []
    let index = collect.findIndex(v => v.goods_id === this.GoodsInfo.goods_id)
    if(index !== -1){
      // 已经收藏过了，删除
      collect.splice(index, 1)
      isCollect = false
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true
      })
    }else{
      collect.push(this.GoodsInfo)
      isCollect = true
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true
      })
    }
    wx.setStorageSync("collect", collect)
    this.setData({
      isCollect
    })
  }
})