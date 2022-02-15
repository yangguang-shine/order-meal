<template>
	<view class="top-address-search-block" >
		<view id="top-address-search-container-id" class="top-address-search-container flex-row flex-a-center" :style="{ 'background-color': $mainColor }">
			<view class="address-box flex-row flex-a-center" :style="{ 'max-width': topAddressWidthFlag ? '0' : '' }" @click.stop="toSelectAddress">
				<image class="address-icon flex-shrink" src="/static/img/user-home/home-address-icon.png"></image>
				<view class="address-info flex-item line1">{{defaultAddress.address1 || '请选择地址'}}</view>
				<image src="/static/img/user-home/home-address-arrow-icon.png" class="arrow-right-icon flex-shrink" mode=""></image>
			</view>
			<view class="input-search line1 flex-item flex-row flex-a-center" @click.stop="toSearchShop">请输入商家名称</view>
		</view>
	</view>
</template>

<script>
import { mapState } from 'vuex';

export default {
	props: {
		topAddressWidthFlag: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		...mapState('user', [
			'defaultAddress',
		])
	},
	mounted() {
		// setTimeout(() => {
		// 	console.log(423141);
		// 	const query = uni.createSelectorQuery().in(this);
		// 	query.select('#top-address-search-container-id').boundingClientRect(res => {
		// 		console.log('111');
		// 		console.log(res);
		// 		this.$emit('setTopAddressSearchHeight', res.height)
		// 	}).exec();
		// }, 100)
	},
	methods: {
		toSelectAddress() {
			this.$emit('toSelectAddress')
		},
		toSearchShop() {
			console.log('toSearchShop');
		}
	}
}
</script>

<style lang="scss" scoped>
.top-address-search-block {
	width: 100%;
	height: 100rpx;
	.top-address-search-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100rpx;
		// background-color: #1C1B20;
		padding: 0 20rpx;
		box-sizing: border-box;
		z-index: 100;
		.address-box {
			font-size: 32rpx;
			color: #ffffff;
			line-height: 60rpx;
			max-width: 380rpx;
			transition: all 0.5s;
		}
		.address-icon {
			width: 30rpx;
			height: 30rpx;
			margin-right: 10rpx;
		}
		.address-info {
		}
		.arrow-right-icon {
			width: 20rpx;
			height: 20rpx;
			margin-left: 6rpx;
			margin-right: 30rpx;
		}
		.input-search {
			position: relative;
			height: 60rpx;
			padding: 0 60rpx;
			background-color: #fff;
			border-radius: 30rpx;
			color: #999;
		}
	}
}
</style>
