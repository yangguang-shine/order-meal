import toLogin from '@/utils/wx'
import router from '@/utils/router'
import host from '@/config/host'
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

fly.interceptors.request.use((request)=>{
    const token = uni.getStorageSync('token')
    if (token) {
        Cookies.set('token', `${token}`)
        request.headers.token = `${token}`;
    }
    // #ifdef MP-WEIXIN
    request.headers['cookie']=`token=${token};`;
    // #endif
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
                if (code === '555') {
                    uni.showModal({
                        title: '提示',
                        content: res.msg,
                        confirmText: '去登录',
                        cancelText: '取消登录',
                        success: async (res) => {
                            if (res.confirm) {
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