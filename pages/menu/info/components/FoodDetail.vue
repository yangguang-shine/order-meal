<template>
    <view class="food-detail-container flex-row flex-ja-center" @click.stop="closeFoodDetail" @touchmove.stop>
        <view :animation="overlayAnimationData" class="food-detail-overlay"></view>
        <view :animation="mainAnimationData" class="food-detail-box flex-col" @click.stop :style="{ 'padding-bottom': (minusPromotionsObject.show ? footerAndMinusPX : footerPX) + 15 + 'px' }">
            <!-- <view class="food-img"></view> -->
            <image class="food-img" :src="foodInfo.fullImgPath" alt=""></image>
            <!-- <image class="food-img" :src="foodInfo.fullImgPath" alt="" ></image> -->
            <div class="food-info">
                <view class="food-name">{{ foodInfo.foodName }}</view>
                <view v-if="foodInfo.description" class="food-description">{{ foodInfo.description }}</view>
                <view class="food-price-order flex-row flex-j-between">
                    <div class="flex-row flex-a-end">
                        <div class="food-price" :style="{ color: $mainColor }">¥{{ foodInfo.price }}</div>
                        <div v-if="foodInfo.unit" class="food-unit">{{ packPriceText }}/{{ foodInfo.unit }}</div>
                    </div>
                    <FoodAddMinusItem v-if="foodInfo.reserveCount > 0" :foodItem="foodInfo" type="foodDetail" ></FoodAddMinusItem>
                    <ReserveNotEnough v-else></ReserveNotEnough>
                </view>
                <div class="food-detail-title">菜品详情</div>
                <div class="food-detail">哈哈哈哈哈哈哈哈哈哈或或或哈哈哈哈哈哈哈哈哈哈或或或哈哈哈哈哈哈哈哈哈哈或或或哈哈哈哈哈哈哈哈哈哈或或或</div>
            </div>
            <image class="close-img" src="/static/img/user-menu/close-food-detail.png" mode="" @click.stop="closeFoodDetail"></image>
        </view>
    </view>
</template>

<script lang="ts" setup>
import FoodAddMinusItem from "./item/FoodAddMinusItem.vue";
import ReserveNotEnough from "./item/ReserveNotEnough.vue";
import { delaySync } from "@/utils/index";

import { FoodItemI, initFoodItem } from "@/interface/menu";
import { foodDetailTransitionTime } from "../infoConfig";
import { RefI } from "@/interface/vueInterface";
import useOverlayAnimation from "@/utils/useOverlayAnimation";
import { getCurrentInstance, computed, onMounted, ref, toRefs } from "vue";
import { MenuGetterG, MenuStoreI, useMenuStore } from "@/piniaStore/menu";
import { storeToRefs} from 'pinia'
import { MenuStateG } from "@/piniaStore/menu/state";

// store
const menuStore: MenuStoreI = useMenuStore()
// state
const { foodInfo, shopInfo, businessType, footerPX }: MenuStateG = toRefs(menuStore.menuState);
// getter
const { minusPromotionsObject, footerAndMinusPX }: MenuGetterG = storeToRefs(menuStore)
// action
const { setFoodDetailFlag, setFoodInfo } = menuStore
// animation
const { overlayAnimationData, mainAnimationData, toStartAnimation, toEndAnimation } = useOverlayAnimation({
    duration: foodDetailTransitionTime,
    timingFunction: "ease-in-out",
});
onMounted(() => {
    toStartAnimation();
});

const packPriceText: RefI<string> = computed((): string => {
    let text = "";
    if (foodInfo.value.packPrice > 0) {
        if (businessType.value === 2 || businessType.value === 3) {
            text = `包装费¥${foodInfo.value.packPrice}`;
        }
    }
    return text;
});
// function toStartAnimation() {
//     overlayAnimation.opacity(1).step();
//     overlayAnimationData.value = overlayAnimation.export();
//     detailAnimation.translateY(0).step();
//     detailAnimationData.value = detailAnimation.export();
// }
// function toEndAnimation() {
//     overlayAnimation.opacity(0).step();
//     overlayAnimationData.value = overlayAnimation.export();
//     detailAnimation.translateY("100%").step();
//     detailAnimationData.value = detailAnimation.export();
// }

async function closeFoodDetail() {
    toEndAnimation();
    await delaySync(foodDetailTransitionTime);
    setFoodDetailFlag(false);
    setFoodInfo(initFoodItem);
}
</script>

<style lang="scss" scoped>
.food-detail-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    bottom: 0;
    // -webkit-backdrop-filter: blur(20px) brightness(100%);
    // backdrop-filter: blur(20px) brightness(100%);
    // background-color: rgba(0, 0, 0, 0.5);
    z-index: 500;
    .food-detail-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        // -webkit-backdrop-filter: blur(20px) brightness(100%);
        // backdrop-filter: blur(20px) brightness(100%);
        background-color: rgba(0, 0, 0, 0.5);
        opacity: 0;
    }
    .food-detail-box {
        position: absolute;
        top: 10%;
        left: 0;
        width: 100%;
        bottom: 0;
        background-color: #fff;
        box-sizing: border-box;
        transform: translateY(100%);
        overflow: auto;
    }
    // .show-food-detail-container {
    // 	transform: scale(1);
    // }
    // .hide-food-detail-container {
    // 	transform: scale(0);
    // }
    .food-img {
        width: 750rpx;
        height: 750rpx;
        // background-color: red;
    }
    .food-info {
        padding: 32rpx 32rpx 0;
        // border-bottom-left-radius: 16rpx;
        // border-bottom-right-radius: 16rpx;
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
        padding-right: 120rpx;
    }
    .food-price-order {
        padding-top: 20rpx;
        padding-bottom: 40rpx;
        color: #fb4e44;
        font-size: 48rpx;
        vertical-align: top;
        line-height: 56rpx;
        // color: #ff4b33;

        // background-color: #fafafa;
    }
    .food-unit {
        margin-left: 4rpx;
        color: #999;
        font-size: 24rpx;
        line-height: 28rpx;
        padding-bottom: 8rpx;
    }
    .food-detail-title {
        margin-top: 20rpx;
        font-size: 28rpx;
        color: #333;
        font-size: 28rpx;
    }
    .food-detail {
        margin-top: 10rpx;
        font-size: 24rpx;
        color: #aaa;
    }
    .close-img {
        position: absolute;
        top: 20rpx;
        // opacity: 0;
        right: 20rpx;
        width: 80rpx;
        height: 80rpx;
        // z-index: 900;
    }
}
</style>
