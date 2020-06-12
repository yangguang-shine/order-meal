<script>
// #ifdef H5
// import Cookies from 'js-cookie'
// #endif
// #ifdef MP-WEIXIN
// import toLogin from '@/utils/wx'
// #endif

	export default {
		onLaunch() {
			// #ifdef MP-WEIXIN
			// toLogin()
			// #endif
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
