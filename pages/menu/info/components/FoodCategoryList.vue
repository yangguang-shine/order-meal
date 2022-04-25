<template>
    <scroll-view scroll-y scroll-with-animation :scroll-into-view="categoryIDMain" class="food-category-list-container" id="food-category-list-container" @scroll="foodScrollHandle">
        <view class="food-category-list-item" v-for="(foodCategoryItem, index) in categoryList" :key="index" :id="foodCategoryItem.categoryIDMain" :style="{ 'padding-bottom': index === categoryList.length - 1 ? categoryItemLastPaddingBottom : ''}">
            <view class="food-category-name">{{ foodCategoryItem.categoryName }}</view>
            <FoodItem class="food-item" v-for="foodItem in foodCategoryItem.foodList" :key="foodItem.foodID" :foodItem="foodItem" @clickFoodItem="toShowFoodDetail"></FoodItem>
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
import { getRpxToPx, selectQuery } from "@/utils/index";
import { onShow, onLoad, onPageScroll } from "@dcloudio/uni-app";
import { topBarHeightPX, minusPromotionsHeightRPX, footerInfoAndMinusPromotionsHeightRPX, footerInfoHeightRPX } from "../infoConfig";
import { defineComponent, getCurrentInstance, computed } from "vue";
const currentInstance = getCurrentInstance();
import { mapState, mapGetter, mapMutation } from "@/utils/mapVuex";

import { ComputedGetterI, ComputedMutationI, ComputedStateI } from "@/interface/vuex";
import { CategoryItemI, FoodItemI } from "@/interface/menu";
import { MinusPromotionsObjectI, AsideCategoryItemI } from "@/store/getters/menu";
import { RefI } from "@/interface/vueInterface";

interface StateF {
    categoryList: ComputedStateI<CategoryItemI[]>;
    categoryIDMain: ComputedStateI<string>;
}
interface GetterF {
    minusPromotionsObject: ComputedGetterI<MinusPromotionsObjectI>;
}
interface MutationF {
    setFoodDetailFlag: ComputedMutationI<boolean>;
    setFoodInfo: ComputedMutationI<FoodItemI>;
    setSelectedCategoryID: ComputedMutationI<number>;
    setCategoryIDMain: ComputedMutationI<string>;
    setCategoryIDAside: ComputedMutationI<string>;
}
const { categoryList, categoryIDMain }: StateF = mapState(["categoryList", "categoryIDMain"]);
const { minusPromotionsObject }: GetterF = mapGetter([ "minusPromotionsObject"]);

const { setFoodDetailFlag, setFoodInfo,setSelectedCategoryID, setCategoryIDMain, setCategoryIDAside,  }: MutationF = mapMutation(["setFoodDetailFlag", "setFoodInfo","setSelectedCategoryID", "setCategoryIDMain", "setCategoryIDAside"]);
const categoryItemLastPaddingBottom: string = computed((): string => (minusPromotionsObject.value.show ? footerInfoAndMinusPromotionsHeightRPX + 20 + "rpx" : footerInfoHeightRPX + 20 + "rpx"));

function toShowFoodDetail(foodItem: FoodItemI) {
    setFoodDetailFlag(true);
    setFoodInfo(foodItem);
}
const debounce = (fn: any, delay: number) => {
    let timer: any;
    return (e) => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn(e);
            clearTimeout(timer);
        }, delay);
    };
};

onLoad(() => {});

const handleScroll = async (e) => {
    for (let i = 0; i < categoryList.value.length; i++) {
        const categoryItem = categoryList.value[i];
        const res = await selectQuery(`#${categoryItem.categoryIDMain}`, currentInstance);
        if (topBarHeightPX <= res.top || res.bottom  > topBarHeightPX) {
            setSelectedCategoryID(categoryItem.categoryID);
            setCategoryIDMain("");
            setCategoryIDAside(categoryItem.categoryIDAside);
            break;
        }
    }
};
const foodScrollHandle = debounce(handleScroll, 30);

const throttle = (() => {
    let timer: null | number = null;
    return (fn: Function, delay: number) => {
        if (!timer) {
            timer = setTimeout(() => {
                fn();
                timer = null;
            }, delay);
        }
    };
})();
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
