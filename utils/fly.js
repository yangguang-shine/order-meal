import router from '@/utils/router'
import host from '@/config/host'
import vuex from '@/store'

// #ifdef MP-WEIXIN
import toLogin from '@/utils/wx'
// #endif
import Cookies from 'js-cookie'

// #ifdef H5
const Fly = require("flyio/dist/npm/fly")
const fly = new Fly;
// #endif
// #ifdef MP-WEIXIN
const Fly = require('flyio/dist/npm/wx')
const fly = new Fly;
// #endif
// {
//     method:"",//请求方法， GET 、POST ...
//     headers:{},//请求头
//     baseURL:"",//请求基地址
    //是否自动将Content-Type为“application/json”的响应数据转化为JSON对象，默认为true
//     parseJson:true,
//     timeout:""//超时时间
//   }
fly.config.timeout = 30000;
fly.config.baseURL = host;

fly.interceptors.request.use(async (request)=>{

    // #ifdef MP-WEIXIN
    await toLogin()
    // #endif

    const token = uni.getStorageSync('token')
    let manageToken = uni.getStorageSync('manageToken') || Cookies.get('manageToken')

    // #ifdef H5
    if (token) {
        Cookies.set('token', `${token}`)
        Cookies.set('manageToken', `${manageToken}`)
        request.headers.token = `${token}`;
        request.headers.manageToken = `${manageToken}`;
    } else {
        // #ifdef MP-WEIXIN
        await toLogin()
        // #endif
    }
    // #endif

    // #ifdef MP-WEIXIN
    request.headers['cookie']=`token=${token};manageToken=${manageToken}`;
    // #endif
    request.params.channel = vuex.state.channel
    return request;
})
fly.interceptors.response.use(
    (response) => {
        return response.data
    },
    (err) => {
        console.log('请求失败')
        console.log(err)
        if (err.status === 404) {
            uni.showToast({
                title: '服务异常',
                icon: 'none',
            })
            return null
        }
        uni.showToast({
            title: '网络错误，请稍候再试',
            icon: 'none',
        })
        return null
    }
)
const flyRequest = (url, params, options, method) => {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await fly[method](url, params);
            console.log(res)
            const code = res.code
            if (code === '000') {
                resolve(res)
            } else if (options.error) {
                if (code === '555' || code === "666") {
                    uni.showModal({
                        title: '提示',
                        content: res.msg,
                        confirmText: '去登录',
                        cancelText: '取消登录',
                        success: async (res) => {
                            if (res.confirm) {
                                // #ifdef MP-WEIXIN
                                uni.showLoading({
                                    title: '登录中'
                                })
                                uni.removeStorageSync('token')
                                await toLogin()  
                                uni.showToast({
                                    title: '登录成功',
                                })
                                setTimeout(() => {
                                    router.reLaunch({
                                        name: 'home'
                                    })
                                }, 1500)
                                // #endif
                                // #ifdef H5
                                router.reLaunch({
                                    name: 'login'
                                })
                                // #endif
                            }
                        }
                    })
                } else if (code === '777' || code === "888") {
                    uni.showModal({
                        title: '提示',
                        content: res.msg,
                        confirmText: '去登录',
                        cancelText: '取消登录',
                        success: async (res) => {
                            if (res.confirm) {
                                // #ifdef H5
                                router.push({
                                    name: 'login',
                                    query: {
                                        manage: 'true'
                                    }
                                })
                                // #endif
                            }
                        }
                    })
                } else {
                    uni.showModal({
                        title: '提示',
                        icon: 'none',
                        content: res.msg
                    })
                }
                reject(res)
            } else {
                reject(res)
            }
        } catch (e) {
            reject()
            console.log(e)
        }
    })
} 
export default {
    get: (url = '', params = {}, options = { error: true }) => flyRequest(url, params, options, 'get'),
    post: (url = '', params = {}, options = { error: true }) => flyRequest(url, params, options, 'post')
}