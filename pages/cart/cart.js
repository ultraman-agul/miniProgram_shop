// pages/cart/cart.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  handleAddress() {
    // console.log("asfs")
    // 获取用户收货地址
    wx.getSetting({
      success: (result)=>{
        // 获取用户是否授权, 授权或未授权都可直接获取用户地址,只有取消授权才不可以
        const scopeAddress = result.authSetting["scope.address"]
        if(scopeAddress===true || scopeAddress === undefined) {
          wx.chooseAddress({
            success: (result1)=>{
              console.log(result1)
            }
          });
        }else{
          // 用户拒绝过授权,带领用户前往授权
          wx.openSetting({
            success: (result2)=>{
              wx.chooseAddress({
                success: (result3) => {
                  console.log(result3)
                }
              })
            }
          });
        }
      }
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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