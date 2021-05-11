<template>
	<view class="login-container flex-row flex-ja-center">
		<div class="login-box">
			<div class="input-item-box flex-row flex-a-center">
				<div class="title">手机号</div>
				<input class="input-item flex-item" type="text" v-model="phone" max-length="50" placeholder="请输入手机号" />
			</div>
			<div class="input-item-box flex-row flex-a-center">
				<div class="title">密码</div>
				<input class="input-item flex-item" type="text" v-model="password" max-length="50" placeholder="请输入密码" />
			</div>
			<div v-if="roleFlag === 'user'" class="submit-button" :style="{ 'background-color': $mainColor }" @click="userLogin">用户登录</div>
			<div v-else-if="roleFlag === 'manage'" class="submit-button" :style="{ 'background-color': $mainColor }" @click="manageLogin">管理员登录</div>
			<div v-if="roleFlag === 'user'" class="to-login-box">
				没有用户账号，
				<span :style="{ color: $mainColor }" @click="toRegisterPage">去注册</span>
			</div>
			<div v-else-if="roleFlag === 'manage'" class="to-login-box">
				没有管理员账号，
				<span :style="{ color: $mainColor }" @click="toRegisterPage">去注册</span>
			</div>
		</div>
	</view>
</template>

<script>
export default {
	data() {
		return {
			phone: '',
			password: '',
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
			this.$myrouter.reLaunchTo({
				name: 'role'
			});
		}
	},
	methods: {
		toRegisterPage() {
			this.$myrouter.reLaunchTo({
				name: 'register',
				query: {
					roleFlag: this.roleFlag
				}
			});
		},
		async userLogin() {
			const testLegalFlag = this.testLegal()
			if (!testLegalFlag) return
			const params = {
				phone: this.phone,
				password: this.password
			};
			try {
				this.$showLoading()
				const res = await this.$fetch.post('/user/account/login', params);
				const { data = {} } = res
				this.$setStorage('userToken', data.userToken)
				this.$myrouter.reLaunchTo({
					name: 'user/home'
				})
				this.$hideLoading()
			} catch(e) {
				console.log(e)
				this.$hideLoading()
			}
		},
		async manageLogin() {
			const testLegalFlag = this.testLegal()
			if (!testLegalFlag) return
			const params = {
				phone: this.phone,
				password: this.password
			};
			try {
				this.$showLoading()
				const res = await this.$fetch.post('/manage/account/login', params);
				const { data = {} } = res
				this.$setStorage('manageToken', data.manageToken)
				this.$myrouter.reLaunchTo({
					name: 'manage/shop/list'
				})
				this.$hideLoading()
			} catch(e) {
				console.log(e)
				this.$hideLoading()
			}
		},
		testLegal() {
			const phonereg = /^\d{11}$/;
			const passwordreg = /^[a-zA-Z0-9]{8,30}$/;
			if (!phonereg.test(this.phone)) {
				this.$showModal({
					content: '请输入正确手机号'
				});
				return false;
			}
			if (!passwordreg.test(this.password)) {
				this.$showModal({
					content: '密码只支持8-30位的字母或数字'
				});
				return false;
			}
			return true
		},
	}
};
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
		color: #fff;
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
