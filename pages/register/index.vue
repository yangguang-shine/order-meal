<template>
	<view class="register-container">
		<div class="register-box">
			<div class="input-item-box flex-row flex-a-center">
				<div class="title">手机号</div>
				<input class="input-item flex-item" type="text" v-model="phone" max-length="50" placeholder="请输入手机号">
			</div>
			<div class="input-item-box flex-row flex-a-center">
				<div class="title">密码</div>
				<input class="input-item flex-item" type="text" v-model="password" max-length="50" placeholder="请输入密码">
			</div>
			<div class="input-item-box flex-row flex-a-center">
				<div class="title">确认密码</div>
				<input class="input-item flex-item" type="text" v-model="confirmPassword" max-length="50" placeholder="请确认密码">
			</div>
			<div class="input-item-box flex-row flex-a-center">
				<div class="title">昵称</div>
				<input class="input-item flex-item" type="text" v-model="nickname" max-length="50" placeholder="请输入昵称">
			</div>
			<div class="register-button" :style="{'background-color': $mainColor}" @click="register">注册</div>
			<div class="to-login-box">有账号，<span :style="{'color': $mainColor}" @click="toLoginPage">去登录</span></div>
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
				confirmPassword: '',
				nickname: '',
				manage: ''
			}
		},
		onLoad(query) {
			this.manage = query.manage
		},
		methods: {
			toLoginPage() {
				this.$myrouter.replace({
					name: 'login',
					manage: this.manage
				})
			},
			async register() {
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
				if (this.password !== this.confirmPassword) {
					this.$showModal({
						content: '两次输入密码不一样'
					})
					return
				}
				if (!this.nickname) {
					this.$showModal({
						content: '两次输入昵称'
					})
					return
				}
				try {
					this.$showLoading()
					let res = ''
					if (this.manage) {
						res = await this.$fetch.post('/manage/user/register', { phone: this.phone, password: this.password })
					} else {
						res = await this.$fetch.post('/user/h5/register', { phone: this.phone, password: this.password })
					}
					if (this.manage) {
						uni.setStorageSync('manageToken', res.data.manageToken || '')
					} else {
						uni.setStorageSync('token', res.data.token || '')
					}
					this.$hideLoading()
					await this.$showModal({
						content: '注册成功'
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
.register-container {
	height: 100%;
	font-size: 28rpx;
	color: #333;
	.register-box {
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
		height: 70rpx;
		padding-bottom: 10rpx; 
	}
	.input-item {
		height: 70rpx;
		border-bottom: 1px solid #eee;
	}
	.title {
		width: 150rpx;
	}
	.register-button {
		height: 60rpx;
		width: 150rpx;
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
