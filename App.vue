<script>
	import toLogin from '@/utils/wx'
	export default {
		async onLaunch() {
			console.log('App Launch')
			await toLogin()
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
