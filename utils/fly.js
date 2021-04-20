import router from '@/utils/router'
import { requestHost} from '@/config/host'
import { showModal, showLoading, showToast, hideLoading, hideToast} from '@/utils'
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
fly.config.baseURL = `${requestHost}`;
fly.config.withCredentials = true;

fly.interceptors.request.use(async (request) => {

	// #ifdef MP-WEIXIN
	// await toLogin()
	// #endif



	// #ifdef H5
	// if (userToken) {
	// 	if (!Cookies.get('userToken')) {
	// 		Cookies.set('userToken', `${userToken}`)
	// 		request.headers.userToken = Cookies.get('userToken');
	// 	}	
	// }
	// if (manageToken) {
    //     if (!Cookies.get('manageToken')) {
	// 		Cookies.set('userToken', `${userToken}`)
	// 		request.headers.userToken = Cookies.get('userToken');
	// 	}	
	// }
	// #endif

    // #ifdef MP-WEIXIN
    const userToken = uni.getStorageSync('userToken')
	const manageToken = uni.getStorageSync('manageToken')
	request.headers['cookie'] = `userToken=${userToken};manageToken=${manageToken}`;
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
				title: '404未找到服务',
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
			const code = res.code
			if (code === '000') {
				resolve(res)
			} else if (code === '100') {
				await showModal({
					content: res.msg
				})
				router.reLaunchTo({
					name: 'login',
					query: {
						roleFlag: 'user'
					}
				})
				reject(res)
			} else if (code === '200') {
				await showModal({
					content: res.msg
				})
				router.reLaunchTo({
					name: 'login',
					query: {
						roleFlag: 'manage'
					}
				})
				reject(res)
			} else if (options.error) {
				showModal({
					content: res.msg
				})
				reject(res)
			} else {
				reject(res)
			}
		} catch (e) {
			reject('program error')
			console.log(e)
		}
	})
}
export default {
	get: (url = '', params = {}, options = {
		error: true
	}) => flyRequest(url, params, options, 'get'),
	post: (url = '', params = {}, options = {
		error: true
	}) => flyRequest(url, params, options, 'post')
}
