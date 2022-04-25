<template>
    <view class="order-info-container">
        <view class="shop-info flex-row flex-a-center flex-j-between">
            <view class="flex-row flex-a-center">
                <image class="shop-img"></image>
                <view class="shop-name">{{ shopInfo.shopName }}</view>
            </view>
            <view @click="continueOrder" class="continue-order flex-row flex-ja-center" :style="{ color: shopInfo.mainColor }">继续点单</view>
        </view>
        <view class="food-list" :animation="foodListAnimationData" :style="{ 'max-height': foodListMaxHeihgt }">
            <OrderFoodItem v-for="(orderFoodItem, index) in orderFoodList" :orderFoodItem="orderFoodItem" :key="index"></OrderFoodItem>
        </view>
        <view v-if="orderFoodList.length > defaultIndex" class="display-more flex-row flex-ja-center" @click="toggleDisplay">
            <view v-if="displayMoreFlag" class="flex-row flex-ja-center">
                <view class="display-more-title">点击收起</view>
                <image class="show-more-arrow" src="/static/img/user-confirm/show-more-order.png" mode=""></image>
            </view>
            <view v-else class="flex-row flex-ja-center">
                <view class="display-more-title">展开更多</view>
                <image class="hide-more-arrow" src="/static/img/user-confirm/show-more-order.png" mode=""></image>
            </view>
        </view>
        <div class="pack-deliver-price-box" v-if="cartPriceInfo.allPackPrice || businessType === 2">
            <div v-if="cartPriceInfo.allPackPrice" class="pack-price flex-row flex-a-center flex-j-between">
                <div class="left">打包费</div>
                <div class="right">¥{{cartPriceInfo.allPackPrice}}</div>
            </div>
            <div v-if="businessType === 2" class="deliver-price flex-row flex-a-center flex-j-between">
                <div class="left">配送费</div>
                <div class="right">¥{{shopInfo.deliverPrice}}</div>
            </div>
        </div>

        <view class="dash-split">
            <view class="left-circle"></view>
            <view class="right-circle"></view>
        </view>
        <view v-if="cartPriceInfo.minusPrice" class="minus-info flex-row flex-a-center flex-j-between">
            <view class="minus-left flex-row flex-a-center">
                <view class="minus-icon">减</view>
                <view class="minus-title">满减优惠</view>
            </view>
            <view class="minus-price" :style="{'color': shopInfo.mainColor}">-¥{{ cartPriceInfo.minusPrice }}</view>
        </view>
        <view v-if="cartPriceInfo.minusPrice" class="dash-split">
            <view class="left-circle"></view>
            <view class="right-circle"></view>
        </view>
        <view class="all-price-box flex-row flex-a-center flex-j-between">
            <view></view>
            <view class="all-price-info flex-row flex-a-center">
                <view class="origin-price">共计¥{{ cartPriceInfo.orderOriginAmount }}</view>
                <view class="discount-price">已优惠¥{{ cartPriceInfo.minusPrice || 0 }}</view>
                <view class="pay-price">
                    小计<span class="pay-price-color" :style="{'color': shopInfo.mainColor}">¥{{ cartPriceInfo.payPrice }}</span>
                </view>
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { computed, ref, getCurrentInstance } from "vue";
import OrderFoodItem from "@/components/OrderFoodItem.vue";
import { mapState, mapGetter } from "@/utils/mapVuex";
import { foodListTransitionTime } from "../comfirmConfig";
import { ComputedStateI, ComputedGetterI } from "@/interface/vuex";
import { CategoryItemI, FoodItemI } from "@/interface/menu";
import { ShopItemI } from "@/interface/home";
import { ComputedI, RefI } from "@/interface/vueInterface";
import { CartPriceInfoI } from "@/store/getters/menu";
const { $showLoading, $hideLoading, $myrouter } = getCurrentInstance().proxy;
interface StateF {
    shopInfo: ComputedStateI<ShopItemI>;
    businessType: ComputedStateI<number>;
}
interface GetterF {
    orderFoodList: ComputedGetterI<FoodItemI[]>;
    cartPriceInfo: ComputedGetterI<CartPriceInfoI>;
}

const { shopInfo, businessType }: StateF = mapState();
const { orderFoodList, cartPriceInfo }: GetterF = mapGetter();
const defaultIndex = 3;
const defaultMaxHeight = "480rpx";
const displayMoreMaxHeight = `${(150 + 10) * orderFoodList.value.length + 50}rpx`;
const foodListMaxHeihgt: RefI<string> = ref(defaultMaxHeight);
const displayMoreFlag: RefI<boolean> = ref<boolean>(false);
const foodListAnimationData = ref(null);
// const foodListAnimation = uni.createAnimation({
//     duration: foodListTransitionTime,
//     timingFunction: "ease-in-out",
// });
// function toStartAnimation() {
//     foodListAnimation.height(`${(150 + 10) * orderFoodList.value.length}rpx`).step();
//     foodListAnimationData.value = foodListAnimation.export();
// }
// function toEndAnimation() {
//     foodListAnimation.height(`${(150 + 10) * defaultIndex}rpx`).step();
//     foodListAnimationData.value = foodListAnimation.export();
// }
function toggleDisplay() {
    displayMoreFlag.value = !displayMoreFlag.value;
    if (displayMoreFlag.value) {
        foodListMaxHeihgt.value = displayMoreMaxHeight;
    } else {
        foodListMaxHeihgt.value = defaultMaxHeight;
    }
}
function continueOrder() {
    $myrouter.back();
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
    }
    .shop-img {
        width: 40rpx;
        height: 40rpx;
        padding-right: 20rpx;
    }
    .shop-name {
        color: #333;
        font-weight: bold;
        font-size: 34rpx;
    }
    .continue-order {
        // color: #666;
        font-size: 28rpx;
        margin-right: 20rpx;
        width: 150rpx;
        height: 50rpx;
        border-radius: 8rpx;
        border: 1rpx solid;
    }
    .food-list {
        padding: 0 20rpx 0;
        box-sizing: border-box;
        overflow: hidden;
        max-height: 500rpx;
        transition: all 0.3s ease-in-out;
        margin-bottom: 20rpx;
    }
    .display-more {
        margin: 10rpx auto 20rpx;
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
    .pack-deliver-price-box {
        padding: 20rpx;
    }
    .pack-price,
    .deliver-price {
        padding: 0 20rpx 20rpx;
        font-size: 28rpx;
        color: #666;
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
