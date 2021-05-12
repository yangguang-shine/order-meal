<template>
    <div class="order-info-container">
        <div class="shop-info flex-row flex-a-center">
            <image class="shop-img"></image>
            <div class="shop-name">{{shopInfo.shopName}}</div>
            <div class="continue-order">继续点单</div>
        </div>
        <div class="food-list">
            <div v-show="index < 3 || displayMoreFlag" class="food-item flex-row flex-a-center" v-for="(foodItem, index) in foodList" :key="foodItem.foodID">
                <image class="food-img flex-shrink" :src="foodItem.imgUrl ? host + foodItem.imgUrl : '/static/img/default-img.svg'"></image>
                <div class="food-info flex-col flex-j-between">
                    <div class="food-name line1">嘻嘻嘻嘻</div>
                    <div class="food-price"><span class="money-unit">¥</span>{{foodItem.price}}</div>
                </div>
                <div class="food-count">×{{foodItem.orderCount}}</div>
                <div class="food-count-price"><span class="money-unit">¥</span>{{foodItem.foodItemAmount}}</div>
            </div>
        </div>
        <div v-if="foodList.length > 3" class="display-more flex-row flex-ja-center" @click="toggleDisplay">
            <div v-if="displayMoreFlag" class=" flex-row flex-ja-center" >
				<div class="display-more-title">点击收起</div>
				<image class="show-more-arrow" src="/static/img/user-confirm/show-more-order.png" mode=""></image>
			</div>
            <div v-else class=" flex-row flex-ja-center">
				<div class="display-more-title">展开更多</div>
				<image class="hide-more-arrow" src="/static/img/user-confirm/show-more-order.png" mode=""></image>
			</div>
            </div>
        <div class="dash-split">
            <div class="left-circle"></div>
            <div class="right-circle"></div>
        </div>
        <div v-if="minusPrice" class="minus-info flex-row flex-a-center flex-j-between">
            <div class="minus-left flex-row flex-a-center">
                <div class="minus-icon">减</div>
                <div class="minus-title">满减优惠</div>
            </div>
            <div class="minus-price">-¥{{minusPrice}}</div>
        </div>
        <div v-if="minusPrice" class="dash-split">
            <div class="left-circle"></div>
            <div class="right-circle"></div>
        </div>
        <div class="all-price-box flex-row flex-a-center flex-j-between">
            <div></div>
            <div class="all-price-info flex-row flex-a-center">
                <div class="origin-price">共计￥{{originOrderAmount}}</div>
                <div class="discount-price">已优惠￥{{minusPrice}}</div>
                <div class="pay-price">小计<span class="pay-price-color">￥{{payPrice}}</span></div>
            </div>
        </div>
    </div>
</template>

<script>
import { host } from '@/config/host';

export default {
    props: {
        shopInfo: {
            type: Object,
            default: () => {
                minusList: []
            }
        },
        originOrderAmount: {
            type: Number,
            default: 0
        },
        minusPrice: {
            type: Number,
            default: 0
        },
        payPrice: {
            type: Number,
            default: 0
        },
        cartFoodList: {
            type: Array,
            default: () => []
        },
    },
    computed: {
        foodList() {
            const foodList = this.cartFoodList.reduce((list, item) => {
                list = list.concat(item.foodList)
                return list
            }, [])
            return foodList

        }
    },
    data() {
        return {
            host,
            displayMoreFlag: false
        }
    },
	methods: {
		toggleDisplay() {
			this.displayMoreFlag = !this.displayMoreFlag
		}
	} 
}
</script>

<style lang="scss" scoped>
.order-info-container {
    margin-top: 20rpx;
    background-color: #fff;
	border-radius: 12rpx;
    .shop-info {
        height: 100rpx;
        padding: 0 20rpx;
        color: #666;
    }
    .shop-img {
        width: 40rpx;
        height: 40rpx;
        padding-right: 20rpx;
    }

    .food-list {
        padding: 0 20rpx 20rpx;
    }
    .food-item {
        padding: 20rpx;
        margin-bottom: 10rpx;
        background-color: #f8f8f8;
    }

    .food-img {
        height: 110rpx;
        width: 110rpx;
        // border-radius: 8rpx;
        margin-right: 20rpx;
        background-color: red;
    }
    .food-info {
        flex: 10;
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
        flex: 3;
        font-size: 28rpx;
        text-align: right;
        color: #333;
    }
    .display-more {
        margin: 0 auto 30rpx;
        width: 150rpx;
        height: 50rpx;
		box-sizing: border-box;
		border: 1rpx solid #ccc;
		font-size: 24rpx;
		color: #666;
		border-radius: 6rpx;
    }
	.display-more-title {
		padding-right: 10rpx;
	}
	.show-more-arrow {
		width: 8rpx;
		height: 14rpx;
		transform: rotate(-90deg);
	}
	.hide-more-arrow {
		width: 8rpx;
		height: 14rpx;
		transform: rotate(90deg);
	}
    .dash-split {
        position: relative;
        width: 100%;
        height: 0;
        border-bottom: 3rpx dashed #eee;
        margin-bottom: 10rpx;
    }
    .left-circle,
    .right-circle {
        position: absolute;
        top: -12rpx;
        width: 24rpx;
        height: 24rpx;
        background-color: #f4f4f4;
        border-radius: 12rpx;
    }
    .left-circle {
        left: -12rpx;
    }
    .right-circle {
        right: -12rpx;
    }
    .minus-info {
        padding: 20rpx 20rpx 30rpx;
    }
    .minus-icon {
        width: 30rpx;
        height: 30rpx;
        margin-right: 10rpx;
        color: #fff;
        text-align: center;
        font-size: 20rpx;
        line-height: 30rpx;
        background-color: #fb4e44;
    }
    .minus-title {
        font-size: 28rpx;
        line-height: 40rpx;
        color: #333;
    }
    .minus-price {
        font-size: 28rpx;
        font-weight: bold;
        color: #fb4e44;
    }
    .all-price-box {
        padding: 0 20rpx 10rpx;
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