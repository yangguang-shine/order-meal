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
			async checkManageLogin() {
				const manageToken = uni.getStorageSync('manageToken')
				if(!manageToken) {
					await this.$showModal({
						content: '店铺管理员需要登录'
					})
					this.$myrouter.push({
						name: 'login',
						query: {
							manage: 'true'
						}
					})
					return false;
				}
				try {
					const res = await this.$fetch.post('/manage/user/checkManageLogin', { })
					return true
				} catch (e) {
					console.log(e)
					await this.$showModal({
						content: '店铺管理员需要登录'
					})
					this.$myrouter.push({
						name: 'login',
						query: {
							manage: 'true'
						}
					})
					return false
				}
			},
			async toMyShopList() {
				const status = await this.checkManageLogin()
				if (!status) return;
				this.$myrouter.push({
					name: 'shop/list',
					query: {
						managerShopList: 'true'
					}
				})
			},
			async toMyShopOrderList() {
				const status = await this.checkManageLogin()
				if (!status) return;
				this.$myrouter.push({
					name: 'shop/list',
					query: {
						pageSign: 'shop/orderList',
						managerShopList: 'true'
					}
				})
			},
			async toAllShopOrderList() {
				const status = await this.checkManageLogin()
				if (!status) return;
				this.$myrouter.push({
					name: 'shop/list',
					query: {
						pageSign: 'shop/orderList',
					}
				})
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
