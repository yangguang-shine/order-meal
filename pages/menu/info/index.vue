<template>
    <view class="menu-container">
        <TopBar></TopBar>
        <view :animation="shopInfoAnimationData" class="menu-order-box">
            <view v-if="shopInfo.mode === 'vertical'" class="vertical-menu-box">
                <FoodCategoryList ref="refFoodCategoryList" class="flex-item"></FoodCategoryList>
                <CategoryAsideBar></CategoryAsideBar>
            </view>
            <view v-else-if="shopInfo.mode === 'horizontal'" class="horizontal-menu-box">
                <FoodCategoryListHorizontal ref="refFoodCategoryListHorizontal"></FoodCategoryListHorizontal>
                <CategoryAsideBarHorizontal></CategoryAsideBarHorizontal>
            </view>
            <CartDetail v-if="cartDetailFlag"></CartDetail>
            <CollectFood v-if="collectFoodFlag"></CollectFood>
            <MinusPromotions v-if="minusPromotionsObject.show"></MinusPromotions>
            <FooterInfo></FooterInfo>
            <FoodDetail v-if="foodDetailFalg"></FoodDetail>
            <FoodSpecification v-if="foodSpecificationFlag"></FoodSpecification>
        </view>
        <ShopInfo v-show="startShopInfoAnimationFlag || shopInfoFlag"></ShopInfo>
        <SearchFood v-if="searchFoodFlag"></SearchFood>
        <PackPriceExplain v-if="menuPackPriceExpalinFlag" @close="setMenuPackPriceExpalinFlag"></PackPriceExplain>
        <!-- <common-loading v-if="showLoadingFlag"></common-loading> -->
    </view>
</template>

<script lang="ts" setup>
import { getRpxToPx, hideLoading, showLoading } from "@/utils/index";
import CategoryAsideBar from "./components/CategoryAsideBar.vue";
import CategoryAsideBarHorizontal from "./components/CategoryAsideBarHorizontal.vue";
import FoodCategoryList from "./components/FoodCategoryList.vue";
import FoodCategoryListHorizontal from "./components/FoodCategoryListHorizontal.vue";
import MinusPromotions from "./components/MinusPromotions.vue";
import MinusPromotionsBlock from "./components/MinusPromotionsBlock.vue";
import FooterInfo from "./components/FooterInfo.vue";
import FooterCartBlock from "./components/FooterCartBlock.vue";
import CartDetail from "./components/CartDetail.vue";
import CollectFood from "./components/CollectFood.vue";
import FoodDetail from "./components/FoodDetail.vue";
import FoodSpecification from "./components/FoodSpecification.vue";
import TopBar from "./components/TopBar.vue";
import ShopInfo from "./components/ShopInfo.vue";
import SearchFood from "./components/SearchFood.vue";
import { delaySync } from "@/utils/index.js";
import PackPriceExplain from "@/components/PackPriceExplain.vue";

import { mapState, mapMutation, mapAction, mapGetter } from "@/utils/mapVuex";
import { defineComponent, getCurrentInstance, computed, watch, ref, toRefs, onMounted } from "vue";
import { onShow, onLoad, onPageScroll, onUnload, onHide, onReady } from "@dcloudio/uni-app";
import { ComputedActionI, ComputedGetterI, ComputedMutationI, ComputedStateI } from "@/interface/vuex";
import { ShopItemI } from "@/interface/home";
import { CategoryItemI, FoodItemI } from "@/interface/menu";
import { footerInfoAndMinusPromotionsHeightRPX, footerInfoHeightRPX, shopInfoTransitionTime } from "./infoConfig";
import { MinusPromotionsObjectI } from "@/store/getters/menu";
import { MenuStoreI, useMenuStore } from "@/piniaStore/menu";
import { storeToRefs } from "pinia";
import { RefI } from "@/interface/vueInterface";
interface MenuStateF {
    shopInfo: ComputedStateI<ShopItemI>;
    businessType: ComputedStateI<number>;
    topBarInfo: ComputedStateI<string>;
    startShopInfoAnimationFlag: ComputedStateI<boolean>;
    shopInfoFlag: ComputedStateI<boolean>;
    cartDetailFlag: ComputedStateI<boolean>;
    foodDetailFalg: ComputedStateI<boolean>;
    collectFoodFlag: ComputedStateI<boolean>;
    searchFoodFlag: ComputedStateI<boolean>;
    menuPackPriceExpalinFlag: ComputedStateI<boolean>;
    foodSpecificationFlag: ComputedStateI<boolean>;
    
}
interface MenuGetterF {
    minusPromotionsObject: ComputedGetterI<MinusPromotionsObjectI>;
}

// menu store
const menuStore: MenuStoreI = useMenuStore();
// menu state
const { shopInfo, businessType, topBarInfo, startShopInfoAnimationFlag, shopInfoFlag, cartDetailFlag, foodDetailFalg, searchFoodFlag, menuPackPriceExpalinFlag, collectFoodFlag, foodSpecificationFlag }: MenuStateF = toRefs(menuStore.menuState);
console.log(shopInfo)
// debugger
// menu getter
const { minusPromotionsObject }: MenuGetterF = storeToRefs(menuStore);
// menu action
const { getMenuList, getOrderKeyFoodList, getShopInfo, initCart, setMenuDefault, setBusinessType, setMenuPackPriceExpalinFlag } = menuStore;

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

const refFoodCategoryList = ref(null);
const refFoodCategoryListHorizontal = ref(null);


onLoad(async (option: OptionI) => {
    try {
        // setMenuDefault();
        orderKey = option.orderKey || "";
        const shopID: number = Number(option.shopID);
        const optionBusinessType: number = Number(option.businessType);
        // routerbusinessType = option.businessType || "";
        // orderKey = option.orderKey || "";
        showLoading();
        if (shopInfo.value.shopID !== shopID) {
            await getShopInfo({
                shopID,
            });
        }
        if (businessType.value !== optionBusinessType) {
            setBusinessType(optionBusinessType);
        }
        await init();
    } catch (e) {
        console.log(e);
    } finally {
        hideLoading();
    }
});
watch(
    () => shopInfo.value.mode,
    (newValue: string, oldValue: string) => {
        handleCurrentLazyImg(newValue);
    }
);
// watch(
//     () => menuStore.menuState.shopInfo,
//     (newValue: string, oldValue: string) => {
//         console.log("newValue, oldValue");
//         console.log(newValue, oldValue);
//         // handleCurrentLazyImg(newValue);
//     }
// );
onHide(() => {
    console.log("page hide >>>>>");
});
onUnload(() => {
    setMenuDefault();
    console.log("page onUnload >>>>>");
});
onReady(() => {
    console.log("page onReady >>>>>");
});
onMounted(() => {
    console.log("page onMounted >>>>>");
    
})


async function init() {
    await getMenuList();
    handleCurrentLazyImg(shopInfo.value.mode);
    // 重来一单，orderAgain 和 orderKey 缺一不可
    if (orderKey) {
        await getOrderKeyFoodList({
            orderKey,
        });
    }
    initCart();
}
function handleCurrentLazyImg(mode: string) {
    setTimeout(() => {
        if (mode === "vertical") {
           refFoodCategoryList.value && refFoodCategoryList.value.foodScrollHandle();
        } else {
           refFoodCategoryListHorizontal.value && refFoodCategoryListHorizontal.value.foodScrollHandle();
        }
    }, 50);
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
