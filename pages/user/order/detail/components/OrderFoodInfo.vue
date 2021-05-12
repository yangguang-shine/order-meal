<template>
	<div class="order-food-info-container">
		<div class="shop-info-box line1">洁柔</div>
		<div class="order-list-box">
			<order-food-item v-for="(orderFoodItem, index) in orderDetail.foodList" :orderFoodItem="orderFoodItem" :key="index"></order-food-item>
		</div>
		<div class="minus-box flex-row flex-a-center" v-if="orderDetail.minusPrice">
			<image class="minus-icon" src="/static/img/orderMinus.svg"></image>
			<div class="flex-item flex-row flex-j-between">
				<div class="minus-title">满减优惠</div>
				<div class="minus-price">-¥{{ orderDetail.minusPrice }}</div>
			</div>
		</div>
		<div class="all-price-box flex-row flex-a-center flex-j-between">
		    <div></div>
		    <div class="all-price-info flex-row flex-a-center">
		        <div class="origin-price">共计￥{{orderDetail.originOrderAmount}}</div>
		        <div class="discount-price">已优惠￥{{orderDetail.minusPrice}}</div>
		        <div class="pay-price">小计<span class="pay-price-color">￥{{orderDetail.orderAmount}}</span></div>
		    </div>
		</div>
	</div>
</template>

<script>
import OrderFoodItem from '@/components/OrderFoodItem.vue';

export default {
	components: {
		OrderFoodItem,
	},
	props: {
		orderDetail: {
			type: Object,
			default: () => {}
		}
	},
};
</script>

<style lang="scss" scoped>
.order-food-info-container {
		padding: 30rpx;
		border-radius: 12rpx;
		margin-bottom: 20rpx;
		background-color: #fff;
	.shop-info-box {
		font-size: 36rpx;
		font-weight: bold;
		margin-bottom: 30rpx;
	}
	.order-list-box {
		padding: 0 0 20rpx;
	}
	.order-item {
		margin-bottom: 30rpx;
	}
	.food-img {
		height: 80rpx;
		width: 80rpx;
		margin-right: 20rpx;
	}
	.food-info {
		height: 80rpx;
		flex: 12;
	}
	.food-count {
		flex: 2;
	}
	.food-total-price {
		flex: 3;
		text-align: right;
	}
	.minus-box {
		margin-top: 10rpx;
	}
	.minus-icon {
		height: 36rpx;
		width: 36rpx;
		margin-right: 20rpx;
	}
	.minus-price {
		font-size: 28rpx;
		font-weight: bold;
		color: #fb4e44;
	}
	.all-price-box {
	    // padding: 0 20rpx 0;
		padding-top: 20rpx;
	    height: 80rpx;
	}
	.all-price-info {
	    color: #999;
	    font-size: 24rpx;
	    line-height: 40rpx;
	}
	.origin-price,
	.discount-price {
	    padding-right: 30rpx;
	}
	.pay-price {
	    font-weight: bold;
	    font-size: 28rpx;
	    color: #333;
	}
	
	.pay-price-color {
	    color: #fb4e44;
	}
}
</style>
