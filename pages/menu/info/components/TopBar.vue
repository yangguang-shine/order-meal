<template>
    <view class="com-top-bar-container flex-row flex-a-center flex-j-between">
        <view class="left flex-row flex--ja-center">
            <view class="top-bar-item flex-item flex-row flex-ja-center" :class="{ 'select-top-item': topBarInfo === '点餐' }" @click="clickTopBar('点餐')" :style="{ color: topBarInfo === '点餐' ? shopInfo.mainColor : '' }">点餐</view>
            <view class="top-bar-item flex-item flex-row flex-ja-center" :class="{ 'select-top-item': topBarInfo === '商家' }" :style="{ color: topBarInfo === '商家' ? shopInfo.mainColor : '' }" @click="clickTopBar('商家')">商家</view>
        </view>
        <view class="select-top-bar-bottom" :style="{ background: shopInfo.mainColor, left: topBarInfo === '点餐' ? '100rpx' : '300rpx' }"></view>
        <view class="right flex-row flex-ja-center" :animation="barSearchAnimationData" @click="toSearch">
            <view class="search-box flex-row flex-ja-center">
                <view class="search-img"></view>
                <view class="search-title">想吃点什么</view>
            </view>
            <view class="pattern-icon"></view>
        </view>
        <!-- <view class="top-bar-item flex-item flex-row flex-ja-center" :class="{ 'select-top-item': topBarInfo === '点餐' }" @click="clickTopBar('点餐')" :style="{ color: topBarInfo === '点餐' ? shopInfo.mainColor : '' }">点餐</view>
            <view class="top-bar-item flex-item flex-row flex-ja-center" :class="{ 'select-top-item': topBarInfo === '商家' }" :style="{ color: topBarInfo === '商家' ? shopInfo.mainColor : '' }" @click="clickTopBar('商家')">商家</view>
            <view class="select-top-bar-bottom" :style="{ background: shopInfo.mainColor, left: topBarInfo === '点餐' ? '16.65%' : '50%' }"></view> -->
    </view>
</template>

<script lang="ts" setup>
import { mapState, mapMutation } from "@/utils/mapVuex";
import { ComputedMutationI, ComputedStateI } from "@/interface/vuex";
import { delaySync } from "@/utils/";
import { barSearchTransitionTime, shopInfoTransitionTime } from "../infoConfig";
import { ShopItemI } from "@/interface/home";
import { ref, watch } from "vue";
import { RefI } from "@/interface/vueInterface";
import router from "@/utils/router";

interface StateF {
    topBarInfo: ComputedStateI<string>;
    shopInfo: ComputedStateI<ShopItemI>;
}
interface MutationF {
    setTopBarInfo: ComputedMutationI<string>;
    setShopInfoFlag: ComputedMutationI<boolean>;
    setStartShopInfoAnimationFlag: ComputedMutationI<boolean>;
    setSearchFoodFlag: ComputedMutationI<boolean>;
}
const { topBarInfo, shopInfo }: StateF = mapState(["topBarInfo", "shopInfo"]);
const { setTopBarInfo, setShopInfoFlag, setStartShopInfoAnimationFlag, setSearchFoodFlag }: MutationF = mapMutation(["setTopBarInfo", "setShopInfoFlag", "setStartShopInfoAnimationFlag", "setSearchFoodFlag"]);

const barSearchAnimationData: RefI<any> = ref(null);
watch(topBarInfo, (newValue: string, oldValue: string) => {
    const barSearchAnimation = uni.createAnimation({
        duration: barSearchTransitionTime,
        timingFunction: "linear",
    });
    if (newValue === "点餐") {
        barSearchAnimation.opacity(1).step();
        barSearchAnimationData.value = barSearchAnimation.export();
    } else if (newValue === "商家") {
        barSearchAnimation.opacity(0).step();
        barSearchAnimationData.value = barSearchAnimation.export();
    }
});
function toSearch() {
    if (topBarInfo.value === "商家") return;
    setSearchFoodFlag(true);
}
async function clickTopBar(title: string) {
    if (topBarInfo.value === title) return;
    setTopBarInfo(title);
    if (title === "商家") {
        setStartShopInfoAnimationFlag(true);
        await delaySync(shopInfoTransitionTime);
        setShopInfoFlag(true);
    } else {
        setStartShopInfoAnimationFlag(false);
        await delaySync(shopInfoTransitionTime);
        setShopInfoFlag(false);
    }
}
</script>

<style lang="scss" scoped>
.com-top-bar-container {
    // position: relative;
    // width: 100%;
    // height: 80rpx;
    // background-color: #ffffff;
    // z-index: 200;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 80rpx;
    box-sizing: border-box;
    border-bottom: 1rpx solid #e4e4e4;
    background-color: #ffffff;

    z-index: 200;
    .left,
    .right {
        height: 100%;
    }
    .top-bar-item {
        width: 200rpx;
        height: 100%;
        font-size: 32rpx;
    }
    .select-top-item {
        font-weight: bold;
    }
    .select-top-bar-bottom {
        position: absolute;
        left: 100rpx;
        transform: translate(-50%, 0);
        transition: all ease-in-out 0.3s;
        bottom: 0;
        width: 40rpx;
        height: 4rpx;
    }
    .search-box {
        width: 200rpx;
        height: 50rpx;
        color: #ccc;
        border: 1px solid;
        position: relative;
        border-radius: 25rpx;
        .search-img {
            width: 30rpx;
            height: 30rpx;
            background-color: #ccc;
            border-radius: 50%;
        }
        .search-title {
            margin-left: 8rpx;
            font-size: 24rpx;
            color: #ccc;
        }
    }
    .pattern-icon {
        width: 40rpx;
        height: 40rpx;
        margin: 0 30rpx;
        background-color: red;
    }
}
</style>
