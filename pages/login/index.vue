<template>
	<view class="login-container">

	</view>
</template>

<script>
import host from '@/config/host'
	export default {
		
		data() {
			return {
				username: '',
				password: ''
			}
		},
		onLoad() {
			uni.get
		},
		methods: {
			toShopList() {
				this.$myrouter.push({
					name: 'shop/list',
					query: {
						toOrder: 1
					}
				})
			},
			toLogin() {
			},
			chooseImg() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						console.log(res.tempFiles)
						const file = res.tempFiles[0]
						uni.uploadFile({
							url: 'http://localhost:8090/api/img/uploadImg',
							filePath: file.path,
							name: 'img',
							success: (res) => {
								console.log(res.data)
							}
						})
					}
				})
			},
			toMenu() {
				this.$myrouter.push({
					name: 'menu',
					query: {
						name: 'jjj'
					}
				})
			},
			toOrderList() {
				this.$myrouter.switchTab({
					name: 'orderList',
					query: {
						name: 'jjj'
					}
				})
			},
			toCenter() {
				this.$myrouter.switchTab({
					name: 'center',
					query: {
						name: 'jjj'
					}
				})
			},
		}
	}
</script>

<style lang="scss">
.login-container {

}
</style>
