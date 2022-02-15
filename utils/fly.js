import router from '@/utils/router'
import { requestHost } from '../config/host'
import { showModal, showLoading, showToast, hideLoading, hideToast } from '@/utils'

const fetch = (url, data = {}, options = { error: true }) => {
	return new Promise(async (resolve, reject) => {
		try {
			const header = {}
			// #ifdef MP-WEIXIN
			const userToken = uni.getStorageSync('userToken')
			const manageToken = uni.getStorageSync('manageToken')
			headers['cookie'] = `userToken=${userToken};manageToken=${manageToken}`;
			// #endif
			const response = await uni.request({
				url: url.startsWith('http') ? url : `${requestHost}${url}`,
				data,
				header,
				method: 'POST',
				timeout: 30000,
				withCredentials: true
			})
			console.log('response')
			console.log(response)
			const code = response.code
			if (code === '000') {
				resolve(response)
			} else if (code === '100') {
				await showModal({
					content: response.msg
				})
				router.reLaunchTo({
					name: 'login',
					query: {
						roleName: 'user'
					}
				})
				reject(response)
			} else if (code === '200') {
				await showModal({
					content: response.msg
				})
				router.reLaunchTo({
					name: 'login',
					query: {
						roleName: 'manage'
					}
				})
				reject(response)
			} else if (options.error) {
				showModal({
					content: response.msg
				})
				reject(response)
			} else {
				reject(response)
			}
		} catch (e) {
			console.log(e)
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
			reject(e)
		}
	})
}  

export default fetch
