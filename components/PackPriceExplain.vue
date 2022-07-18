<template>
    <view class="pack-price-explain-com" @click.stop @touchmove.stop.prevent>
        <view class="overlay" :animation="overlayAnimationData" @click.stop="close"></view>
        <view class="explain-box" :animation="mainAnimationData">
            <view class="title text-center">包装费说明</view>
            <view class="content">依据国家有关政策要求，不得免费提供塑料购物袋。为保障您的商品安全、卫生送达，需基于外卖自提业务特性对您的外卖商品使用塑料购物袋等材料进行打包，收取相应的包装费用。</view>
            <image class="close-img"  src="/static/img/common/close1.png" @click.stop="close"></image>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { packPriceExpalinTransitionTime } from "./config";
import { ref, onMounted, computed } from "vue";
import { ComputedI } from "@/interface/vueInterface";
import { delaySync } from "../utils";
import useOverlayAnimation from "@/utils/useOverlayAnimation";

interface EmitI {
    (e: "close", flag: boolean): void;
}
const emit = defineEmits<EmitI>();
const { overlayAnimationData, mainAnimationData, toStartAnimation, toEndAnimation } = useOverlayAnimation({
    duration: packPriceExpalinTransitionTime,
});
onMounted(() => {
    toStartAnimation();
});
async function close() {
    toEndAnimation();
    await delaySync(packPriceExpalinTransitionTime);
    emit("close", false);
}
</script>

<style scoped lang="scss">
.pack-price-explain-com {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 2000;
    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        opacity: 0;
    }
    .explain-box {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        box-sizing: border-box;
        padding: 40rpx 20rpx 160rpx;
        background-color: #fff;
        border-top-left-radius: 16rpx;
        border-top-right-radius: 16rpx;
        transform: translateY(100%);
        .title {
            color: #333;
            font-weight: bold;
            font-size: 34rpx;
            line-height: 38rpx;
        }
        .content {
            margin-top: 20rpx;
            color: #333;
            font-size: 28rpx;
            line-height: 34rpx;
        }
        .close-img {
            position: absolute;
            top: 20rpx;
            right: 20rpx;
            width: 40rpx;
            height: 40rpx;
            // background-color: red;
        }
    }
}
</style>
