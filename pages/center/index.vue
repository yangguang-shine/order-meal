<template>
	<view class="center-container flex-col">
		<!-- <image class="logo" src="/static/logo.png"></image> -->
		<div class="list" >
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
