<template>
    <view class="promotion-title flex-row flex-ja-center" :style="{ position: startShopInfoAnimationFlag || shopInfoFlag ? 'absolute' : 'fixed' }">
        <text v-for="(contentItem, index) in minusPromotionsObject.contentList" :key="index" :class="{ 'content-red': index % 2 !== 0 }">{{ contentItem }}</text>
    </view>
</template>

<script lang="ts" setup>
import { toRefs } from "vue";
import { MenuGetterG, MenuStoreI, useMenuStore } from "@/piniaStore/menu";
import { storeToRefs} from 'pinia'
import { MenuStateG } from "@/piniaStore/menu/state";
// store
const menuStore: MenuStoreI = useMenuStore();
// state
const { startShopInfoAnimationFlag, shopInfoFlag }: MenuStateG = toRefs(menuStore.menuState);
// getter
const { minusPromotionsObject }: MenuGetterG = storeToRefs(menuStore);
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
        color: #e23232;
    }
}
// .promotion-title::before {
//     content: "";
//     width: 100%;
//     height: 50rpx;
// }
</style>
