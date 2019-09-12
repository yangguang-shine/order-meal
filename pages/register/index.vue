<template>
	<view class="home-container">
		注册
	</view>
</template>

<script>
import host from '@/config/host'
	export default {
		
		data() {
			return {
				imgList: [`${host}/images/static/1.png`, `${host}/images/static/2.png`, `${host}/images/static/3.png`, ]
			}
		},
		onLoad() {
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
	.home-container {
		text-align: center;
		.swiper-box {
			height: 350rpx;
			width: 100%;
		}
		.swiper-item-box {
			width: 100%;
			height: 100%;
		}
	.banner1 {
		width: 100%;
		height: 150upx;
		line-height: 150upx;
		background-color: #732184;
	}
	.banner2 {
		width: 100%;
		height: 150upx;
		line-height: 150upx;
		background-color: #543615;
	}
	.banner3 {
		width: 100%;
		height: 150upx;
		line-height: 150upx;
		background-color: #124576;
	}
	.title {
		text-align: center;
		font-size: 36upx;
		color: #8f8f94;
	}
	.login {
		margin-top: 20rpx;
	}
}
</style>
