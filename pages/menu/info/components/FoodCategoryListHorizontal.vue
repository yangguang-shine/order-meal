<template>
    <scroll-view scroll-y scroll-with-animation :scroll-into-view="categoryIDMain" class="category-list-horizontal-container" id="food-main-box" @scroll="foodScrollHandle" :style="{ 'padding-top': asideBarHorizontalPX + 'px' }">
        <div class="category-list">
            <view class="category-item" v-for="(foodCategoryItem, index) in categoryList" :key="index" :id="foodCategoryItem.categoryIDMain" :style="{ 'padding-bottom': index === categoryList.length - 1 ? categoryItemLastPaddingBottom : '' }">
                <view class="category-name">{{ foodCategoryItem.categoryName }}</view>
                <div class="food-list-box flex-row flex-wrap">
                    <FoodItemHorizontal v-for="foodItem in foodCategoryItem.foodList" :key="foodItem.foodID" :foodItem="foodItem" @clickFoodItem="toShowFoodDetail" type="horizontal"></FoodItemHorizontal>
                </div>
                <!-- <FoodItem class="food-item" v-for="foodItem in foodCategoryItem.foodList" :key="foodItem.foodID" :foodItem="foodItem" @clickFoodItem="toShowFoodDetail"></FoodItem> -->
            </view>
        </div>
    </scroll-view>
</template>

<script lang="ts" setup>
import FoodItem from "./item/FoodItem.vue";
import FoodItemHorizontal from "./item/FoodItemHorizontal.vue";
import { CategoryItemI, FoodItemI } from "@/interface/menu";
import { getCurrentInstance, computed, onMounted, ref, toRefs } from "vue";
import { MenuGetterG, MenuStoreI, useMenuStore } from "@/piniaStore/menu";
import { storeToRefs } from "pinia";
import { debounce } from "@/utils/tool";
import { MenuStateG } from "@/piniaStore/menu/state";


// store
const menuStore: MenuStoreI = useMenuStore();
// state
const { categoryList, categoryIDMain, shopInfo, footerPX, asideBarHorizontalPX }: MenuStateG = toRefs(menuStore.menuState);
// getter
const { minusPromotionsObject, footerAndMinusPX }: MenuGetterG = storeToRefs(menuStore);
// action
const { setFoodDetailFlag, setFoodInfo, setSelectedCategoryID, setCategoryIDMain, setCategoryIDAside, handleFoodCategoryListScroll } = menuStore;
const categoryItemLastPaddingBottom: string = computed((): string => (minusPromotionsObject.value.show ? footerAndMinusPX.value + 10 + "px" : footerPX.value + 10 + "px"));

function toShowFoodDetail(foodItem: FoodItemI) {
    setFoodDetailFlag(true);
    setFoodInfo(foodItem);
}
const foodScrollHandle = debounce(handleScroll, 70);
const currentInstance = getCurrentInstance();

async function handleScroll(e: any) {
    handleFoodCategoryListScroll({
        currentInstance,
        type: 'horizontal'
    });

    // for (let i = 0; i < categoryList.value.length; i++) {
    //     const categoryItem = categoryList.value[i];
    //     const categoryItemPositionInfo = await selectQuery(`#${categoryItem.categoryIDMain}`, currentInstance);
    //     if (categoryAsideBarHorizontalAndTopBarHeightPX <= categoryItemPositionInfo.top || categoryItemPositionInfo.bottom > categoryAsideBarHorizontalAndTopBarHeightPX) {
    //         setSelectedCategoryID(categoryItem.categoryID);
    //         setCategoryIDMain("");
    //         setCategoryIDAside(categoryItem.categoryIDAside);
    //         await handleLazyImg(i)
    //         break;
    //     }
    // }
}
// const foodScrollHandle = debounce(handleScroll, 30);
// async function handleLazyImg(index: number) {

//     const categoryItem: CategoryItemI = categoryList.value[index];
//     let lastCategoryFlag: boolean = true;
//     for (let i = 0; i < categoryItem.foodList.length; i++) {
//         const foodItem = categoryItem.foodList[i];
//         const imgPositionInfo = await selectQuery(`#img-foodID-${foodItem.foodID}`, currentInstance);
//         if (imgPositionInfo.top > systemInfo.windowHeight) {
//             lastCategoryFlag = false;
//             break;
//         }
//         if ((0 <= imgPositionInfo.top && imgPositionInfo.top <= systemInfo.windowHeight) || (0 <= imgPositionInfo.bottom && imgPositionInfo.bottom < systemInfo.windowHeight)) {
//             foodItem.currentImg = foodItem.fullImgPath;
//         }
//     }
//     if (lastCategoryFlag && index + 1 < categoryList.value.length) {
//         await handleLazyImg(index + 1)
//     }
// }

defineExpose({
    foodScrollHandle,
});
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
