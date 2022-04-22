<template>
    <view class="search-container-com" :animation="overlayAnimationData" :style="{ bottom: bottom + 'px' }">
        <view class="search-box flex-row flex-ja-center">
            <input type="text" class="search-input flex-item" placeholder="请输入搜索关键字" :value="modelValue" @input="inputChange($event)" />
            <view class="cancel" @click="clickCancel">取消</view>
            <view class="search-icon"></view>
            <view class="clear-input" @click="clearInput"></view>
            <view class="search-title">{{ modelValue ? resultTitle : defaultTitle }}</view>
        </view>
        <scroll-view scroll-y class="result-box" v-if="modelValue">
            <template v-if="searchResultList.length">
                <slot name="result"></slot>
            </template>
            <view v-else class="result-list-empty flex-col flex-ja-center">
                <CommonError></CommonError>
            </view>
        </scroll-view>
        <scroll-view scroll-y v-else class="default-box">
            <slot name="default"></slot>
        </scroll-view>
    </view>
</template>

<script lang="ts" setup>
import { ComputedI, RefI } from "@/interface/vueInterface";
import { ComputedGetterI, ComputedMutationI, ComputedStateI } from "@/interface/vuex";
import { MinusPromotionsObjectI } from "@/store/getters/menu";
import { delaySync } from "@/utils/";
import Shop from "@/components/Shop.vue";
import { mapGetter, mapMutation, mapState } from "@/utils/mapVuex";
import { ref, onMounted, computed } from "vue";
import { ShopItemI } from "@/interface/home";
import { searchDefaultTransitionTime } from "./config";
import useOverlayAnimation from "@/utils/useOverlayAnimation";
interface PropsI {
    bottom?: number;
    searchResultList: any;
    modelValue: string;
    animationTime?: number;
    resultTitle?: string;
    defaultTitle?: string;
}
interface EmitI {
    (e: "clickResultItem", id: number): void;
    (e: "clickCancel"): void;
    (e: "update:modelValue"): void;
}

// const searchDefaultTransitionTime = 300
const props: PropsI = withDefaults(defineProps<PropsI>(), {
    bottom: 0,
    searchOriginList: [],
    modelValue: "",
    animationTime: searchDefaultTransitionTime,
    resultTitle: "搜索结果",
    defaultTitle: "推荐结果",
});
const emit = defineEmits<EmitI>();
const { overlayAnimationData, toStartAnimation, toEndAnimation } = useOverlayAnimation({
    duration: props.animationTime,
});
onMounted(() => {
    toStartAnimation();
});
function inputChange(e: any) {
    emit("update:modelValue", e.detail.value);
}

function clearInput() {
    emit("update:modelValue", "");
}
async function clickCancel() {
    toEndAnimation();
    await delaySync(props.animationTime);
    emit("clickCancel");
}
</script>

<style lang="scss">
.search-container-com {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    bottom: 0;
    z-index: 300;
    color: #999;
    opacity: 0;
    padding-top: 170rpx;
    box-sizing: border-box;
    background-color: #fff;

    .search-box {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 170rpx;
        padding: 30rpx 30rpx 80rpx;
        box-sizing: border-box;
        background-color: #fff;
        z-index: 10;
        .search-input {
            height: 60rpx;
            padding: 0 60rpx;
            border: 1px solid #ccc;
            border-radius: 30rpx;
            font-size: 26rpx;
        }
        .cancel {
            padding: 10rpx 0;
            width: 80rpx;
            text-align: center;
            margin-left: 20rpx;
        }
        .search-icon {
            position: absolute;
            top: 52rpx;
            left: 60rpx;
            width: 16rpx;
            height: 16rpx;
            background-color: red;
        }
        .clear-input {
            position: absolute;
            top: 52rpx;
            right: 160rpx;
            width: 16rpx;
            height: 16rpx;
            background-color: red;
        }
        .search-title {
            position: absolute;
            bottom: 20rpx;
            left: 30rpx;
            font-size: 28rpx;
            color: #999;
        }
    }
    .result-box,
    .default-box,
    .result-list-empty {
        position: relative;
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        background-color: #fff;
        overflow: auto;
    }
}
</style>
