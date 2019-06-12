<template>
	<view class="content">
		<!-- <image class="logo" src="/static/logo.png"></image> -->
		<view>
			<div>点餐</div>
			<div class="title" @click="toHome">首页</div>
			<div class="title" @click="toOrder">订单</div>
			<div class="title" @click="toCenter">我的</div>
			<div class="title" @click="relanuch">重启</div>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: '点餐'
			}
		},
		onLoad() {

		},
		methods: {
			toHome() {
				this.$myrouter.switchTab({
					name: 'home',
				})
			},
			toOrder() {
				this.$myrouter.switchTab({
					name: 'order',
				})
			},
			toCenter() {
				this.$myrouter.switchTab({
					name: 'center',
				})
			},
			relanuch() {
				this.$myrouter.reLaunch({
					name: 'center',
					query: {
						name: 'joia'
					}
				})
			}
		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
	}

	.title {
		text-align: center;
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
