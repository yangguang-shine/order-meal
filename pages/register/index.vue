<template>
	<view class="register-container">
		<div class="register-box">
			<div class="input-item-box flex-row flex-j-center">
				<div class="title">手机号</div>
				<input class="input-item flex-item" type="text" v-model="phone" max-length="50" placeholder="请输入手机号">
			</div>
			<div class="input-item-box flex-row flex-j-center">
				<div class="title">密码</div>
				<input class="input-item flex-item" type="text" v-model="password" max-length="50" placeholder="请输入密码">
			</div>
			<div class="input-item-box flex-row flex-j-center">
				<div class="title">确认密码</div>
				<input class="input-item flex-item" type="text" v-model="confirmPassword" max-length="50" placeholder="请确认密码">
			</div>
			<div class="input-item-box flex-row flex-j-center">
				<div class="title">昵称</div>
				<input class="input-item flex-item" type="text" v-model="nickname" max-length="50" placeholder="请输入昵称">
			</div>
			<div class="submit-button" :style="{'background-color': $mainColor}" @click="submit">提交</div>
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
			}
		},
		onUnload() {
		},
		onLoad() {
			submit() {
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
					const res = await this.$fetch.post('/user/h5/register', { phone: this.phone, password: this.password, nickname: this.nickname })
					
					this.$hideLoading()
					await this.$showModal({
						content: '注册成功'
					})
					this.r
				} catch (e) {
					console.log(e)
					this.$hideLoading()
				}

			}
		},
		methods: {
		}
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
	.input-item {
		border-bottom: 1px solid #eee;
	}
	.title {
		width: 180rpx;
	}
	.submit-button {
		height: 80rpx;
		width: 200rpx;
		line-height: 80rpx;
		text-align: center;
		border-radius: 10rpx;
		margin: 30rpx auto; 
	}
}
</style>
