<template>
    <view class="com-top-bar-container flex-row flex-a-center flex-j-between" id="com-top-bar-container">
        <view class="left flex-row flex--ja-center">
            <view class="top-bar-item flex-item flex-row flex-ja-center" :class="{ 'select-top-item': topBarInfo === '点餐' }" @click="clickTopBar('点餐')">点餐</view>
            <view class="top-bar-item flex-item flex-row flex-ja-center" :class="{ 'select-top-item': topBarInfo === '商家' }" @click="clickTopBar('商家')">商家</view>
        </view>
        <view class="select-top-bar-bottom" :style="{ background: shopInfo.mainColor, left: topBarInfo === '点餐' ? '100rpx' : '300rpx' }"></view>
        <view class="right flex-row flex-ja-center" :animation="overlayAnimationData">
            <view class="search-box flex-row flex-ja-center" @click="toSearch">
                <!-- <view class="search-icon"></view> -->
                <image class="search-icon" src="/static/img/common/search.png"></image>

                <view class="search-title">想吃点什么</view>
            </view>
            <image class="pattern-icon" v-if="shopInfo.mode === 'vertical'" @click="changeShopInfoMode" src="/static/img/common/vertical.png"></image>
            <image class="pattern-icon" v-else-if="shopInfo.mode === 'horizontal'" @click="changeShopInfoMode" src="/static/img/common/horizontal.png"></image>

            <!-- <view class="pattern-icon" @click="changeShopInfoMode"></view> -->
        </view>
        <!-- <view class="top-bar-item flex-item flex-row flex-ja-center" :class="{ 'select-top-item': topBarInfo === '点餐' }" @click="clickTopBar('点餐')" :style="{ color: topBarInfo === '点餐' ? shopInfo.mainColor : '' }">点餐</view>
            <view class="top-bar-item flex-item flex-row flex-ja-center" :class="{ 'select-top-item': topBarInfo === '商家' }" :style="{ color: topBarInfo === '商家' ? shopInfo.mainColor : '' }" @click="clickTopBar('商家')">商家</view>
            <view class="select-top-bar-bottom" :style="{ background: shopInfo.mainColor, left: topBarInfo === '点餐' ? '16.65%' : '50%' }"></view> -->
    </view>
</template>

<script lang="ts" setup>
import { delaySync, selectQuery } from "@/utils/";
import { barSearchTransitionTime, shopInfoTransitionTime } from "../infoConfig";
import { ref, watch, toRefs, onMounted , getCurrentInstance} from "vue";
import { RefI } from "@/interface/vueInterface";
import useOverlayAnimation from "@/utils/useOverlayAnimation";
import { MenuStoreI, useMenuStore } from "@/piniaStore/menu";
import { MenuStateG } from "@/piniaStore/menu/state";
// store
const menuStore: MenuStoreI = useMenuStore();
// state
const { topBarInfo, shopInfo, selectedCategoryID }: MenuStateG = toRefs(menuStore.menuState);
// action
const { setTopBarInfo, setShopInfoFlag, setStartShopInfoAnimationFlag, setSearchFoodFlag, setShopInfoMode, setCategoryIDMain, setTopBarHeightPX } = menuStore;

const { overlayAnimationData, toStartAnimation, toEndAnimation } = useOverlayAnimation({
    duration: barSearchTransitionTime,
    timingFunction: "linear",
});
const barSearchAnimationData: RefI<any> = ref(null);
watch(topBarInfo, (newValue: string, oldValue: string) => {
    if (newValue === "点餐") {
        toStartAnimation();
    } else if (newValue === "商家") {
        toEndAnimation();
    }
});
onMounted(async () => {
    getTopBarHeight();
});
    const currentInstance = getCurrentInstance()

async function getTopBarHeight() {
    try {
        const res = await selectQuery("#com-top-bar-container", currentInstance);
        setTopBarHeightPX(res.height);
    } catch (e) {
        console.log(e);
    } finally {
    }
}
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
function changeShopInfoMode() {
    setShopInfoMode(shopInfo.value.mode === "vertical" ? "horizontal" : "vertical");
    setCategoryIDMain(`main${selectedCategoryID.value}`);
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
    box-sizing: border-box;
    border-bottom: 1rpx solid #e4e4e4;
    background-color: #ffffff;
    color: #666;
    z-index: 200;
    .left,
    .right {
        height: 80rpx;
        // height: 100%;
    }
    .top-bar-item {
        width: 200rpx;
        height: 80rpx;
        font-size: 32rpx;
    }
    .select-top-item {
        font-weight: bold;
        color: #333;
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
        .search-icon {
            width: 40rpx;
            height: 40rpx;
            // background-color: #ccc;
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
        // background-color: red;
    }
}
</style>
