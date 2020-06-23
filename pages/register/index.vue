<template>
	<view class="register-container flex-row flex-ja-center">
		<div class="register-box">
			<div class="input-item-box flex-row flex-a-center">
				<div class="title">手机号</div>
				<input class="input-item flex-item" type="text" v-model="phone" max-length="50" placeholder="请输入手机号" />
			</div>
			<div class="input-item-box flex-row flex-a-center">
				<div class="title">密码</div>
				<input class="input-item flex-item" type="text" v-model="password" max-length="50" placeholder="请输入密码" />
			</div>
			<div class="input-item-box flex-row flex-a-center">
				<div class="title">确认密码</div>
				<input class="input-item flex-item" type="text" v-model="confirmPassword" max-length="50" placeholder="请确认密码" />
			</div>
			<div class="input-item-box flex-row flex-a-center">
				<div class="title">昵称</div>
				<input class="input-item flex-item" type="text" v-model="nickname" max-length="50" placeholder="请输入昵称" />
			</div>
			<div v-if="roleFlag === 'user'" class="register-button" :style="{ 'background-color': $mainColor }" @click="userRegister">用户注册</div>
			<div v-else-if="roleFlag === 'manage'" class="register-button" :style="{ 'background-color': $mainColor }" @click="manageRegister">管理员注册</div>
			<div v-if="roleFlag === 'user'" class="to-login-box">
				有用户账号，
				<span :style="{ color: $mainColor }" @click="toLoginPage">去登录</span>
			</div>
			<div v-else-if="roleFlag === 'manage'" class="to-login-box">
				有管理员账号，
				<span :style="{ color: $mainColor }" @click="toLoginPage">去登录</span>
			</div>
		</div>
	</view>
</template>

<script>
import host from '@/config/host';
export default {
	data() {
		return {
			phone: '',
			password: '',
			confirmPassword: '',
			nickname: '',
			roleFlag: 'user'
		};
	},
	async onLoad(options) {
		this.roleFlag = options.roleFlag;
		if (this.roleFlag !== 'user' && this.roleFlag !== 'manage') {
			await this.$showModal({
				content: '无法区分角色，请选择角色',
				confirmText: '知道了'
			});
			this.$router.reLaunchTo({
				name: 'role'
			});
		}
	},
	methods: {
		toLoginPage() {
			this.$router.reLaunchTo({
				name: 'login',
				query: {
					roleFlag: this.roleFlag
				}
			});
		},
		async userRegister() {
			this.testRegisterLegal()
			const params = {
				phone: this.phone,
				password: this.password,
				nickname: this.nickname
			};
			try {
				this.$showLoading()
				const res = await this.$fetch.post('/user/register', params)
				const { data = {} } = res
				this.$setStorage('userToken', data.userToken)
				this.$router.reLaunchTo({
					name: 'user/home'
				})
				this.$hideLoading()
			} catch (e) {
				consoe.log(e)
				this.$hideLoading()
			}
		},
		async manageRegister() {
			this.testRegisterLegal()
			const params = {
				phone: this.phone,
				password: this.password,
				nickname: this.nickname
			};
			try {
				this.$showLoading()
				const res = await  this.$fetch.post('/manage/register', params)
				const { data = {} } = res
				this.$setStorage('manageToken', data.manageToken)
				this.$router.reLaunchTo({
					name: 'manage/home'
				})
				this.$hideLoading()
			} catch (e) {
				console.log(e)
				this.$hideLoading()
			}
		},
		testRegisterLegal() {
			const phonereg = /^\d+$/;
			const passwordreg = /^\w+$/;
			if (!phonereg.test(this.phone)) {
				this.$showModal({
					content: '请输入正确手机号'
				});
				return;
			}
			if (!passwordreg.test(this.phone)) {
				this.$showModal({
					content: '密码只支持字母、数字、下划线'
				});
				return;
			}
			if (this.password !== this.confirmPassword) {
				this.$showModal({
					content: '两次输入密码不一样'
				});
				return;
			}
			if (!this.nickname) {
				this.$showModal({
					content: '请输入昵称'
				});
				return;
			}
		},

	}
};
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
		width: 550rpx;
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
	.register-button {
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
