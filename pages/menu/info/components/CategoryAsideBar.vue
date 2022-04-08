<template>
    <scroll-view scroll-y class="category-aside-bar-box" :style="{ 'padding-bottom': minusPromotionsObject.show ? minusPromotionsHeightRPX + 'rpx' : '' }">
        <view class="aside-category-item" v-for="(asideCategoryItem, index) in asideCategoryList" :key="index" :class="{ 'aside-categroy-item-active': categoryTabID === asideCategoryItem.categoryTabID }" @click="changeCategoryTab(asideCategoryItem.categoryTabID)" :style="{'color': categoryTabID === asideCategoryItem.categoryTabID ? shopInfo.mainColor : ''}">
            {{ asideCategoryItem.categoryName }}
            <view v-if="asideCategoryItem.categoryOrderCount" class="category-order-count" :style="{ background: shopInfo.mainColor }">{{ asideCategoryItem.categoryOrderCount }}</view>
        </view>
    </scroll-view>
</template>

<script lang="ts" setup>
import { onShow, onLoad, onPageScroll } from "@dcloudio/uni-app";

import { mapState, mapGetter, mapMutation } from "@/utils/mapVuex";
import { minusPromotionsHeightRPX } from "../infoConfig";

import { ComputedGetterI, ComputedMutationI, ComputedStateI } from "@/interface/vuex";
import { CategoryItemI } from "@/interface/menu";
import { MinusPromotionsObjectI, AsideCategoryItemI } from "@/store/getters/menu";
import { RefI } from "@/interface/vueInterface";
import { ShopItemI } from "@/interface/home";

interface StateF {
    categoryTabID: ComputedStateI<string>;
    shopInfo: ComputedStateI<ShopItemI>;
}
interface GetterF {
    asideCategoryList: ComputedGetterI<AsideCategoryItemI>;
    minusPromotionsObject: ComputedGetterI<MinusPromotionsObjectI>;
}
interface MutationF {
    setCategoryTabId: ComputedMutationI<string>;
    setScrollIntoCategoryTabID: ComputedMutationI<string>;
}
const { categoryTabID, shopInfo } = mapState(["categoryTabID", "shopInfo"]);
const { asideCategoryList, minusPromotionsObject }: GetterF = mapGetter(["asideCategoryList", "minusPromotionsObject"]);

const { setCategoryTabId, setScrollIntoCategoryTabID }: MutationF = mapMutation(["setCategoryTabId", "setScrollIntoCategoryTabID"]);
function changeCategoryTab(categoryTabID: string) {
    setCategoryTabId(categoryTabID);
    setScrollIntoCategoryTabID(categoryTabID);
}
</script>

<style lang="scss">
.category-aside-bar-box {
    position: absolute;
    top: 0;
    left: 0;
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
