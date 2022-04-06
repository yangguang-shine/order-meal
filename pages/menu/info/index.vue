<template>
    <view class="menu-container">
        <TopBar></TopBar>
        <view :animation="shopInfoAnimationData" class="menu-order-box flex-col">
            <view class="menu-list-box flex-item flex-row">
                <CategoryAsideBar></CategoryAsideBar>
                <FoodCategoryList class="flex-item"></FoodCategoryList>
            </view>
            <CartDetail v-if="cartDetailFlag"></CartDetail>
            <MinusPromotions v-if="minusPromotionsObject.show"></MinusPromotions>
            <FooterInfo></FooterInfo>
            <FoodDetail v-if="foodDetailFalg"></FoodDetail>
        </view>
        <ShopInfo v-show="startShopInfoAnimationFlag || shopInfoFlag"></ShopInfo>
        <!-- <common-loading v-if="showLoadingFlag"></common-loading> -->
    </view>
</template>

<script lang="ts" setup>
import { getRpxToPx } from "@/utils/index";
import CategoryAsideBar from "./components/CategoryAsideBar.vue";
import FoodCategoryList from "./components/FoodCategoryList.vue";
import MinusPromotions from "./components/MinusPromotions.vue";
import MinusPromotionsBlock from "./components/MinusPromotionsBlock.vue";
import FooterInfo from "./components/FooterInfo.vue";
import FooterCartBlock from "./components/FooterCartBlock.vue";
import CartDetail from "./components/CartDetail.vue";
import FoodDetail from "./components/FoodDetail.vue";
import TopBar from "./components/TopBar.vue";
import ShopInfo from "./components/ShopInfo.vue";
import { delaySync } from "@/utils/index.js";

import { mapState, mapMutation, mapAction, mapGetter } from "@/utils/mapVuex";
import { defineComponent, getCurrentInstance, computed, watch, ref } from "vue";
import { onShow, onLoad, onPageScroll } from "@dcloudio/uni-app";
import { ComputedActionI, ComputedMutationI, ComputedStateI } from "@/interface/vuex";
import { ShopItemI } from "@/interface/home";
import { CategoryItemI, FoodItemI } from "@/interface/menu";
import { shopInfoTransitionTime } from "./infoConfig";

interface StateF {
    shopInfo: ComputedStateI<ShopItemI>;
    topBarInfo: ComputedStateI<string>;
    startShopInfoAnimationFlag: ComputedStateI<boolean>;
    shopInfoFlag: ComputedStateI<boolean>;
    cartDetailFlag: ComputedStateI<boolean>;
    foodDetailFalg: ComputedStateI<boolean>;
}

interface MutationF {
    initCart: ComputedMutationI<void>;
}

interface ActionF {
    getMenuList: ComputedActionI<void>;
    getOrderKeyFoodList: ComputedActionI<{ orderKey: string }>;
    getShopInfo: ComputedMutationI<{ shopID: number }>;
}

const { $showLoading, $hideLoading, $showModal } = getCurrentInstance().proxy;
const { shopInfo, topBarInfo,startShopInfoAnimationFlag, shopInfoFlag, cartDetailFlag, foodDetailFalg }: StateF = mapState(["shopInfo", "topBarInfo","startShopInfoAnimationFlag", "shopInfoFlag", "cartDetailFlag", "foodDetailFalg"]);
const { minusPromotionsObject } = mapGetter(["minusPromotionsObject"]);
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
const { initCart }: MutationF = mapMutation(["initCart"]);

const { getMenuList, getOrderKeyFoodList, getShopInfo }: ActionF = mapAction(["getMenuList", "getOrderKeyFoodList", "getShopInfo"]);

let orderKey: string = "";
onLoad(async (option: { orderKey?: string }) => {
    try {
        orderKey = option.orderKey || "";
        $showLoading();
        if (!shopInfo.value.shopID) {
            await getShopInfo({
                shopID: 100036,
            });
        }
        await init();
    } catch (e) {
        console.log(e);
    } finally {
        $hideLoading();
    }
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
    .menu-list-box {
        height: 0rpx;
    }
    .menu-order-box {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        padding-top: 80rpx;
        padding-bottom: 140rpx;
        box-sizing: border-box;
        transition: all ease-in-out 0.3s;
    }
    .show-menu-order-box {
        left: 0;
    }
    .hide-menu-order-box {
        left: -750rpx;
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
