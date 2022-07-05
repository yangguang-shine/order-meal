<template>
    <view class="food-detail-container flex-row flex-ja-center" @click.stop="closeFoodDetail" @touchmove.stop.prevent>
        <view :animation="overlayAnimationData" class="food-detail-overlay"></view>
        <view :animation="detailAnimationData" class="food-detail-box" @click.stop>
            <!-- <view class="food-img"></view> -->
            <image class="food-img" :src="foodInfo.fullImgPath" alt="" ></image>
            <view class="food-info">
                <view class="food-name">{{ foodInfo.foodName }}</view>
                <view v-if="foodInfo.description" class="food-description">{{ foodInfo.description }}</view>

                <view class="food-price-order flex-row flex-j-between">
                    <div class="flex-row flex-a-end">
                        <div class="food-price">¥{{ foodInfo.price }}</div>
                        <div v-if="foodInfo.unit" class="food-unit">/{{ foodInfo.unit }}</div>
                    </div>

                    <FoodAddMinusItem :foodItem="foodInfo" ></FoodAddMinusItem>
                </view>
            </view>
            <image class="close-img" src="/static/img/user-menu/close-food-detail.png" mode="" @click.stop="closeFoodDetail"></image>
        </view>
    </view>
</template>

<script lang="ts" setup>
import FoodAddMinusItem from "./item/FoodAddMinusItem.vue";
import { delaySync } from "@/utils/index";
import { mapState, mapMutation } from "@/utils/mapVuex";
import { ComputedMutationI, ComputedStateI } from "@/interface/vuex";
import { FoodItemI, initFoodItem } from "@/interface/menu";
import { foodDetailTransitionTime } from "../infoConfig";
import { getCurrentInstance, computed, onMounted, ref, toRefs } from "vue";
import { MenuStoreI, useMenuStore } from "@/piniaStore/menu";


interface MenuStateF {
    foodInfo: ComputedStateI<FoodItemI[]>;
}
interface MutationF {
    setFoodDetailFlag: ComputedMutationI<boolean>;
    setFoodInfo: ComputedMutationI<FoodItemI>;
}
// store
const menuStore: MenuStoreI = useMenuStore()
// state
const { foodInfo }: MenuStateF = toRefs(menuStore.menuState)
// action
const { setFoodDetailFlag, setFoodInfo } = menuStore
const overlayAnimationData = ref(null);
const detailAnimationData = ref(null);
const overlayAnimation = uni.createAnimation({
    duration: foodDetailTransitionTime,
    timingFunction: "ease-in-out",
});

const detailAnimation = uni.createAnimation({
    duration: foodDetailTransitionTime,
    timingFunction: "ease-in-out",
});

onMounted(() => {
    toStartAnimation();
});
function toStartAnimation() {
    overlayAnimation.opacity(1).step();
    overlayAnimationData.value = overlayAnimation.export();
    detailAnimation.scale(1).step();
    detailAnimationData.value = detailAnimation.export();
}
function toEndAnimation() {
    overlayAnimation.opacity(0).step();
    overlayAnimationData.value = overlayAnimation.export();
    detailAnimation.scale(0).step();
    detailAnimationData.value = detailAnimation.export();
}

async function closeFoodDetail() {
	toEndAnimation()
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
    width: 100vw;
    height: 100vh;
    // -webkit-backdrop-filter: blur(20px) brightness(100%);
    // backdrop-filter: blur(20px) brightness(100%);
    // background-color: rgba(0, 0, 0, 0.5);
    z-index: 600;
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
        position: relative;
        width: 600rpx;
        margin-bottom: 140rpx;
        transform: scale(0);
        background-color: #fff;
        border-radius: 16rpx;
    }
    // .show-food-detail-container {
    // 	transform: scale(1);
    // }
    // .hide-food-detail-container {
    // 	transform: scale(0);
    // }
    .food-img {
        border-top-left-radius: 16rpx;
        border-top-right-radius: 16rpx;
        width: 600rpx;
        height: 600rpx;
        // background-color: red;
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
        // color: #ff4b33;

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
        // z-index: 900;
    }
}
</style>
