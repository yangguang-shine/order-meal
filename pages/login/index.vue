<template>
	<view class="login-container">
		<div class="login-box">
			<div class="input-item-box flex-row flex-a-center">
				<div class="title">手机号</div>
				<input class="input-item flex-item" type="text" v-model="phone" max-length="50" placeholder="请输入手机号">
			</div>
			<div class="input-item-box flex-row flex-a-center">
				<div class="title">密码</div>
				<input class="input-item flex-item" type="text" v-model="password" max-length="50" placeholder="请输入密码">
			</div>
			<div class="submit-button" :style="{'background-color': $mainColor}" @click="login">登录</div>
			<div class="to-login-box">没有账号，<span :style="{'color': $mainColor}" @click="toRegisterPage">去注册</span></div>
		</div>
	</view>
</template>

<script>
import host from '@/config/host'
	export default {
		
		data() {
			return {
				phone: '',
				password: '',
				manage: ''
			}
		},
		onLoad(query) {
			this.manage = query.manage || ''
		},
		onUnload() {
		},
		methods: {
			toRegisterPage() {
				this.$myrouter.replace({
					name: 'register',
					query: {
						manage: this.manage
					}
				})
			},
			async login() {
				const phonereg = /^\d+$/
				const passwordreg = /^\w+$/
				if (!phonereg.test(this.phone)) {
					this.$showModal({
						content: '请输入正确手机号'
					})
					return
				}
				if (!passwordreg.test(this.phone)) {
					this.$showModal({
						content: '密码只支持字母、数字、下划线'
					})
					return
				}
				try {
					this.$showLoading()
					let res = {}
					if (this.manage) {
						res = await this.$fetch.post('/manage/user/login', { phone: this.phone, password: this.password })
					} else {
						res = await this.$fetch.post('/user/h5/login', { phone: this.phone, password: this.password })
					}
					this.$hideLoading()
					if (this.manage) {
						uni.setStorageSync('manageToken', res.data.manageToken || '')
					} else {
						uni.setStorageSync('token', res.data.token || '')
					}
					await this.$showModal({
						content: '登录成功'
					})
					if (this.manage) {
						this.$myrouter.reLaunch ({
							name: 'manage'
						})
					} else {
						this.$myrouter.reLaunch ({
							name: 'home'
						})
					}
				} catch (e) {
					console.log(e)
					this.$hideLoading()
				}

			}
		},
	}
</script>

<style lang="scss">
page {
	height: 100%;
	background-color: #f4f4f4;
}
.login-container {
	height: 100%;
	font-size: 28rpx;
	color: #333;
	.login-box {
		padding: 30rpx;
		position: fixed;
		top: 50%;
		left: 50%;
		width: 550rpx;
		transform: translate(-50%, -50%);
		background-color: #fff;
		border-radius: 12rpx;
	}
	.input-item-box {
		height: 100rpx;
		padding-bottom: 10rpx; 
	}
	.input-item {
		height: 100rpx;
		border-bottom: 1px solid #eee;
	}
	.title {
		width: 150rpx;
	}
	.submit-button {
		height: 80rpx;
		width: 150rpx;
		line-height: 80rpx;
		text-align: center;
		border-radius: 10rpx;
		margin: 30rpx auto; 
	}
	.to-login-box {
		padding-top: 10rpx;
		margin: 0 auto;
		width: 400rpx;
		text-align: center;
	}
}
</style>
