<template>
	<view class="food-detail-container flex-row flex-ja-center" @click.stop="closeFoodDetail" @touchmove.stop>
		<view class="food-detail-box" @click.stop :class="showComponents ? 'show-food-detail-container' : 'hide-food-detail-container'">
			<view class="food-img"></view>
			<view class="food-info">
				<view class="food-name">1111</view>
				<view v-if="foodItem.description" class="food-description">{{ foodItem.description }}</view>
				
				<view class="food-price-order flex-row flex-j-between">
					<div class="flex-row flex-a-end">
						<div class="food-price">¥{{ foodItem.price }}</div>
						<div v-if="foodItem.unit" class="food-unit">/{{ foodItem.unit }}</div>
					</div>
				
					<food-add-minus :foodItem="foodItem" @addCount="addCount" @minusCount="minusCount"></food-add-minus>
				</view>
			</view>
			<image class="close-img" src="/static/img/user-menu/close-food-detail.png" mode="" @click.stop="closeFoodDetail"></image>
		</view>
	</view>
</template>

<script>
import foodAddMinus from './item/foodAddMinus.vue';
import { delaySync } from '@/utils/index.js';
export default {
	components: {
		foodAddMinus
	},
	props: {
		foodItem: {
			type: Object,
			default: () => {}
		}
	},
	data() {
		return {
			showComponents: false
		};
	},
	mounted() {
		setTimeout(() => {
			this.showComponents = true;
		}, 0);
	},
	methods: {
		addCount(foodItem) {
			this.$emit('addCount', foodItem);
		},
		minusCount(foodItem) {
			this.$emit('minusCount', foodItem);
		},
		async closeFoodDetail() {
			this.showComponents = false;
			await delaySync(300);
			this.$emit('closeFoodDetail');
		}
	}
};
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
		transform: scale(0);
		transition: all 0.3s;
		background-color: #fff;
		border-radius: 16rpx;
	}
	.show-food-detail-container {
		transform: scale(1);
	}
	// .hide-food-detail-container {
	// 	transform: scale(0);
	// }
	.food-img {
		border-top-left-radius: 16rpx;
		border-top-right-radius: 16rpx;
		width: 100%;
		height: 600rpx;
		background-color: red;
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
