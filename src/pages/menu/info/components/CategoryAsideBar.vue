<template>
    <scroll-view scroll-y scroll-with-animation class="category-aside-bar-container" :scroll-into-view="categoryIDAside" :style="{ 'padding-bottom': minusPromotionsObject.show ? footerAndMinusPX + 'px' : footerPX + 'px' }">
        <view class="aside-category-item" v-for="(asideCategoryItem, index) in asideCategoryInfo.asideCategoryList" :key="index" :class="{ 'aside-categroy-item-active': selectedCategoryID === asideCategoryItem.categoryID }" @click="changeCategoryTab(asideCategoryItem)" :style="{ color: selectedCategoryID === asideCategoryItem.categoryID ? shopInfo.mainColor : '' }" :id="asideCategoryItem.categoryIDAside">
            {{ asideCategoryItem.categoryName }}
            <view v-if="asideCategoryItem.categoryOrderCount" class="category-order-count" :style="{ background: $mainColor }">{{ asideCategoryItem.categoryOrderCount }}</view>
        </view>
    </scroll-view>
</template>

<script lang="ts" setup>
import { onShow, onLoad, onPageScroll } from "@dcloudio/uni-app";


import { MinusPromotionsObjectI, AsideCategoryItemI, AsideCategoryInfoI, MenuGetterG } from "@/piniaStore/menu/getter";
import { getCurrentInstance, computed, onMounted, ref, toRefs } from "vue";
import { MenuStoreI, useMenuStore } from "@/piniaStore/menu";
import { storeToRefs} from 'pinia'
import { MenuStateG } from "@/piniaStore/menu/state";

// store
const menuStore: MenuStoreI = useMenuStore()
// state
const { selectedCategoryID,categoryIDAside, shopInfo, footerPX }: MenuStateG = toRefs(menuStore.menuState)
// getter
const { asideCategoryInfo, minusPromotionsObject, footerAndMinusPX }: MenuGetterG = storeToRefs(menuStore) 
// action
const { setSelectedCategoryID, setCategoryIDMain, setCategoryIDAside } = menuStore;
// 选择 tab
function changeCategoryTab(asideCategoryItem: AsideCategoryItemI) {
    setSelectedCategoryID(asideCategoryItem.categoryID);
    setCategoryIDMain(asideCategoryItem.categoryIDMain);
    setCategoryIDAside(asideCategoryItem.categoryIDAside);
}
</script>

<style lang="scss">
.category-aside-bar-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 160rpx;
    height: 100%;
    // background-color: #fff;
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
        // background-color: #f5f5f5;
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
        //  color: ;
// background-color: #ff4b33;
    }
}
</style>
