<template>
	<view class="food-detail-container flex-row flex-ja-center" @click.stop="closeFoodDetail" @touchmove.stop>
		<view class="food-detail-box" @click.stop >
			<!-- <view class="food-img"></view> -->
			<img class="food-img" :src="foodInfo.fullImgPath" alt="">
			<view class="food-info">
				<view class="food-name">{{foodInfo.foodName}}</view>
				<view v-if="foodInfo.description" class="food-description">{{ foodInfo.description }}</view>
				
				<view class="food-price-order flex-row flex-j-between">
					<div class="flex-row flex-a-end">
						<div class="food-price">¥{{ foodInfo.price }}</div>
						<div v-if="foodInfo.unit" class="food-unit">/{{ foodInfo.unit }}</div>
					</div>
				
					<FoodAddMinus :foodItem="foodInfo"></FoodAddMinus>
				</view>
			</view>
			<image class="close-img" src="/static/img/user-menu/close-food-detail.png" mode="" @click.stop="closeFoodDetail"></image>
		</view>
	</view>
</template>

<script lang='ts' setup>
import FoodAddMinus from './item/FoodAddMinus.vue';
import { delaySync } from '@/utils/index.js';
import { mapState, mapMutations } from '../../../../../utils/mapVuex';
const showComponents = false
const { foodInfo} = mapState('user', [
	'foodInfo'
])
const {setFoodDetailFlag, setFoodInfo} = mapMutations('user', ['setFoodDetailFlag', 'setFoodInfo'])
function closeFoodDetail() {
	setFoodDetailFlag(false)
	setFoodInfo({})
}
</script>

<style lang="scss" scoped>
.food-detail-container {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	-webkit-backdrop-filter: blur(20px) brightness(100%);
	backdrop-filter: blur(20px) brightness(100%);
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 700;
	.food-detail-box {
		position: relative;
		width: 600rpx;
		margin-bottom: 140rpx;
		// transform: scale(0);
		transition: all 0.3s;
		background-color: #fff;
		border-radius: 16rpx;
	}
	// .show-food-detail-container {
	// 	transform: scale(1);
	// }
	// .hide-food-detail-container {
	// 	transform: scale(0);
	// }
	.food-img {
		border-top-left-radius: 16rpx;
		border-top-right-radius: 16rpx;
		width: 600rpx;
		height: 600rpx;
		// background-color: red;
	}
	.food-info {
		padding: 20rpx 34rpx 0;
		border-bottom-left-radius: 16rpx;
		border-bottom-right-radius: 16rpx;
	}
	.food-name {
		font-weight: bold;
		font-size: 32rpx;
		line-height: 45rpx;
		color: #333333;
	}
	.food-description {
		padding-top: 20rpx;
		font-size: 22rpx;
		color: #666;
		line-height: 30rpx;
	}
	.food-price-order {
		padding-top: 20rpx;
		padding-bottom: 40rpx;
		color: #fb4e44;
		font-size: 48rpx;
		vertical-align: top;
		line-height: 56rpx;
		// background-color: #fafafa;
	}
	.food-unit {
		color: #999;
		font-size: 24rpx;
		line-height: 28rpx;
		padding-bottom: 8rpx;
	}
	.close-img {
		position: absolute;
		left: 50%;
		bottom: -120rpx;
		transform: translateX(-50%);
		width: 80rpx;
		height: 80rpx;
		z-index: 900;
	}
}
</style>
