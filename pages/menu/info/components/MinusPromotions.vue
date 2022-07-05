<template>
    <view class="promotion-title flex-row flex-ja-center" :style="{ position: startShopInfoAnimationFlag || shopInfoFlag ? 'absolute' : 'fixed' }">
        <view class="minus-info flex-item flex-row flex-ja-center">
            <text v-for="(contentItem, index) in minusPromotionsObject.contentList" :key="index" :class="{ 'content-red': index % 2 !== 0 }" :style="{'color': index % 2 !== 0 ? $mainColor : ''}">{{ contentItem }}</text>
        </view>
        <view class="collect-to-want flex-center content-red" :style="{'color': $mainColor}" @click="toCollect">去凑单</view>
    </view>
</template>

<script lang="ts" setup>
import { mapGetter, mapState } from "@/utils/mapVuex";

import { ComputedGetterI, ComputedStateI } from "@/interface/vuex";
import { MinusPromotionsObjectI } from "@/store/getters/menu";
import { toRefs } from "vue";
import { MenuStoreI, useMenuStore } from "@/piniaStore/menu";
import { storeToRefs } from "pinia";
import { ShopItemI } from "@/interface/home";

interface MenuStateF {
    startShopInfoAnimationFlag: ComputedStateI<boolean>;
    shopInfoFlag: ComputedStateI<boolean>;
    shopInfo: ComputedStateI<ShopItemI>;
}
interface MenuGetterF {
    minusPromotionsObject: ComputedGetterI<MinusPromotionsObjectI>;
}
// store
const menuStore: MenuStoreI = useMenuStore();
// state
const { startShopInfoAnimationFlag, shopInfoFlag, shopInfo }: MenuStateF = toRefs(menuStore.menuState);
// getter
const { minusPromotionsObject,  }: MenuGetterF = storeToRefs(menuStore);
const { setCollectFoodFlag } = menuStore
function toCollect() {
    setCollectFoodFlag(true)
}
</script>

<style lang="scss">
.promotion-title {
    position: fixed;
    bottom: 140rpx;
    left: 0;
    width: 100%;
    height: 50rpx;
    background-color: #fff1d0;
    line-height: 50rpx;
    font-size: 22rpx;
    color: #333;
    z-index: 700;
    .content-red {
        // color: #e23232;
        // color: #ff4b33;
    }
    .collect-to-want {
        margin-right: 60rpx;
        border: 1rpx solid;
        width: 100rpx;
        height: 30rpx;
        border-radius: 15rpx;
        font-size: 20rpx;
    }
}
// .promotion-title::before {
//     content: "";
//     width: 100%;
//     height: 50rpx;
// }
</style>
