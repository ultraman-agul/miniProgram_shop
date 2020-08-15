import { request } from "../../request/index.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods: [],
    showBtn: false,
    inpVal: ''
  },
  TimeId: -1,
  handleInput(e){
    // console.log(e.detail.value)
    const query = e.detail.value.trim()
    if(!query){
      // 输入为空格
      this.setData({
        goods: [],
        showBtn: false
      })
      // 为空时也要清空定时器  否则，删除内容时会查询最后一个字符
      clearTimeout(this.TimeId)
      return;
    }
    this.setData({
      showBtn: true
    })
    // 防抖，避免多次发送请求
    clearTimeout(this.TimeId)
    this.TimeId = setTimeout(()=>{
      this.searchGoods(query)
    }, 1000)
  },
  async searchGoods(query){
    const res = await request({url: '/goods/qsearch', data: {query}})
    // console.log(res)
    this.setData({
      goods: res
    })
  },
  handleReset(){
    this.setData({
      inpVal: '',
      showBtn: false,
      goods: []
    })
  }
})