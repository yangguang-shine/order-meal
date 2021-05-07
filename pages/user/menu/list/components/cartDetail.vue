<template>
    <view class="cart-detail-mask" @click.stop="closeCartDetail" :class="{'cart-detail-mask-show': showComponents}"  @touchmove.stop.prevent>
    <!-- <view class="cart-detail-mask" @click.stop="closeCartDetail" :class="{'cart-detail-mask-show': showComponents}"  @touchmove.stop.prevent="moveStop"> -->
        <view class="cart-detail-box" :style="{ 'padding-bottom': minusPromotionsObject.show ? '50rpx' : '' }" :class="showComponents ? 'cart-detail-box-show' : 'cart-detail-box-hide'" >
            <view class="cart-select-box flex-row flex-j-between flex-a-center" @click.stop>
                <view class="select-goods-title">已选商品</view>
                <view class="flex-row flex-a-center" @click="cartClearCart">
                    <image class="delete-all-icon" src="/static/img/shop-delete.svg"></image>
                    <text class="clear-cart-title">清空</text>
                </view>
            </view>
            <scroll-view scroll-y class="cart-detail-list-box" @click.stop>
                <view class="food-category-item" v-for="(foodCategoryItem) in cartFoodList" :key="foodCategoryItem.categoryID">
                    <view class="cart-food-item flex-row" v-for="(cartFoodItem) in foodCategoryItem.foodList" :key="cartFoodItem.foodID">
                        <image v-if="cartFoodItem.orderCount" class="cart-food-img flex-shrink" :src="cartFoodItem.imgUrl ? host + cartFoodItem.imgUrl : '/static/img/default-img.svg'" mode="scaleToFill"></image>
                        <view v-if="cartFoodItem.orderCount" class="cart-food-info-box flex-item flex-col flex-j-between">
                            <view class="cart-food-name-description">
                                <view class="cart-food-name">{{ cartFoodItem.foodName }}</view>
                                <view class="cart-food-description">{{ cartFoodItem.description }}</view>
                            </view>
                            <view class="cart-food-price-button flex-row flex-j-between flex-a-center">
                                <view class="cart-food-price">¥{{ cartFoodItem.foodItemAmount }}</view>
                                <food-add-minus :foodItem="cartFoodItem" @addCount="addCount" @minusCount="minusCount" hideAnimateFlag></food-add-minus>
                            </view>
                        </view>
                    </view>
                </view>
            </scroll-view>
        </view>
    </view>
</template>

<script>

import { host } from '@/config/host';
import { delaySync } from '@/utils/index.js';
import foodAddMinus from './item/foodAddMinus'


export default {
    components: {
        foodAddMinus,
    },
    props: {
        minusPromotionsObject: {
            type: Object,
            default: () => { }
        },
        cartFoodList: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            host,
            showComponents: false
        }
    },
    async mounted() {
        await this.$delaySync(0)
        this.showComponents = true;
    },
    methods: {
        moveStop() {},
        addCount(foodItem) {
            this.$emit('addCount', foodItem);
        },
        minusCount(foodItem) {
            this.$emit('minusCount', foodItem);
        },

        toShowCartDetail() {
            this.$emit('toShowCartDetail');
        },
        cartClearCart() {
            this.$emit('cartClearCart');
        },
        async closeCartDetail() {
            this.showComponents = false
            await delaySync(300)
            this.$emit('closeCartDetail');
        },

    }
};
</script>

<style lang="scss">
.cart-detail-mask {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 140rpx;
    width: 100%;
    background-color: rgba(0, 0, 0, 0);
    font-size: 28rpx;
    -webkit-overflow-scrolling: touch;
    z-index: 400;
    transition: all ease-in-out 0.3s;
    .cart-detail-box {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        max-height: 800rpx;
        box-sizing: border-box;
        padding: 0 0 10rpx;
        background-color: #fff;
        overflow-y: auto;
        border-radius: 30rpx 30rpx 0 0;
        transition: all ease-in-out .3s;
        transform: translateY(100%)
    }

    .cart-detail-box-show {
        transform: translateY(0%)

    }
    // .cart-detail-box-hide {
    //     bottom: -800rpx;
    // }
    .cart-select-box {
        padding: 20rpx 30rpx;
        font-size: 24rpx;
        color: #999;
    }

    .delete-all-icon {
        padding: 10rpx;
        height: 30rpx;
        width: 30rpx;
    }

    .cart-detail-list-box {
        max-height: 620rpx;
        padding-bottom: 20rpx;
        overflow-y: auto;
        ::-webkit-scrollbar {
        display: none;
        width: 0 !important;
        height: 0 !important;
        -webkit-appearance: none;
        background: transparent;
    }
    }
    .cart-detail-list-box::-webkit-scrollbar {
        display: none;
        width: 0 !important;
        height: 0 !important;
        -webkit-appearance: none;
        background: transparent;
    }
    .cart-food-item {
        padding: 10rpx 30rpx;
    }
    .cart-food-img {
        padding: 4rpx 0 8rpx 0;
        height: 120rpx;
        width: 120rpx;
    }
    .cart-food-price-button {
        font-size: 26rpx;
    }
    .cart-food-name {
        font-weight: bold;
        max-width: 400rpx;
        font-size: 28rpx;
        line-height: 38rpx;
    }
    .cart-food-description {
        // margin-top: 10rpx;
        font-size: 22rpx;
        color: #999;
    }
    .cart-food-price {
        font-size: 30rpx;
        line-height: 34rpx;
        font-weight: bold;
        color: $color-red;
    }

    .cart-food-info-box {
        padding-left: 20rpx;
    }
}
.cart-detail-mask-show {
    background-color: rgba(0, 0, 0, 0.5);
}

</style>
