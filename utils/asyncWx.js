// promise 形式
export const getSetting = () => {
    return new Promise((resolve, reject)=>{
        wx.getSetting({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}

export const chooseAddress = () => {
    return new Promise((resolve, reject)=>{
        wx.chooseAddress({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}

export const openSetting = () => {
    return new Promise((resolve, reject)=>{
        wx.openSetting({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}

//弹框确认
export const showModal = ({content}) => {
    return new Promise((resolve, reject)=>{
        wx.showModal({
            title: '提示',
            content: content,
            success: (res) => {
              resolve(res)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}

// 弹框提示
export const showToast = ({content}) => {
    return new Promise((resolve, reject)=>{
        wx.showToast({
            title: content,
            icon: 'none',
            success: (res) => {
              resolve(res)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}

// 获取登录信息
export const login = () => {
    return new Promise((resolve, reject)=>{
        wx.login({
            timeout: 10000,
            success: (result) => {
              resolve(result)
            },
            fail: (err) => {
                reject(err)
            }
          })
    })
}

// 发起微信支付
export const requestPayment = (pay) => {
    return new Promise((resolve, reject)=>{
        wx.requestPayment({
            ...pay,
            success: (result) => {
              resolve(result)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })
}