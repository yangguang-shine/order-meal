<template>
    <scroll-view scroll-y scroll-with-animation :scroll-into-view="scrollIntoCategoryTabID" class="food-main-box flex-item" id="food-main-box" @scroll="foodScrollHandle" :style="{ 'padding-bottom': minusPromotionsObject.show ? minusPromotionsHeightPX + 'px' : '' }">
        <view class="food-category-list-item" v-for="(foodCategoryItem, index) in categoryList" :key="index" :id="foodCategoryItem.categoryTabID + 'id'">
            <view :id="foodCategoryItem.categoryTabID" class="food-category-name">{{ foodCategoryItem.categoryName }}</view>
            <view class="food-item flex-item flex-row" v-for="(foodItem, foodIndex) in foodCategoryItem.foodList" :key="foodIndex" @click="toShowFoodDetail(foodItem)">
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
            </view>
        </view>
    </scroll-view>
</template>

<script lang="ts" setup>
import FoodAddMinus from "./item/FoodAddMinus.vue";
import { get1rpx2px } from "@/utils/index";
import { onShow, onLoad, onPageScroll } from "@dcloudio/uni-app";
import { topBarHeightPX, minusPromotionsHeightPX } from "../infoConfig";
import { defineComponent, getCurrentInstance, computed } from "vue";
const currentInstance = getCurrentInstance();
import { mapState, mapGetter, mapMutation } from "@/utils/mapVuex";

import { ComputedGetterI, ComputedMutationI, ComputedStateI } from "@/interface/vuex";
import { CategoryItemI, FoodItemI } from "@/interface/menu";
import { MinusPromotionsObjectI, AsideCategoryItemI } from "@/store/getters/menu";
import { RefI } from "@/interface/vueInterface";

interface StateF {
    categoryList: ComputedStateI<CategoryItemI[]>;
    scrollIntoCategoryTabID: ComputedStateI<string>;
}
interface GetterF {
    asideCategoryList: ComputedGetterI<AsideCategoryItemI[]>;
    minusPromotionsObject: ComputedGetterI<MinusPromotionsObjectI>;
}
interface MutationF {
    setFoodDetailFlag: ComputedMutationI<boolean>;
    setFoodInfo: ComputedMutationI<FoodItemI>;
    setCategoryTabId: ComputedMutationI<string>;
    setScrollIntoCategoryTabID: ComputedMutationI<string>;
}
const { categoryList, scrollIntoCategoryTabID }: StateF = mapState(["categoryList", "scrollIntoCategoryTabID"]);
const { asideCategoryList, minusPromotionsObject }:GetterF = mapGetter(["asideCategoryList", "minusPromotionsObject"]);

const { setFoodDetailFlag, setFoodInfo, setCategoryTabId, setScrollIntoCategoryTabID }: MutationF = mapMutation(["setFoodDetailFlag", "setFoodInfo", "setCategoryTabId", "setScrollIntoCategoryTabID"]);

const props = defineProps();
console.log("props");
console.log(props);

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
    for (let i = 0; i < asideCategoryList.value.length; i++) {
        const categoryItem = asideCategoryList.value[i];
        const res = await selectQuery(`#${categoryItem.categoryTabID}id`);
        if (topBarHeightPX <= res.top || res.bottom > topBarHeightPX) {
            setCategoryTabId(categoryItem.categoryTabID);
            setScrollIntoCategoryTabID('');
            break;
        }
    }
};
const foodScrollHandle = debounce(handleScroll, 30);

function selectQuery(id: string) {
    return new Promise((resolve, reject) => {
        uni.createSelectorQuery()
            .in(currentInstance)
            .select(id)
            .boundingClientRect((res) => {
                resolve(res);
            })
            .exec();
    });
}

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
.food-main-box {
    // background-color: blue;
    height: 100%;
    // flex-shrink: 0;
    // width: 590rpx;
    box-sizing: border-box;
    // padding-top: 80rpx;
    ::-webkit-scrollbar {
        display: none;
        width: 0 !important;
        height: 0 !important;
        -webkit-appearance: none;
        background: transparent;
    }
    .food-category-list-item {
        padding: 0 30rpx 0 20rpx;
    }

    .food-category-name {
        font-size: 24rpx;
        line-height: 30rpx;
        color: #666;
        padding: 10rpx 0;
        color: #333;
        // margin: 0 0 20rpx;
    }

    .food-category-list-item:first-child .food-category-name {
        padding-top: 20rpx;
    }
    .food-item {
        padding: 20rpx 0;
    }
    .food-img {
        padding: 6rpx 0;
        height: 150rpx;
        width: 150rpx;
    }
    .food-info-box {
        padding-left: 20rpx;
    }
    .food-name {
        font-weight: bold;
        font-size: 32rpx;
        line-height: 44rpx;
        color: #333;
    }
    .food-description {
        font-size: 22rpx;
        line-height: 30rpx;
        color: #666;
        margin-top: 10rpx;
    }
    .food-price {
        line-height: 42rpx;
        color: $color-red;
        font-size: 36rpx;
        font-weight: bold;
    }
}
</style>
