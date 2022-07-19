<template>
    <view class="collect-food-component" @click.stop="closeCartDetail" :style="{ bottom: minusPromotionsObject.show ? footerInfoAndMinusPromotionsHeightRPX + 'rpx' : '' }">
        <view :animation="overlayAnimationData" class="collect-food-overlay"></view>
        <view :animation="mainAnimationData" class="collect-food-box flex-col" @click.stop>
            <view class="title">为您精选凑单商品，一起结算更优惠</view>
            <view class="tab-list flex-row flex-a-center flex-no-wrap">
                <view v-for="(collectFoodListItem, index) in collectFoodList" :key="index" class="tab-item flex-center flex-shrink" :class="collectTabIndex === index ? 'tab-item-selected' : ''" :style="{ color: collectTabIndex === index ? shopInfo.mainColor : '' }" @click="changeTabItem(index)">{{ collectFoodListItem.title }}</view>
            </view>
            <scroll-view scroll-y class="collect-food-list-box flex-item" id="collect-food-list-box" @scroll="foodScrollHandle" :scroll-top="scrollTopNum">
                <view class="tab-food-list">
                    <FoodItem v-for="foodItem in collectFoodList[collectTabIndex].foodList" :key="foodItem.foodID" class="collect-food-item" :idPre="idPre" :foodItem="foodItem" type="collectFood"></FoodItem>
                </view>
            </scroll-view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { delaySync, selectQuery, showModal, systemInfo } from "@/utils/index";
import FoodAddMinusItem from "./item/FoodAddMinusItem.vue";
import FoodItem from "./item/FoodItem.vue";
import { getCurrentInstance, computed, onMounted, ref, toRefs, watch } from "vue";
import { footerInfoAndMinusPromotionsHeightRPX, collectTransitionTime } from "../infoConfig";
import { mapState, mapGetter, mapMutation } from "@/utils/mapVuex";
import { ComputedGetterI, ComputedMutationI, ComputedStateI } from "@/interface/vuex";
import { CategoryItemI, CollectFoodListItemI } from "@/interface/menu";
import { CartPriceInfoI, MinusPromotionsObjectI } from "@/store/getters/menu";
import { ComputedI, RefI } from "@/interface/vueInterface";
import useOverlayAnimation from "@/utils/useOverlayAnimation";
import { ShopItemI } from "@/interface/home";
import { MenuStoreI, useMenuStore } from "@/piniaStore/menu";
import { storeToRefs } from "pinia";
import { debounce } from "./common";
import { onShow, onLoad, onPageScroll, onUnload, onHide, onReady } from "@dcloudio/uni-app";

interface MenuStateF {
    cartCategoryList: ComputedStateI<CategoryItemI[]>;
    categoryList: ComputedStateI<CategoryItemI[]>;
    businessType: ComputedStateI<number>;
    shopInfo: ComputedStateI<ShopItemI>;
    collectFoodList: ComputedStateI<CollectFoodListItemI[]>;
    showCollectClickCartImgFlag: ComputedStateI<boolean>;
}
interface MenuGetterF {
    minusPromotionsObject: ComputedGetterI<MinusPromotionsObjectI>;
    cartPriceInfo: ComputedGetterI<CartPriceInfoI>;
}
// menu store
const menuStore: MenuStoreI = useMenuStore();
// menu state
const { cartCategoryList, categoryList, businessType, shopInfo, collectFoodList, showCollectClickCartImgFlag }: MenuStateF = toRefs(menuStore.menuState);
// menu getter
const { minusPromotionsObject, cartPriceInfo }: MenuGetterF = storeToRefs(menuStore);
// menu action
const { setCollectFoodFlag, setCollectTabIndex, setShowCollectClickCartImgFlag, setCartDetailFlag } = menuStore;
// animation
const { overlayAnimationData, mainAnimationData, toStartAnimation, toEndAnimation } = useOverlayAnimation({
    duration: collectTransitionTime,
});
const scrollTopNum = ref(0);
const collectTabIndex: RefI<number> = ref(0);
onMounted(async () => {
    toStartAnimation();
    console.log("onMounted");
    // 获取动画前需要加载的图片
    getCollectFoodListBoxPositionInfo("#collect-food-list-box");
    foodScrollHandle();
    // 动画完成后才能获取位置准确信息
    await delaySync(500);
    getCollectFoodListBoxPositionInfo("#collect-food-list-box");
});

watch(
    () => showCollectClickCartImgFlag.value,
    async (newValue: boolean, oldValue: boolean) => {
        if (newValue === true && oldValue === false) {
            await closeCartDetail();
            setShowCollectClickCartImgFlag(false);
            setCartDetailFlag(true);
        }
    }
);
const idPre = "img-collect";

const foodScrollHandle = debounce(handleScroll, 70);
async function handleScroll(e: any) {
    const currentCollectFoodList = collectFoodList.value[collectTabIndex.value].foodList;
    const { top, bottom } = collectFoodListBoxPositionInfo;
    for (let i = 0; i < currentCollectFoodList.length; i++) {
        const foodItem = currentCollectFoodList[i];
        const imgPositionInfo = await selectQuery(`#${idPre}-${foodItem.foodID}`);
        if ((top <= imgPositionInfo.top && imgPositionInfo.top <= bottom) || (top <= imgPositionInfo.bottom && imgPositionInfo.bottom < bottom)) {
            foodItem.currentImg = foodItem.fullImgPath;
        }
        if (imgPositionInfo.top > bottom) {
            break;
        }
    }
}
let collectFoodListBoxPositionInfo: {
    top: number;
    bottom: number;
} = {
    top: 0,
    bottom: 0,
};
async function getCollectFoodListBoxPositionInfo(id: string) {
    const res = await selectQuery(id);
    collectFoodListBoxPositionInfo = {
        top: res.top,
        bottom: res.bottom,
    };
}
async function closeCartDetail() {
    toEndAnimation();
    await delaySync(collectTransitionTime);
    setCollectFoodFlag(false);
}
function changeTabItem(index: number) {
    // setCollectTabIndex(index);
    collectTabIndex.value = index;
    foodScrollHandle();
    // 切换tab 回滚到最初位置
    scrollTopNum.value = scrollTopNum.value + 0.00001;
}
</script>

<style lang="scss" scoped>
.collect-food-component {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 140rpx;
    width: 100%;
    font-size: 28rpx;
    -webkit-overflow-scrolling: touch;
    z-index: 600;

    .collect-food-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        // transition: all ease-in-out 0.3s;
        opacity: 0;
    }
    .collect-food-box {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 80%;
        // max-height: 800rpx;
        box-sizing: border-box;
        // padding: 0 0 10rpx;
        background-color: #fff;
        overflow-y: auto;
        border-radius: 30rpx 30rpx 0 0;
        transform: translateY(100%);
    }
    .title {
        padding: 40rpx 30rpx 30rpx;
        font-size: 26rpx;
        color: #666;
    }
    .tab-list {
        width: 100%;
        box-sizing: border-box;
        padding: 0 30rpx 30rpx 10rpx;
        overflow-x: scroll;
        &::-webkit-scrollbar {
            display: none;
            width: 0 !important;
            height: 0 !important;
            -webkit-appearance: none;
            background: transparent;
        }
    }
    .tab-item {
        margin-left: 20rpx;
        padding: 10rpx 20rpx;
        font-size: 24rpx;
        border-radius: 4rpx;
        box-sizing: border-box;
        background-color: #f5f5f5;
        color: #666;
        border: 1rpx solid transparent;
    }
    .tab-item-selected {
        border: 1rpx solid;
        background-color: #fff;
        font-weight: bold;
    }
    .collect-food-list-box {
        // max-height: 680rpx;
        // padding-bottom: 20rpx;
        overflow-y: auto;
        ::-webkit-scrollbar {
            display: none;
            width: 0 !important;
            height: 0 !important;
            -webkit-appearance: none;
            background: transparent;
        }
    }
    .collect-food-list-box::-webkit-scrollbar {
        display: none;
        width: 0 !important;
        height: 0 !important;
        -webkit-appearance: none;
        background: transparent;
    }
    .collect-food-item:last-child {
        padding-bottom: 40rpx;
    }
}
.cart-img-transparent {
    position: fixed;
    width: 120rpx;
    height: 120rpx;
    bottom: 50rpx;
    left: 20rpx;
    background-color: transparent;
    z-index: 850;
    // width: ;
}
</style>
