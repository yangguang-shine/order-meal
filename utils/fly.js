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
fly.config.baseURL = 'http://localhost:8090';
fly.interceptors.request.use((request)=>{
    request.headers["X-Tag"]="flyio";
    const user = uni.getStorageSync('user')
    request.headers['Set-Cookie']=`user=${user};`;
    request.headers['cookie']=`user=${user};`;
    console.log(uni.getStorageSync('user'))
    console.log(request.headers.Cookie)
    console.log(request.headers)
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
            const res = await fly[method](url, params);
            if (res.code === '000') {
                resolve(res)
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