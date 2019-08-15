<template>
	<view class="center-container flex-col">
		<!-- <image class="logo" src="/static/logo.png"></image> -->
		<div class="item" @click="toCategoryList">
			<div>分类</div>
		</div>
		<div class="item" @click="toShopList">
			<div>店铺</div>
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
			toCategoryList() {
				this.$myrouter.push({
					name: 'category/list'
				})
			},
			toShopList() {
				this.$myrouter.push({
					name: 'shop/list'
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
	font-size: 28rpx;
	.item {
		margin-top: 50rpx;
	} 
}
</style>
