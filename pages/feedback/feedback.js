Page({
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
    ],
    // 存放图片地址的数组
    imgList: [],
    // 文本域内容
    inputVal: ''

  },
  // 图片上传到外网的链接数组
  upLoadImg: [],
  // tab点击改变时
  handleTabItemChange(e) {
    //获取tab索引
    const { index } = e.detail
    let { tabs } = this.data
    // 修改原数组
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false)
    // 复制到data
    this.setData({
      tabs
    })
  },
  // 添加图片按钮
  handleAddImg() {
    // 选择图片上传
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {
        this.setData({
          imgList: [...this.data.imgList, ...result.tempFilePaths]
        })
      }
    })
  },
  // 删除图片
  handleDeleteImg(e) {
    const { index } = e.currentTarget.dataset
    // console.log(index)
    let imgList = this.data.imgList
    imgList.splice(index, 1)
    this.setData({
      imgList
    })
  },
  // 文本域的输入
  handleInputVal(e) {
    this.setData({
      inputVal: e.detail.value
    })
  },
  // 提交按钮
  handleSubmit() {
    const { inputVal } = this.data
    if (!inputVal.trim()) {
      wx.showToast({
        title: '输入内容不合法',
        icon: 'none',
        mask: true
      })
      return;
    }

    // 判断是否提交了图片
    if (this.data.imgList.length !== 0) {
      // 上传图片到服务器
      // 显示正在上传
      wx.showLoading({
        title: "正在上传",
        mask: true,
      });
      // 上传文件不支持同时上传多个文件，要遍历数组挨个上传
      this.data.imgList.forEach((v, i) => {
        wx.uploadFile({
          url: 'https://img.coolcr.cn/api/upload',
          filePath: v,
          name: "image",
          formData: {},
          success: (result) => {
            console.log(result)
            let url = JSON.parse(result.data).data.url
            // 获取到外网图片的url
            this.upLoadImg.push(url)
            console.log(this.upLoadImg)
          }
        });
        if (i === this.data.imgList.length - 1) {
          // 已完成上传， 关闭loading
          wx.hideLoading();
          // 模拟已完成上传
          console.log("将文本和图片上传到服务器中")
          // 重置页面
          this.setData({
            inputVal: '',
            imgList: []
          })
          // 返回上一页
          wx.navigateBack({
            delta: 1
          });
        }
      })
    }else{
      console.log('只是上传了文本内容')
      // 重置页面
      this.setData({
        inputVal: ''
      })
      // 返回上一页
      wx.navigateBack({
        delta: 1
      });
    }
  }
})