<template>
    <scroll-view scroll-y scroll-with-animation :scroll-into-view="categoryIDMain" class="food-category-list-container" id="food-category-list-container" @scroll="foodScrollHandle">
        <view class="food-category-list-item" v-for="(foodCategoryItem, index) in categoryList" :key="index" :id="foodCategoryItem.categoryIDMain" :style="{ 'padding-bottom': index === categoryList.length - 1 ? categoryItemLastPaddingBottom : '' }">
            <view class="food-category-name">{{ foodCategoryItem.categoryName }}</view>
            <FoodItem class="food-item" v-for="foodItem in foodCategoryItem.foodList" :key="foodItem.foodID" :foodItem="foodItem" @clickFoodItem="toShowFoodDetail" type="vertical"></FoodItem>
            <!-- <view class="food-item flex-item flex-row" v-for="(foodItem, foodIndex) in foodCategoryItem.foodList" :key="foodIndex" @click="toShowFoodDetail(foodItem)">
                <image class="food-img flex-shrink" :src="foodItem.fullImgPath" mode="scaleToFill"></image>
                <view class="food-info-box flex-item flex-col flex-j-between">
                    <view class="food-name-description">
                        <view class="food-name">{{ foodItem.foodName }}</view>
                        <view class="food-description">{{ foodItem.description }}</view>
                    </view>
                    <view class="food-price-button flex-row flex-j-between flex-a-center">
                        <view class="food-price">¥{{ foodItem.price }}</view>
                        <FoodAddMinus :foodItem="foodItem"></FoodAddMinus>
                    </view>
                </view>
            </view> -->
        </view>
    </scroll-view>
</template>

<script lang="ts" setup>
import FoodItem from "./item/FoodItem.vue";
import { CategoryItemI, FoodItemI } from "@/interface/menu";
import { getCurrentInstance, computed, onMounted, ref, toRefs } from "vue";
import { MenuGetterG, MenuStoreI, useMenuStore } from "@/piniaStore/menu";
import { storeToRefs } from "pinia";
import { debounce } from "@/utils/tool";
import { MenuStateG } from "@/piniaStore/menu/state";
// store
const menuStore: MenuStoreI = useMenuStore();
// state
const { categoryList, categoryIDMain, footerPX }: MenuStateG = toRefs(menuStore.menuState);
// getter
const { minusPromotionsObject, footerAndMinusPX }: MenuGetterG = storeToRefs(menuStore);
// action
const { setFoodDetailFlag, setFoodInfo, setSelectedCategoryID, setCategoryIDMain, setCategoryIDAside, handleFoodCategoryListScroll } = menuStore;

const categoryItemLastPaddingBottom: string = computed((): string => (minusPromotionsObject.value.show ? footerAndMinusPX.value + 10 + "px" : footerPX.value + 10 + "px"));

function toShowFoodDetail(foodItem: FoodItemI) {
    setFoodDetailFlag(true);
    setFoodInfo(foodItem);
}
const currentInstance = getCurrentInstance();
const foodScrollHandle = debounce(handleScroll, 70);

async function handleScroll(e: any) {
    handleFoodCategoryListScroll({
        currentInstance,
    });
}
defineExpose({
    foodScrollHandle,
});
</script>

<style lang="scss">
.food-category-list-container {
    // background-color: blue;
    height: 100%;
    width: 100%;
    // flex-shrink: 0;
    // width: 590rpx;
    box-sizing: border-box;
    background-color: #f5f5f5;
    background-color: #fff;
    // padding-top: 80rpx;
    ::-webkit-scrollbar {
        display: none;
        width: 0 !important;
        height: 0 !important;
        -webkit-appearance: none;
        background: transparent;
    }
    .food-category-list-item {
        padding: 0 0 0 160rpx;
    }

    .food-category-name {
        font-size: 24rpx;
        line-height: 30rpx;
        color: #666;
        padding: 20rpx 0 0 20rpx;
        color: #333;
        // background-color: #fff;
        // margin: 0 0 20rpx;
    }

    .food-category-list-item:last-child {
        padding-bottom: 20rpx;
    }
    .food-item {
        margin: 20rpx 20rpx 0;
    }
}
</style>
