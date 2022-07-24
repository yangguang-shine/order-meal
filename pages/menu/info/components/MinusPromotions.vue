<template>
    <view class="promotion-title flex-row flex-ja-center" id="minus-promotion-title" :style="{ position: startShopInfoAnimationFlag || shopInfoFlag ? 'absolute' : 'fixed' }">
        <view class="minus-info flex-item flex-row flex-ja-center">
            <text v-for="(contentItem, index) in minusPromotionsObject.contentList" :key="index" :class="{ 'content-red': index % 2 !== 0 }" :style="{ color: index % 2 !== 0 ? $mainColor : '' }">{{ contentItem }}</text>
        </view>
        <view class="collect-to-want flex-center content-red" :style="{ color: $mainColor }" @click="toCollect">去凑单</view>
    </view>
</template>

<script lang="ts" setup>
import { toRefs, onMounted, getCurrentInstance } from "vue";
import { MenuGetterG, MenuStoreI, useMenuStore } from "@/piniaStore/menu";
import { storeToRefs } from "pinia";
import { selectQuery } from "@/utils/";
import { MenuStateG } from "@/piniaStore/menu/state";
// store
const menuStore: MenuStoreI = useMenuStore();
// state
const { startShopInfoAnimationFlag, shopInfoFlag, shopInfo, collectFoodFlag }: MenuStateG = toRefs(menuStore.menuState);
// getter
const { minusPromotionsObject }: MenuGetterG = storeToRefs(menuStore);
const { setCollectFoodFlag, setMinusPX } = menuStore;

onMounted(async () => {
    getMinusPromotionTitleHeight();
});
    const currentInstance = getCurrentInstance()

async function getMinusPromotionTitleHeight() {
    const res = await selectQuery("#minus-promotion-title", currentInstance);
    setMinusPX(res.height);
}
function toCollect() {
    if (!collectFoodFlag.value) {
        setCollectFoodFlag(true);
    }
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
