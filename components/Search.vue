<template>
    <view class="search-container-com" :animation="searchModalAnimationData" :style="{ bottom: bottom + 'px' }">
        <view class="search-box flex-row flex-ja-center">
            <input type="text" class="search-input flex-item" placeholder="请输入搜索关键字" :value="modelValue" @input="inputChange($event)" />
            <view class="cancel" @click="clickCancel">取消</view>
            <view class="search-icon"></view>
            <view class="clear-input" @click="clearInput"></view>
        </view>
        <div class="result-box">
            <view v-if="searchResultList.length" class="result-list">
                <slot></slot>
            </view>
            <view v-else class="result-list-empty flex-col flex-ja-center">
                <CommonError></CommonError>
            </view>
        </div>
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
interface PropsI {
    bottom: number;
    searchResultList: any;
    modelValue: string;
    animationTime?: number;
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
});
const emit = defineEmits<EmitI>();

const searchModalAnimationData: RefI<any> = ref(null);
const searchModalAnimation = uni.createAnimation({
    duration: props.animationTime,
    timingFunction: "linear",
});
onMounted(() => {
    showStartAnimation();
});
function inputChange(e: any) {
    emit("update:modelValue", e.detail.value);
}
function showStartAnimation() {
    searchModalAnimationData.value = searchModalAnimation.opacity(1).step().export();
}
function showEndAnimation() {
    searchModalAnimationData.value = searchModalAnimation.opacity(0).step().export();
}
function clearInput() {
    emit("update:modelValue", '');
}
async function clickCancel() {
    showEndAnimation();
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
    .search-box {
        position: relative;
        width: 100%;
        padding: 30rpx;
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
            top: 50%;
            left: 60rpx;
            transform: translateY(-50%);
            width: 16rpx;
            height: 16rpx;
            background-color: red;
        }
        .clear-input {
            position: absolute;
            top: 50%;
            right: 160rpx;
            transform: translateY(-50%);
            width: 16rpx;
            height: 16rpx;
            background-color: red;
        }
    }
    .result-box {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        box-sizing: border-box;
        padding-top: 120rpx;
    }
    .result-list {
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        background-color: #fff;
        overflow: auto;
    }
    .result-list-empty {
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        background-color: #fff;
        overflow: auto;
    }
}
</style>
