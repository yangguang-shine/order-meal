import host from '@/config/host'
import vuex from '@/store'
export const login = () => {
    return new Promise((resolve, reject) => {
        console.log(vuex)
        uni.login({
            success (res) {
                if (res.code) {
                //发起网络请求
                    uni.request({
                        url: `${host}/wechat/wx/login`,
                        data: {
                            code: res.code,
                            channel: vuex.state.channel
                        },
                        success(res) {
                            console.log(res)
                            uni.setStorageSync('token', res.data.data)
                            resolve()
                        },
                        fail() {
                            console.log('接口调用失败')
                            reject('登录失败')
                        }
                    })
                } else {
                    console.log('登录失败！' + res.errMsg)
                    reject('登录失败')
                }
            }
        })
    })
}
export const checkSession = () => {
    return new Promise((resolve, reject) => {
        wx.checkSession({
            success () {
                resolve(1)
            },
            fail () {
                // session_key 已经失效，需要重新执行登录流程
                reject(0) //重新登录
            }
        })
    })
}
export default async () => {
    try {
        if (!uni.getStorageSync('token')) {
            await login()
        } else {
            try {
                await checkSession()
            } catch (e) {
                console.log(e)
                await login()
            }
    
        }
    } catch (e) {
        console.log()
    }
}