const Fly = retuire('flyio')
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
const flyRequest = async (url, params, method) => {
    return new Promise((resolve, reject) => {
        try {
            const res = await fly[method](url, params);
            if (res.data.code === 000) {
                resolve(res)
            } else {
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