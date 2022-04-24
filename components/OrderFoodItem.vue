<template>
	<div class="order-food-item-container flex-row flex-a-center">
		<image class="food-img flex-shrink" :src="orderFoodItem.fullImgPath"></image>
		<div class="food-info flex-col flex-j-between">
			<div class="food-name line1">嘻嘻嘻嘻</div>
			<div class="food-price flex-row">
				<span class="money-unit">¥</span>
				{{ orderFoodItem.price }}
			</div>
		</div>
		<div class="food-count">×{{ orderFoodItem.orderCount }}</div>
		<div class="food-count-price">
			<span class="money-unit">¥</span>{{ orderFoodItem.foodItemAmount }}
		</div>
	</div>
</template>

<script lang='ts' setup>
defineProps({
  orderFoodItem: {
		type: Object,
			default: () => {}
  }
})
</script>

<style lang="scss" scoped>
.order-food-item-container {
	    margin-top: 10rpx;

	    padding: 20rpx;
	    background-color: #f8f8f8;
	.food-img {
	    height: 110rpx;
	    width: 110rpx;
	    // border-radius: 8rpx;
	    margin-right: 20rpx;
	    // background-color: red;
	}
	.food-info {
	    flex: 8;
	    font-size: 28rpx;
	    height: 110rpx;
	
	    // height: 90rpx;
	}
	.food-name {
	    max-width: 320rpx;
	    font-size: 28rpx;
	    line-height: 40rpx;
	    color: #333;
	}
	.food-price {
	    font-size: 24rpx;
	    color: #999;
	}
	.food-count {
	    flex: 2;
	    font-size: 28rpx;
	    line-height: 34rpx;
	    text-align: center;
	    color: #666;
	}
	.food-count-price {
	    flex: 4;
	    font-size: 28rpx;
	    text-align: right;
	    color: #333;
	}
}
</style>
