<template>
	<scroll-view scroll-y scroll-with-animation :scroll-into-view="scrollIntoCategoryID" class="food-main-box flex-item" id="food-main-box" @scroll="foodScrollHandle">
		<view
			class="food-category-list-item"
			:data-food-category-item="JSON.stringify(foodCategoryItem)"
			v-for="(foodCategoryItem, index) in foodCategoryList"
			:key="index"
			:id="foodCategoryItem.scrollTabID + 'id'"
		>
			<view :id="foodCategoryItem.scrollTabID" class="food-category-name">{{ foodCategoryItem.categoryName }}</view>
			<view class="food-item flex-item flex-row" v-for="(foodItem, foodIndex) in foodCategoryItem.foodList" :key="foodIndex">
				<image class="food-img  flex-shrink" :src="host + foodItem.imgUrl" mode="scaleToFill"></image>
				<view class="food-info-box flex-item flex-col flex-j-between">
					<view class="food-name-description">
						<view class="food-name">{{ foodItem.foodName }}</view>
						<view class="food-description">{{ foodItem.description }}</view>
					</view>
					<view class="food-price-button flex-row flex-j-between flex-a-center">
						<view class="food-price">¥{{ foodItem.price }}</view>
						<view
							v-if="foodItem.orderCount < 1"
							class="food-count-add"
							:style="{ 'background-color': $mainColor }"
							@click="addCount(foodCategoryItem.categoryID, foodItem)"
						></view>
						<view v-else class="flex-row flex-a-center">
							<view class="food-count-minus" :style="{ color: $mainColor }" @click="minusCount(foodCategoryItem.categoryID, foodItem)">
								<view class="reduce-icon-css" :style="{ 'background-color': $mainColor }"></view>
							</view>
							<view class="food-order-count">{{ foodItem.orderCount }}</view>
							<view class="food-count-add" :style="{ 'background-color': $mainColor }" @click="addCount(foodCategoryItem.categoryID, foodItem)"></view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</scroll-view>
</template>

<script>
import { host } from '@/config/host';

export default {
	props: {
		foodCategoryList: {
			type: Array,
			default: () => []
		},
		scrollIntoCategoryID: {
			type: String,
			default: ''
		}
	},
	data() {
		return {
			host
		}
	},
	methods: {
		foodScrollHandle() {
			this.$emit('foodScrollHandle');
		},
		addCount(categoryID, foodItem) {
			this.$emit('addCount', categoryID, foodItem);
		},
		minusCount(categoryID, foodItem) {
			this.$emit('minusCount', categoryID, foodItem);
		},
	}
};
</script>

<style lang="scss" >
	
	@import './addMinusStyle.scss';
.food-main-box {
	// background-color: blue;
	height: 100%;
	flex-shrink: 0;
	box-sizing: border-box;
	padding-top: 80rpx;
	::-webkit-scrollbar {
		display: none;
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}
	.food-category-list-item {
		padding: 0 30rpx 0 20rpx;
	}

	.food-category-name {
		font-size: 24rpx;
		line-height: 30rpx;
		color: #666;
		padding: 10rpx 0;
		color: #333;
		// margin: 0 0 20rpx;
	}

	.food-category-list-item:first-child .food-category-name {
		padding-top: 20rpx;
	}
	.food-item {
		padding: 20rpx 0;
	}
	.food-img {
		padding: 6rpx 0;
		height: 150rpx;
		width: 150rpx;
	}
	.food-info-box {
		padding-left: 20rpx;
	}
	.food-name {
		font-weight: bold;
		font-size: 32rpx;
		line-height: 44rpx;
		color: #333;
	}
	.food-description {
		font-size: 22rpx;
		line-height: 30rpx;
		color: #666;
		margin-top: 10rpx;
	}
	.food-price {
		line-height: 42rpx;
		color: $color-red;
		font-size: 36rpx;
		font-weight: bold;
	}
}
</style>
