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
			<div class="submit-button" :style="{'background-color': $mainColor}" @click="login">用户登录</div>
			<div class="to-login-box">没有用户账号，<span :style="{'color': $mainColor}" @click="toRegisterPage">去注册</span></div>
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
			}
		},
		methods: {
			toRegisterPage() {
				this.$myrouter.replace({
					name: 'register',
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
					const res = await this.$fetch.post('/api/login', { phone: this.phone, password: this.password })
					this.$hideLoading()
						uni.setStorageSync('token', res.data.token || '')
					await this.$showModal({
						content: '登录成功'
					})
					this.$myrouter.reLaunch ({
						name: 'home'
					})
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
		width: 550rpx;
		margin: 50rpx auto;
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
		height: 60rpx;
		width: 200rpx;
		line-height: 60rpx;
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
