<template>
    <div class="reserve-remain-container flex-row flex-ja-center" :style="{ 'background-color': shopInfo.mainColor }">
        仅剩{{reserveRemain}}份
        <div class="arrow" :style="{ color: shopInfo.mainColor }"></div>
    </div>
</template>

<script lang="ts" setup>
import {toRefs} from 'vue'
import { MenuStoreI, useMenuStore } from "@/piniaStore/menu";
import { MenuStateG } from "@/piniaStore/menu/state";

// store
const menuStore: MenuStoreI = useMenuStore();
// state
const { shopInfo }: MenuStateG = toRefs(menuStore.menuState)
interface PropsI {
    reserveRemain?: number;
}
const props: PropsI = withDefaults(defineProps<PropsI>(), {
    text: 1,
});
</script>

<style lang="scss" scoped>
.reserve-remain-container {
    position: absolute;
    top: -40rpx;
    right: 0rpx;
    height: 26rpx;
    border-radius: 4rpx;
    font-size: 20rpx;
    color: #fff;
    // padding: 0 2rpx;
    width: 90rpx;
    .arrow {
        position: absolute;
        right: 10rpx;
        bottom: -16rpx;
        width: 0;
        height: 0;
        border: 10rpx solid;
        border-left-color: transparent;
        border-right-color: transparent;
        border-bottom-color: transparent;
    }
}
</style>
