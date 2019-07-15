<template>
	<view class="home-container">
		<!-- <image class="logo" src="/static/logo.png"></image> -->
		<div class="banner1" @click="toMenu">点我去点餐页面</div>
		<div class="banner2" @click="toOrderList">点我去订单列表</div>
		<div class="banner3" @click="toCenter">点我去个人中心</div>
	</view>
</template>

<script>
	export default {
		
		data() {
			return {
			}
		},
		onLoad() {

		},
		methods: {
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

<style>
	.home-container {
		text-align: center;
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
</style>
