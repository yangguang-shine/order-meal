<script>
	// #ifdef MP-WEIXIN
	import toLogin from '@/utils/wx'
	// endif
	export default {
		async onLaunch() {
			try {
				console.log('App Launch')
				// #ifdef H5
				const token = uni.getStorageSync('token')
				if (token) {
					const res = await this.$fetch.post('/h5/user/check', { token })
					const status = res.data
					if (status) {
						this.$myrouter.push({
							name: 'home'
						})
					}
					return
				} else {
					this.$myrouter.push({
						name: 'login'
					})
				}
				this.$myrouter.push({
					name: 'login'
				})
				// endif
				// #ifdef MP-WEIXIN
				await toLogin()
				// endif
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
