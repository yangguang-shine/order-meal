<template>
    <div>
        <view class="cart-detail-component" @click.stop="closeCartDetail" :style="{'bottom': minusPromotionsObject.show ? footerInfoAndMinusPromotionsHeightPX + 'px' : ''}">
            <transition name="cart-detail-overlay">
                <div v-if="showComponetnsFlag" class="cart-detail-overlay"></div>
            </transition>
            <transition name="cart-detail-box">
                <view v-if="showComponetnsFlag" class="cart-detail-box" @click.stop>
                    <view class="cart-select-box flex-row flex-j-between flex-a-center">
                        <view class="select-goods-title">已选商品</view>
                        <view class="flex-row flex-a-center" @click="cartClearCart">
                            <image class="delete-all-icon" src="/static/img/shop-delete.svg"></image>
                            <text class="clear-cart-title">清空</text>
                        </view>
                    </view>
                    <scroll-view scroll-y class="cart-detail-list-box">
                        <view class="food-category-item" v-for="(foodCategoryItem) in cartFoodList" :key="foodCategoryItem.categoryID">
                            <view class="cart-food-item flex-row" v-for="(cartFoodItem) in foodCategoryItem.foodList" :key="cartFoodItem.foodID">
                                <image v-if="cartFoodItem.orderCount" class="cart-food-img flex-shrink" :src="'/static/img/default-img.svg'" mode="scaleToFill"></image>
                                <view v-if="cartFoodItem.orderCount" class="cart-food-info-box flex-item flex-col flex-j-between">
                                    <view class="cart-food-name-description">
                                        <view class="cart-food-name">{{ cartFoodItem.foodName }}</view>
                                        <view class="cart-food-description">{{ cartFoodItem.description }}</view>
                                    </view>
                                    <view class="cart-food-price-button flex-row flex-j-between flex-a-center">
                                        <view class="cart-food-price">¥{{ cartFoodItem.foodItemAmount }}</view>
                                        <FoodAddMinus :foodItem="cartFoodItem"></FoodAddMinus>
                                    </view>
                                </view>
                            </view>
                        </view>
                    </scroll-view>
                </view>
            </transition>
        </view>
        <!-- 下面用来解决点击购物车无动效的问题 -->
        <div class="cart-img-transparent" @click="closeCartDetail"></div>
    </div>

</template>

<script lang='ts' setup>
import { delaySync } from "@/utils/index.js";
import FoodAddMinus from "./item/FoodAddMinus";
import { getCurrentInstance, computed, onMounted, ref } from "vue";
import { footerInfoAndMinusPromotionsHeightPX } from "../infoConfig";

const {
    $showLoading,
    $hideLoading,
    $showModal,
    $delaySync
} = getCurrentInstance().proxy;
import {
    mapState,
    mapGetters,
    mapMutations
} from "../../../../../utils/mapVuex";
const { minusPromotionsObject } = mapGetters("user", ["minusPromotionsObject"]);
const { cartFoodList, foodCategoryList } = mapState("user", [
    "cartFoodList",
    "foodCategoryList"
]);
const { setCartDetailFlag, clearCart } = mapMutations("user", [
    "setCartDetailFlag",
    "clearCart"
]);
const showComponetnsFlag = ref(false);
onMounted(() => {
    showComponetnsFlag.value = true;
});
async function toClearCart() {
    await $showModal({
        content: "确认清空购物车吗？",
        showCancel: true
    });
    clearCart();
    setCartDetailFlag(false);
}
async function closeCartDetail() {
    showComponetnsFlag.value = false;
    await $delaySync(300);
    setCartDetailFlag(false);
}
async function cartClearCart() {
    await $showModal({
        content: "确认清空购物车吗？",
        showCancel: true
    });
    clearCart();
    setCartDetailFlag(false);
}

// cartClearCart() {
//     this.$emit('cartClearCart');
// },
// async closeCartDetail() {
//     this.showComponents = false
//     await delaySync(300)
//     this.$emit('closeCartDetail');
// },
</script>

<style lang="scss" scoped>
.cart-detail-component {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 140rpx;
    width: 100%;
    font-size: 28rpx;
    -webkit-overflow-scrolling: touch;
    z-index: 400;
    .cart-detail-overlay-enter-from,
    .cart-detail-overlay-leave-to {
        background-color: rgba(0, 0, 0, 0);
    }
    .cart-detail-overlay-enter-to,
    .cart-detail-overlay-leave-from {
        background-color: rgba(0, 0, 0, 0.5);
    }
    .cart-detail-box-enter-from,
    .cart-detail-box-leave-to {
        transform: translateY(100%);
    }
    .cart-detail-box-leave-from,
    .cart-detail-box-enter-to {
        transform: translateY(0);
    }

    .cart-detail-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        transition: all ease-in-out 0.3s;
    }
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
        transition: all ease-in-out 0.3s;
    }

    .cart-detail-box-show {
        transform: translateY(0%);
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
.cart-img-transparent {
    position: fixed;
    width: 140rpx;
    height: 140rpx;
    bottom: 50rpx;
    left: 20rpx;
    background-color: transparent;
    z-index: 800;
    // width: ;
}
</style>
