<template>
	<view class="center-container flex-col">
		<!-- <image class="logo" src="/static/logo.png"></image> -->
		<div class="list" >
			<div class="item center" @click="toMyShopList">我的店铺列表</div>
			<div class="item center" @click="toMyShopOrderList">我的店铺订单列表</div>
			<!-- <div class="item center" @click="toAllShopOrderList">所有店铺订单列表</div> -->
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
			async toMyShopList() {
				try {
					this.$showLoading()
					await this.$fetch.post('/manage/user/checkManageLogin', { })
					this.$hideLoading()
					this.$myrouter.push({
						name: 'shop/list',
						query: {
							managerShopList: 'true'
						}
					})
				} catch (e) {
					console.log(e)
					this.$hideLoading()
				}
			},
			async toMyShopOrderList() {
				try {
					this.$showLoading()
					const status = await this.$fetch.post('/manage/user/checkManageLogin', { })
					this.$hideLoading()
					this.$myrouter.push({
						name: 'shop/list',
						query: {
							pageSign: 'shop/orderList',
							managerShopList: 'true'
						}
					})
				} catch (e) {
					console.log(e)
					this.$hideLoading()
				}

			},
			async toAllShopOrderList() {
				try {
					this.$showLoading()
					await this.this.$fetch.post('/manage/user/checkManageLogin', { })
					this.$myrouter.push({
						name: 'shop/list',
						query: {
							pageSign: 'shop/orderList',
						}
					})
					this.$hideLoading()
				} catch (e) {
					this.$hideLoading()
					console.log(e)
				}

			},
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
