<template>
	<view class="center-container flex-col">
		<!-- <image class="logo" src="/static/logo.png"></image> -->
		<div class="list" >
			<div class="item center" @click="toShopList">店铺列表->菜品分类->详细菜品</div>
			<div class="item center" @click="toShopOrderList">店铺列表->订单列表->订单详情</div>
			<div class="item center" @click="toMyAddress">我的地址</div>
		</div>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				title: ''
			}
		},
		onLoad() {

		},
		methods: {
			toShopList() {
				this.$myrouter.push({
					name: 'shop/list'
				})
			},
			toShopOrderList() {
				this.$myrouter.push({
					name: 'shop/list',
					query: {
						pageSign: 'shop/orderList'
					}
				})
			},
			toMyAddress() {
				this.$myrouter.push({
					name: 'address/list'
				})
			}
		}
	}
</script>

<style lang="scss">
page {
	height: 100%;
}
.center-container  {
	height: 100%;
	font-size: 30rpx;
	.list {
		padding-top: 60rpx;
	}
	.item {
		padding: 30rpx;
	} 
}
</style>
