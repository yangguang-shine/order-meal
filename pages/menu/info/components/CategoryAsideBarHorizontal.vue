<template>
    <scroll-view scroll-x="true" scroll-with-animation class="category-aside-bar-horizontal-container" :scroll-into-view="categoryIDAside">
        <div class="category-list flex-row flex-a-center" id="aside-bar-horizontal">
            <view class="category-item flex-shrink flex-row flex-ja-center" v-for="(asideCategoryItem, index) in asideCategoryInfo.asideCategoryList" :key="index" :class="{ 'categroy-item-active': selectedCategoryID === asideCategoryItem.categoryID }" @click="changeCategoryTab(asideCategoryItem)" :style="{ color: selectedCategoryID === asideCategoryItem.categoryID ? shopInfo.mainColor : '' }" :id="asideCategoryItem.categoryIDAside">
                {{ asideCategoryItem.categoryName }}
                <view v-if="asideCategoryItem.categoryOrderCount" class="category-order-count flex-row flex-ja-center" :style="{ background: $mainColor }">{{ asideCategoryItem.categoryOrderCount }}</view>
            </view>
        </div>
    </scroll-view>
</template>

<script lang="ts" setup>
import { CategoryItemI } from "@/interface/menu";
import { getCurrentInstance, computed, onMounted, ref, toRefs } from "vue";
import { MenuStoreI, useMenuStore } from "@/piniaStore/menu";
import { storeToRefs } from "pinia";
import {  MenuGetterG } from "@/piniaStore/menu/getter";
import { selectQuery } from "@/utils/";
import { MenuStateG } from "@/piniaStore/menu/state";
// store
const menuStore: MenuStoreI = useMenuStore();
// state
const { selectedCategoryID, shopInfo, categoryIDAside }: MenuStateG = toRefs(menuStore.menuState);
// getter
const { asideCategoryInfo, minusPromotionsObject }: MenuGetterG = storeToRefs(menuStore);
// action
const { setSelectedCategoryID, setCategoryIDMain, setCategoryIDAside, setAsideBarHorizontalPX } = menuStore;
//
function changeCategoryTab(asideCategoryItem: CategoryItemI) {
    setSelectedCategoryID(asideCategoryItem.categoryID);
    setCategoryIDMain(asideCategoryItem.categoryIDMain);
    setCategoryIDAside(asideCategoryItem.categoryIDAside);
}
onMounted(() => {
    getAsideBarHorizontalHeight();
});
    const currentInstance = getCurrentInstance()

async function getAsideBarHorizontalHeight() {
    const res = await selectQuery("#aside-bar-horizontal", currentInstance);
    setAsideBarHorizontalPX(res.height);
}
</script>

<style lang="scss">
.category-aside-bar-horizontal-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 80rpx;
    background-color: #fff;
    flex-shrink: 0;
    box-sizing: border-box;
    overflow: auto;
    white-space: nowrap;
    display: flex;
    flex-direction: row;
    // padding-bottom: 50rpx;
    ::-webkit-scrollbar {
        display: none;
        width: 0 !important;
        height: 0 !important;
        -webkit-appearance: none;
        background: transparent;
    }
    .category-list {
        height: 100%;
    }
    .category-item {
        position: relative;
        padding: 20rpx 30rpx;
        // height: 80rpx;
        font-size: 26rpx;
        // line-height: 36rpx;
        text-align: left;
        box-sizing: border-box;
        color: #666;
        height: 100%;

        // width: 400rpx;

        // border-left: 10rpx solid transparent;
    }
    .categroy-item-active {
        color: #333;
        font-weight: bold;
        // background-color: #fff;
        // background-color: #f5f5f5;
    }
    .category-order-count {
        font-weight: normal;
        position: absolute;
        padding: 0 9rpx;
        top: 4rpx;
        right: 4rpx;
        min-width: 30rpx;
        height: 30rpx;
        // line-height: 30rpx;
        border-radius: 15rpx;
        font-size: 22rpx;
        color: #fff;
        text-align: center;
        box-sizing: border-box;
        // background-color: #ff4b33;
    }
}
</style>
