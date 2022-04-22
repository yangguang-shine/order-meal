<template>
    <view class="menu-container">
        <TopBar></TopBar>
        <view :animation="shopInfoAnimationData" class="menu-order-box">
            <view v-if="shopInfo.mode === 'vertical'" class="vertical-menu-box">
                <FoodCategoryList class="flex-item"></FoodCategoryList>
                <CategoryAsideBar></CategoryAsideBar>
            </view>
            <view v-else-if="shopInfo.mode === 'horizontal'" class="horizontal-menu-box">
                <FoodCategoryListHorizontal></FoodCategoryListHorizontal>
                <CategoryAsideBarHorizontal></CategoryAsideBarHorizontal>
            </view>
            <CartDetail v-if="cartDetailFlag"></CartDetail>
            <MinusPromotions v-if="minusPromotionsObject.show"></MinusPromotions>
            <FooterInfo></FooterInfo>
            <FoodDetail v-if="foodDetailFalg"></FoodDetail>
        </view>
        <ShopInfo v-show="startShopInfoAnimationFlag || shopInfoFlag"></ShopInfo>
        <SearchFood v-if="searchFoodFlag"></SearchFood>
        <PackPriceExplain v-if="menuPackPriceExpalinFlag" @close="setMenuPackPriceExpalinFlag"></PackPriceExplain>
        <!-- <common-loading v-if="showLoadingFlag"></common-loading> -->
    </view>
</template>

<script lang="ts" setup>
import { getRpxToPx, hideLoading, navigationBarHeightPX, showLoading } from "@/utils/index";
import CategoryAsideBar from "./components/CategoryAsideBar.vue";
import CategoryAsideBarHorizontal from "./components/CategoryAsideBarHorizontal.vue";
import FoodCategoryList from "./components/FoodCategoryList.vue";
import FoodCategoryListHorizontal from "./components/FoodCategoryListHorizontal.vue";
import MinusPromotions from "./components/MinusPromotions.vue";
import MinusPromotionsBlock from "./components/MinusPromotionsBlock.vue";
import FooterInfo from "./components/FooterInfo.vue";
import FooterCartBlock from "./components/FooterCartBlock.vue";
import CartDetail from "./components/CartDetail.vue";
import FoodDetail from "./components/FoodDetail.vue";
import TopBar from "./components/TopBar.vue";
import ShopInfo from "./components/ShopInfo.vue";
import SearchFood from "./components/SearchFood.vue";
import { delaySync } from "@/utils/index.js";
import PackPriceExplain from '@/components/PackPriceExplain.vue'

import { mapState, mapMutation, mapAction, mapGetter } from "@/utils/mapVuex";
import { defineComponent, getCurrentInstance, computed, watch, ref } from "vue";
import { onShow, onLoad, onPageScroll, onUnload, onHide } from "@dcloudio/uni-app";
import { ComputedActionI, ComputedGetterI, ComputedMutationI, ComputedStateI } from "@/interface/vuex";
import { ShopItemI } from "@/interface/home";
import { CategoryItemI, FoodItemI } from "@/interface/menu";
import { footerInfoAndMinusPromotionsHeightRPX, footerInfoHeightRPX, shopInfoTransitionTime } from "./infoConfig";
import { MinusPromotionsObjectI } from "@/store/getters/menu";

interface StateF {
    shopInfo: ComputedStateI<ShopItemI>;
    businessType: ComputedStateI<number>;
    topBarInfo: ComputedStateI<string>;
    startShopInfoAnimationFlag: ComputedStateI<boolean>;
    shopInfoFlag: ComputedStateI<boolean>;
    cartDetailFlag: ComputedStateI<boolean>;
    foodDetailFalg: ComputedStateI<boolean>;
    searchFoodFlag: ComputedStateI<boolean>;
    menuPackPriceExpalinFlag: ComputedStateI<boolean>;
    
}
interface GetterF {
    minusPromotionsObject: ComputedGetterI<MinusPromotionsObjectI>;
}

interface MutationF {
    initCart: ComputedMutationI<void>;
    handleMenuUnload: ComputedMutationI<void>;
    saveBusinessType: ComputedMutationI<number>;
    setMenuPackPriceExpalinFlag: ComputedMutationI<boolean>;
    
}

interface ActionF {
    getMenuList: ComputedActionI<void>;
    getOrderKeyFoodList: ComputedActionI<{ orderKey: string }>;
    getShopInfo: ComputedMutationI<{ shopID: number }>;
}
const { shopInfo, businessType, topBarInfo, startShopInfoAnimationFlag, shopInfoFlag, cartDetailFlag, foodDetailFalg, searchFoodFlag, menuPackPriceExpalinFlag }: StateF = mapState();
const { minusPromotionsObject }: GetterF = mapGetter();
const { initCart, handleMenuUnload, saveBusinessType, setMenuPackPriceExpalinFlag }: MutationF = mapMutation();

const { getMenuList, getOrderKeyFoodList, getShopInfo }: ActionF = mapAction();

const shopInfoAnimationData = ref(null);
const shopInfoAnimation = uni.createAnimation({
    duration: shopInfoTransitionTime,
    timingFunction: "ease-in-out",
});
function toStartAnimation() {
    shopInfoAnimation.left("-750rpx").step();
    shopInfoAnimationData.value = shopInfoAnimation.export();
}
function toEndAnimation() {
    shopInfoAnimation.left(0).step();
    shopInfoAnimationData.value = shopInfoAnimation.export();
}

watch(startShopInfoAnimationFlag, (newValue: boolean, oldValue: boolean) => {
    if (newValue) {
        toStartAnimation();
    } else {
        toEndAnimation();
    }
});

let orderKey: string = "";
interface OptionI {
    shopID: string;
    businessType: string;
    orderKey?: string;
}
onLoad(async (option: OptionI) => {
    try {
        orderKey = option.orderKey || "";
        const shopID: number = Number(option.shopID)
        const optionBusinessType: number = Number(option.businessType)
        // routerbusinessType = option.businessType || "";
        // orderKey = option.orderKey || "";
        showLoading()
        if (shopInfo.value.shopID !== shopID) {
            await getShopInfo({
                shopID,
            });
        }
        if (businessType.value !== optionBusinessType) {
            saveBusinessType(optionBusinessType)
        }
        console.log(shopInfo.value);

        await init();
    } catch (e) {
        console.log(e);
    } finally {
        hideLoading()
    }
});
onHide(() => {
    console.log("page hide >>>>>");
});
onUnload(() => {
    handleMenuUnload();
    console.log("page onUnload >>>>>");
});


async function init() {
    await getMenuList();
    // 重来一单，orderAgain 和 orderKey 缺一不可
    if (orderKey) {
        await getOrderKeyFoodList({
            orderKey,
        });
    }
    initCart();
}

function getStorageCart() {}
</script>

<style lang="scss">
page {
    height: 100vh;
}
.menu-container {
    font-size: 28rpx;
    width: 750rpx;
    height: 100vh;
    color: #333;
    position: relative;

    .menu-order-box {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding-top: 80rpx;
        // padding-bottom: 140rpx;
        box-sizing: border-box;
        transition: all ease-in-out 0.3s;
        // z-index: 100;
    }
    .vertical-menu-box,
    .horizontal-menu-box {
        position: relative;
        height: 100%;
    }
    //    .shop-info-box  {
    //         position: absolute;
    //         top: 0;
    //         width: 100%;
    //         height: 100%;
    //         padding-top: 80rpx;
    //         box-sizing: border-box;
    //         transition: all ease-in-out .3s;
    // }

    // flex：1 和 height共存 ，取最大值
}
</style>
