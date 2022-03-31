<template>
    <view class="footer-cart-container" :style="{'position': shopInfoFlag ? 'absolute' : 'fixed'}">
        <view class="footer-cart flex-row flex-j-between flex-a-center">
            <view class="cart-img-box">
                <image class="cart-img" @click="clickCartImg" src="/static/img/cart-icon.png" mode="scaleToFill"></image>
                <view v-if="allCartFoodCount" class="cart-all-count" :style="{ background: $mainColor }">{{ allCartFoodCount }}</view>
            </view>
            <view class="flex-item cart-all-amount">
                <text class="amount-unit">¥</text>
                <text class="discounted-price">{{ cartPriceInfo.cartAlldiscountedPrice }}</text>
                <text v-if="cartPriceInfo.discountPrice" class="origin-price">¥{{ cartPriceInfo.cartAllOriginPrice }}</text>
            </view>
            <view class="com-button confirm-order" :style="{ 'background-color': +cartPriceInfo.cartAlldiscountedPrice > 0 ? $mainColor : '' }" @click="toComfirmOrder"></view>
            <!-- <view class="com-button confirm-order" :style="{ 'background-color': +cartPriceInfo.cartAlldiscountedPrice > 0 ? $mainColor : '' }" @click="toComfirmOrder">去下单</view> -->
        </view>
    </view>
</template>

<script lang='ts' setup>
import { getCurrentInstance } from "vue";
import {
    mapGetter,
    mapMutation,
    mapState
} from "@/utils/mapVuex";
const { $showLoading, $hideLoading, $myrouter } = getCurrentInstance().proxy;
import { ComputedGetterI, ComputedMutationI, ComputedStateI } from "@/interface/vuex";
import { CategoryItemI, FoodItemI } from "@/interface/menu";
import { MinusPromotionsObjectI, AsideCategoryItemI, CartPriceInfoI } from "@/store/getters/menu";
import { RefI } from "@/interface/vueInterface";

interface StateF {
    shopInfoFlag: ComputedStateI<boolean>;
    cartCategoryList: ComputedStateI<CategoryItemI[]>;
}
interface GetterF {
    cartPriceInfo: ComputedGetterI<CartPriceInfoI>;
    allCartFoodCount: ComputedGetterI<number>;
}
interface MutationF {
    toogleCartDetailFlag: ComputedMutationI;
}
const { shopInfoFlag, cartCategoryList } = mapState(["shopInfoFlag", 'cartCategoryList']);

const { cartPriceInfo, allCartFoodCount }:GetterF = mapGetter([
    "cartPriceInfo",
    "allCartFoodCount"
]);

const { toogleCartDetailFlag }: MutationF = mapMutation(["toogleCartDetailFlag"]);
function toComfirmOrder() {
    $myrouter.navigateTo({
        name: "menu/confirm"
    });
}
function clickCartImg() {
    if (cartCategoryList.value.length > 0) {
        toogleCartDetailFlag()
    }
}
</script>

<style lang="scss">
.footer-cart-container {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 140rpx;
    background-color: #fff;
    color: #fff;
    z-index: 600;

    .footer-cart {
        width: 100%;
        height: 100rpx;
        background-color: #3b3b3c;
        // border-radius: 50rpx;
        color: #fff;
        // padding-bottom: 30rpx;
    }
    .cart-all-amount {
        padding-left: 160rpx;
    }
    .amount-unit {
        font-size: 32rpx;
        line-height: 36rpx;
        padding-right: 6rpx;
    }
    .discounted-price {
        font-size: 48rpx;
        line-height: 56rpx;
    }
    .origin-price {
        margin-left: 10rpx;
        font-size: 24rpx;
        line-height: 28rpx;
        color: #999;
        text-decoration: line-through;
    }
    .cart-img-box {
        position: absolute;
        bottom: 50rpx;
        left: 20rpx;
        height: 140rpx;
        width: 140rpx;
        // z-index: 600;
    }
    .cart-img {
        height: 140rpx;
        width: 140rpx;
    }

    .cart-all-count {
        position: absolute;
        right: -20rpx;
        top: 10rpx;
        height: 32rpx;
        width: 32rpx;
        font-size: 22rpx;
        line-height: 32rpx;
        border-radius: 50%;
        text-align: center;
    }
    .confirm-order {
        margin-right: 10rpx;
        width: 250rpx;
        background-color: #666;
    }
}
</style>
