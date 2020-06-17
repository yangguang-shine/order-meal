<template>
	<view class="role-container flex-col flex-ja-center">
		<view class="role-box flex-row flex-j-around">
			<view class="user" @click="toUserHome">
				用户操作
			</view>
			<view class="manage" @click="toManageHome">
				管理员操作 
			</view>
		</view>
		<view class="reptile">
			爬虫
		</view>
	</view>
</template>

<script>
	export default {
		onLoad() {
		},
		methods: {
			toUserHome() {
				const userToken = this.$getStorage('userToken')
				if (userToken) {
					this.$router.reLaunchTo({
						name: 'user/home',
						query: {
							
						}
					})
				} else {
					this.$router.navigateTo({
						name: 'login',
						query: {
							roleFlag: 'user'
						}
					})
				}
			},
			toManageHome() {
				const manageToken = this.$getStorage('manageToken')
				if (manageToken) {
					this.$router.reLaunchTo({
						name: 'manage/home'
					})
				} else {
					this.$router.navigateTo({
						name: 'login',
						query: {
							roleFlag: 'manage'
						}
					})
				}
			},
		}
	}
</script>

<style lang="less" scoped>
	.role-container {
		height: 100%;
		.role-box {
			width: 100%;
		}
		.reptile {
			width: 100%;
			padding-top: 80rpx;
			text-align: center;
		}
	}
</style>