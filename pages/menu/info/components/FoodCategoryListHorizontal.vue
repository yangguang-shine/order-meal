<template>
    <scroll-view scroll-y scroll-with-animation :scroll-into-view="categoryIDMain" class="category-list-horizontal-container" id="food-main-box" @scroll="foodScrollHandle" :style="{ 'padding-top': categoryAsideBarHorizontalHeightRPX + 'rpx' }">
        <div class="category-list">
            <view class="category-item" v-for="(foodCategoryItem, index) in categoryList" :key="index" :id="foodCategoryItem.categoryIDMain" :style="{ 'padding-bottom': index === categoryList.length - 1 ? categoryItemLastPaddingBottom : '' }">
                <view  class="category-name">{{ foodCategoryItem.categoryName }}{{foodCategoryItem.categoryIDMain}}</view>
                <div class="food-list-box flex-row flex-wrap">

                    <FoodItemHorizontal v-for="foodItem in foodCategoryItem.foodList" :key="foodItem.foodID" :foodItem="foodItem"></FoodItemHorizontal>
 
                </div>
                <!-- <FoodItem class="food-item" v-for="foodItem in foodCategoryItem.foodList" :key="foodItem.foodID" :foodItem="foodItem" @clickFoodItem="toShowFoodDetail"></FoodItem> -->
            </view>
        </div>
    </scroll-view>
</template>

<script lang="ts" setup>
import FoodItem from "./item/FoodItem.vue";
import FoodItemHorizontal from "./item/FoodItemHorizontal.vue";
import { getRpxToPx, navigationBarHeightPX, selectQuery } from "@/utils/index";
import { onShow, onLoad, onPageScroll } from "@dcloudio/uni-app";
import { topBarHeightPX, minusPromotionsHeightRPX, footerInfoAndMinusPromotionsHeightRPX, footerInfoHeightRPX, categoryAsideBarHorizontalHeightRPX, categoryAsideBarHorizontalAndTopBarHeightPX } from "../infoConfig";
import { defineComponent, getCurrentInstance, computed } from "vue";
const currentInstance = getCurrentInstance();
import { mapState, mapGetter, mapMutation } from "@/utils/mapVuex";

import { ComputedGetterI, ComputedMutationI, ComputedStateI } from "@/interface/vuex";
import { CategoryItemI, FoodItemI } from "@/interface/menu";
import { MinusPromotionsObjectI, AsideCategoryItemI } from "@/store/getters/menu";
import { RefI } from "@/interface/vueInterface";
import { ShopItemI } from "@/interface/home";

interface StateF {
    categoryList: ComputedStateI<CategoryItemI[]>;
    categoryIDMain: ComputedStateI<string>;
    shopInfo: ComputedStateI<ShopItemI>
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
const { categoryList, categoryIDMain, shopInfo }: StateF = mapState(["categoryList", "categoryIDMain", "shopInfo"]);
const {  minusPromotionsObject }: GetterF = mapGetter([ "minusPromotionsObject"]);

const { setFoodDetailFlag, setFoodInfo, setSelectedCategoryID, setCategoryIDMain,setCategoryIDAside }: MutationF = mapMutation(["setFoodDetailFlag", "setFoodInfo", "setSelectedCategoryID","setCategoryIDMain", "setCategoryIDAside"]);
const categoryItemLastPaddingBottom: string = computed((): string => (minusPromotionsObject.value.show ? footerInfoAndMinusPromotionsHeightRPX + 20 + "rpx" : footerInfoHeightRPX + 20 + "rpx"));
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
    for (let i = 0; i < categoryList.value.length; i++) {
        const categoryItem = categoryList.value[i];
        const res = await selectQuery(`#${categoryItem.categoryIDMain}`, currentInstance);
        console.log(res.top + navigationBarHeightPX, res.bottom + navigationBarHeightPX, categoryAsideBarHorizontalAndTopBarHeightPX);
        if (categoryAsideBarHorizontalAndTopBarHeightPX <= res.top + navigationBarHeightPX || res.bottom + navigationBarHeightPX > categoryAsideBarHorizontalAndTopBarHeightPX) {
            // console.log(res)
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
.category-list-horizontal-container {
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
    .category-item {
        // padding: 0 0 0 160rpx;
    }

    .category-name {
        font-size: 24rpx;
        line-height: 30rpx;
        color: #666;
        padding: 20rpx 0 0 20rpx;
        color: #333;
        // background-color: #fff;
        // margin: 0 0 20rpx;
    }
    .food-list-box {
        padding-left: 20rpx;
    }


    .category-item:last-child {
        padding-bottom: 20rpx;
    }
    // .food-item {
    //     margin: 20rpx 20rpx 0;
    // }
}
</style>
