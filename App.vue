<script>
// #ifdef H5
import Cookies from 'js-cookie'
// #endif
// #ifdef MP-WEIXIN
import toLogin from '@/utils/wx'
// #endif

	export default {
		onLaunch() {
			// #ifdef MP-WEIXIN
			toLogin()
			// #endif
			// #ifdef H5
        	const token = Cookies.get('token')
			const manageToken = Cookies.get('manageToken')
			uni.setStorageSync('token', token)
			uni.setStorageSync('manageToken', manageToken)
			if (!token) {
				this.$myrouter.reLaunch({
					name: 'login'
				})
			}
			// #endif
			try {
				console.log('App Launch')
			} catch (e) {
				console.log(e)
			}
		},
		onShow() {
			console.log('App Show')
		},
		onHide() {
			console.log('App Hide')
		},
	}
</script>

<style>
	/*每个页面公共css */
</style>
