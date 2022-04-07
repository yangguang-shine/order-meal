<template>
    <view class="com-top-bar-container">
        <view class="top-bar-list flex-row ">
            <view class="top-bar-item flex-item flex-row flex-ja-center" :class="{ 'select-top-item': topBarInfo === '点餐' }" @click="clickTopBar('点餐')" :style="{'color': topBarInfo === '点餐' ? shopInfo.mainColor : ''}">点餐</view>
            <view class="top-bar-item flex-item flex-row flex-ja-center" :class="{ 'select-top-item': topBarInfo === '商家' }" :style="{'color': topBarInfo === '商家' ? shopInfo.mainColor : ''}" @click="clickTopBar('商家')">商家</view>
            <div class="select-top-bar-bottom" :style="{ background: shopInfo.mainColor, left: topBarInfo === '点餐' ? '25%' : '75%' }"></div>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { mapState, mapMutation } from "@/utils/mapVuex";
import { ComputedMutationI, ComputedStateI } from "@/interface/vuex";
import { delaySync } from "@/utils/";
import { shopInfoTransitionTime } from "../infoConfig";
import { ShopItemI } from "@/interface/home";
interface StateF {
    topBarInfo: ComputedStateI<string>
    shopInfo: ComputedStateI<ShopItemI>
}
interface MutationF {
    setTopBarInfo: ComputedMutationI<string>,
    setShopInfoFlag: ComputedMutationI<boolean>,
    setStartShopInfoAnimationFlag: ComputedMutationI<boolean>,
}
const { topBarInfo, shopInfo }:StateF = mapState(["topBarInfo", "shopInfo"]);
const { setTopBarInfo,setShopInfoFlag, setStartShopInfoAnimationFlag }:MutationF = mapMutation(["setTopBarInfo", "setShopInfoFlag", "setStartShopInfoAnimationFlag"]);
async function clickTopBar(title: string) {
    if (topBarInfo.value === title) return;
    setTopBarInfo(title);
    if (title === "商家") {
        setStartShopInfoAnimationFlag(true)
        await delaySync(shopInfoTransitionTime)
        setShopInfoFlag(true);
    } else {
        setStartShopInfoAnimationFlag(false)
        await delaySync(shopInfoTransitionTime)
        setShopInfoFlag(false);
    }
}
</script>

<style lang="scss" scoped>
.com-top-bar-container {
    // position: relative;
    width: 100%;
    height: 80rpx;
    // background-color: #ffffff;
    // z-index: 200;
    .top-bar-list {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 80rpx;
        box-sizing: border-box;
        border-bottom: 1rpx solid #e4e4e4;
        background-color: #ffffff;

        z-index: 200;
    }
    .top-bar-item {
        font-size: 32rpx;
    }
    .select-top-item {
        font-weight: bold;
    }
    .select-top-bar-bottom {
        position: absolute;
        left: 25%;
        transform: translate(-50%, 0);
        transition: all ease-in-out 0.3s;
        bottom: 0;
        width: 40rpx;
        height: 4rpx;
    }
}
</style>
