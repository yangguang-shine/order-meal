import router from '@/utils/router'
import { requestHost } from '../config/host'
import { showModal, showLoading, showToast, hideLoading, hideToast } from '@/utils'

async function handleResponseData({ resolve, reject, responseData, options }) {
	const code = responseData.code
	const data = responseData.data || {}
	const msg = responseData.msg

	const handleCodeInfo = {
		'000': async () => {
			resolve(data)
		},
		'100': async () => {
			hideLoading()
			await showModal({
				content: msg
			})
			router.reLaunchTo({
				name: 'login',
				query: {
					roleName: 'user'
				}
			})
			reject(responseData)
		},
		'200': async () => {
			hideLoading()
			await showModal({
				content: msg
			})
			router.reLaunchTo({
				name: 'login',
				query: {
					roleName: 'manage'
				}
			})
			reject(responseData)
		},
		default: async () => {
			hideLoading()
			await showModal({
				content: msg
			})
			reject(responseData)
		}
	}
	if (handleCodeInfo[code]) {
		await handleCodeInfo[code]()
	} else if (options.error) {
		await handleCodeInfo.default()
	} else {
		reject(response)
	}
}
const fetch = (url, data = {}, options = { error: true }) => {
	return new Promise(async (resolve, reject) => {
		try {
			const header: any = {}
			// #ifdef MP-WEIXIN
			const userToken = uni.getStorageSync('userToken')
			const manageToken = uni.getStorageSync('manageToken')
			header['cookie'] = `userToken=${userToken};manageToken=${manageToken}`;
			// #endif
			const response = await uni.request({
				url: url.startsWith('http') ? url : `${requestHost}/${url}`,
				data,
				header,
				method: 'POST',
				timeout: 30000,
				withCredentials: true
			})
			const responseData = response.data
			const statusCode = response.statusCode
			if (200 <= +statusCode || +statusCode <= 300) {
				await handleResponseData({
					resolve, reject, responseData, options
				})
			} else {
				reject(response)
			}

		} catch (e) {
			console.log(e)
			uni.showToast({
				title: '网络错误，请稍候再试',
				icon: 'none',
			})
			reject(e)
		}
	})
}

export default fetch
