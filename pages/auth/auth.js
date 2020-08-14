import { login } from '../../utils/asyncWx.js'
import { request } from "../../request/index.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  async handleGetUserInfo(e) {
    try{
      // 获取用户信息
      const {encryptedData, iv, rawData, signature} = e.detail
      // 获取用户登录成功的code
      const {code} = await login()
      const loginParams = { encryptedData, iv, rawData, signature, code }
      //发送请求获取用户token,当前获取不了token
      // const {token} = await request({url: '/users/wxlogin', data: loginParams, methods: "post"})
      // console.log(token)
      // 获取不了token，手动添加一个token供开发用
      wx.setStorageSync("token", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjIzLCJpYXQiOjE1NjQ3MzAwNzksImV4cCI6MTAwMTU2NDczMDA3OH0.YPt-XeLnjV-_1ITaXGY2FhxmCe4NvXuRnRB8OMCfnPo")
      wx.navigateBack({
        delta: 1
      })
    }catch(err){
      console.log(err)
    }
  }
})