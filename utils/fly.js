import toLogin from '@/utils/wx'
import router from '@/utils/router'
import host from '@/config/host'

const Fly = require('flyio/dist/npm/wx')
const fly = new Fly;
// {
//     method:"",//请求方法， GET 、POST ...
//     headers:{},//请求头
//     baseURL:"",//请求基地址
    //是否自动将Content-Type为“application/json”的响应数据转化为JSON对象，默认为true
//     parseJson:true,
//     timeout:""//超时时间
//   }
fly.config.timeout = 1000;
fly.config.baseURL = host;
fly.interceptors.request.use((request)=>{
    request.headers["X-Tag"]="flyio";
    const token = uni.getStorageSync('token')
    request.headers['Set-Cookie']=`token=${token};`;
    request.headers['cookie']=`token=${token};`;
      console.log(request.body)
    return request;
})
fly.interceptors.response.use(
    (response) => {
        return response.data
    },
    (err) => {
        console.log('请求失败')
        console.log(err)
    }
)
const flyRequest = (url, params, method) => {
    return new Promise(async (resolve, reject) => {
        try {
            console.log(url)
            const res = await fly[method](url, params);
            const code = res.code
            if (code === '000') {
                resolve(res)
            } else if (code === '555'){
                new Promise((resolve, reject) => {
                    uni.showModal({
                        title: '提示',
                        content: res.msg,
                        confirmText: '去登录',
                        cancelText: '取消登录',
                        success: async () => {
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
                    })
                })
                reject(res)
            } else {
                uni.showModal({
                    title: '提示',
                    content: res.msg
                })
                reject(res)
            }
        } catch (e) {
            console.log(e)
        }
    })
} 
export default {
    get: (url = '', params = {}) => flyRequest(url, params, 'get'),
    post: (url = '', params = {}) => flyRequest(url, params, 'post')
}