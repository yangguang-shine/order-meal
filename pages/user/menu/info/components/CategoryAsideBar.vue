<template>
    <scroll-view scroll-y class="category-aside-bar-box" :style="{'padding-bottom': minusPromotionsObject.show ? minusPromotionsHeightPX + 'px' : ''}">
        <view class="aside-category-item" v-for="(asideCategoryItem, index) in asideCategoryList" :key="index" :class="{ 'aside-categroy-item-active': categoryTabId === asideCategoryItem.categoryTabID }" @click="changeCategoryTab(asideCategoryItem.categoryTabID)">
            {{ asideCategoryItem.categoryName }}
            <view v-if="asideCategoryItem.orderCount" class="category-order-count" :style="{ background: $mainColor }">{{ asideCategoryItem.orderCount }}</view>
        </view>
    </scroll-view>
</template>

<script lang='ts' setup>

import { onShow, onLoad, onPageScroll } from "@dcloudio/uni-app";

import {
    mapState,
    mapGetters,
    mapMutations
} from "../../../../../utils/mapVuex";
import {  minusPromotionsHeightPX } from '../infoConfig'
const { asideCategoryList, minusPromotionsObject } = mapGetters("user", ["asideCategoryList", 'minusPromotionsObject']);
const { foodCategoryList, categoryTabId, scrollIntoCategoryTabID } = mapState("user", [
    "foodCategoryList",
    "categoryTabId",
    "scrollIntoCategoryTabID"
]);
const {
    setCategoryTabId,
    setScrollIntoCategoryTabID
} = mapMutations("user", [
    'setCategoryTabId',
    "setScrollIntoCategoryTabID"
]);
function changeCategoryTab(categoryTabID: any) {
    setCategoryTabId(categoryTabID)
    setScrollIntoCategoryTabID(categoryTabID)
}

</script>

<style lang="scss">
.category-aside-bar-box {
    width: 160rpx;
    height: 100%;
    background-color: #f5f5f5;
    flex-shrink: 0;
    box-sizing: border-box;
    // padding-bottom: 50rpx;
    ::-webkit-scrollbar {
        display: none;
        width: 0 !important;
        height: 0 !important;
        -webkit-appearance: none;
        background: transparent;
    }
    .aside-category-item {
        position: relative;
        padding: 20rpx;
        // height: 80rpx;
        font-size: 26rpx;
        line-height: 36rpx;
        text-align: left;
        box-sizing: border-box;
        color: #666;
        // border-left: 10rpx solid transparent;
    }
    .aside-categroy-item-active {
        color: #333;
        font-weight: bold;
        background-color: #fff;
    }
    .category-order-count {
        font-weight: normal;
        position: absolute;
        padding: 0 5rpx;
        top: 4rpx;
        right: 4rpx;
        min-width: 26rpx;
        height: 26rpx;
        line-height: 26rpx;
        border-radius: 15rpx;
        font-size: 20rpx;
        color: #fff;
        text-align: center;
        box-sizing: border-box;
    }
}
</style>
