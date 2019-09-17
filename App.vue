<script>
	// #ifdef MP-WEIXIN
	import toLogin from '@/utils/wx'
	// #endif
	export default {
		async onLaunch() {
			try {
				console.log('App Launch')
				// #ifdef MP-WEIXIN
				await toLogin()
				// #endif
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
