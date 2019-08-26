<template>
	<view class="home-container">
		<swiper class="swiper-box" autoplay="true" easing-function="easeInOutCubic" @click="toMenu" circular="true">
			<swiper-item class="swiper-item" v-for="(img, index) in imgList" :key="index">
				<image class="swiper-item-img" :src="img"></image>
			</swiper-item>
		</swiper>
		<div class="" @click="toShopList">点餐</div>
		<div class="login" @click="toLogin">login</div>
		<!-- <button open-type="getUserInfo">授权</button> -->
		<!-- <div class="flex-row">
			<div>name</div>
			<div @click="chooseImg">上传图片</div>
		</div>
		<div @click="submit">提交</div> -->
		<!-- <image class="logo" src="/static/logo.png"></image> -->
		<!-- <div class="banner1" @click="toMenu">点我去点餐页面</div>
		<div class="banner2" @click="toOrderList">点我去订单列表</div>
		<div class="banner3" @click="toCenter">点我去个人中心</div> -->
	</view>
</template>

<script>
	export default {
		
		data() {
			return {
				imgList: ['http://localhost:8090/images/static/1.png', 'http://localhost:8090/images/static/2.png', 'http://localhost:8090/images/static/3.png', ]
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
				wx.login({
					success (res) {
						if (res.code) {
						//发起网络请求
							wx.request({
								url: 'http://localhost:8090/wechat/wx/login',
								data: {
									code: res.code
								}
							})
						} else {
						console.log('登录失败！' + res.errMsg)
						}
					}
				})
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
