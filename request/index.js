// 同时发送有异步请求的次数
let ajaxTimes = 0
export const request = (params) => {
    ajaxTimes++
    wx.showLoading({
        title: "加载中",
        mask: true
    })
    const baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1'
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
            url: baseUrl + params.url, 
            success: (result) => {
                resolve(result.data.message)
            },
            fail: (err) => {
                reject(err)
            },
            complete: ()=> {
                // 请求次数都完成了才关闭正在加载
                ajaxTimes--
                if (ajaxTimes === 0) {
                    wx.hideLoading();
                }
            }
        });   
    })
}