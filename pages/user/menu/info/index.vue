<template>
    <view class="menu-container">
        <TopBar></TopBar>
        <view class="menu-order-box flex-col" :class="topBarInfo === '点餐' ? 'show-menu-order-box' : 'hide-menu-order-box'">
            <view class="menu-list-box flex-item flex-row">
                <CategoryAsideBar></CategoryAsideBar>
                <FoodCategoryList class="flex-item"></FoodCategoryList>
            </view>
            <CartDetail v-if="cartDetailFlag"></CartDetail>
            <MinusPromotions v-if="minusPromotionsObject.show"></MinusPromotions>
            <FooterInfo></FooterInfo>
            <FoodDetail v-if="foodDetailFalg"></FoodDetail>
        </view>
        <ShopInfo v-if="shopInfoFlag"></ShopInfo>
        <!-- <common-loading v-if="showLoadingFlag"></common-loading> -->
    </view>
</template>

<script lang="ts" setup>
import { get1rpx2px } from "@/utils/index";
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

import { mapState, mapMutation, mapAction, mapGetter } from "../../../../utils/mapVuex";
import { defineComponent, getCurrentInstance, computed } from "vue";
import { onShow, onLoad, onPageScroll } from "@dcloudio/uni-app";
import { ComputedAction, ComputedMutation, ComputedState } from "@/interface/vuex";
import { ShopItemI } from "@/interface/home";
import { CategoryItemI, FoodItemI } from "@/interface/menu";

interface StateF {
    topBarInfo: ComputedState<string>;
    shopInfoFlag: ComputedState<boolean>;
    cartDetailFlag: ComputedState<boolean>;
    foodDetailFalg: ComputedState<boolean>;
}

interface MutationF {
    initCart: ComputedMutation<void>;
}

interface ActionF {
    getMenuList: ComputedAction<void>;
    getOrderKeyFoodList: ComputedAction<{ orderKey: string }>;
}

const { $showLoading, $hideLoading, $showModal } = getCurrentInstance().proxy;
const { topBarInfo, shopInfoFlag, cartDetailFlag, foodDetailFalg }: StateF = mapState(["topBarInfo", "shopInfoFlag", "cartDetailFlag", "foodDetailFalg"]);
const { minusPromotionsObject } = mapGetter(["minusPromotionsObject"]);

const { initCart }: MutationF = mapMutation(["initCart"]);

const { getMenuList, getOrderKeyFoodList }: ActionF = mapAction(["getMenuList", "getOrderKeyFoodList"]);

let orderKey: string = "";
onLoad(async (option: { orderKey?: string }) => {
    try {
        orderKey = option.orderKey || "";
        $showLoading();
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
    getStorageCart();
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
