<template>
    <view class="search-container-com" :animation="overlayAnimationData" :style="{ bottom: bottom + 'px' }">
        <view class="search-box flex-row flex-ja-center">
            <input type="text" class="search-input flex-item" placeholder="请输入搜索关键字" :value="modelValue" @input="inputChange($event)" />
            <view class="cancel" @click="clickCancel">取消</view>

            <!-- <image class="search-icon"></image> -->
                <image class="search-icon" src='/static/img/common/search.png'></image>


                <image class="clear-input" v-if="modelValue" @click="clearInput" src='/static/img/common/close1.png'></image>

            <view class="search-title">{{ modelValue ? resultTitle : defaultTitle }}</view>
        </view>
        <scroll-view scroll-y class="result-box" id="result-box" v-if="modelValue" @scroll="foodScrollHandle">
            <template v-if="searchResultList.length">
                <slot name="result"></slot>
            </template>
            <view v-else class="result-list-empty flex-col flex-ja-center">
                <CommonError></CommonError>
            </view>
        </scroll-view>
        <scroll-view scroll-y v-else class="default-box" id="default-box" @scroll="foodScrollHandle">
            <slot name="default"></slot>
        </scroll-view>
    </view>
</template>

<script lang="ts" setup>
import { ComputedI, RefI } from "@/interface/vueInterface";
import { ComputedGetterI, ComputedMutationI, ComputedStateI } from "@/interface/vuex";
import { MinusPromotionsObjectI } from "@/store/getters/menu";
import { delaySync, selectQuery } from "@/utils/";
import Shop from "@/components/Shop.vue";
import { mapGetter, mapMutation, mapState } from "@/utils/mapVuex";
import { ref, onMounted, computed, getCurrentInstance, watch } from "vue";
import { ShopItemI } from "@/interface/home";
import { searchDefaultTransitionTime } from "./config";
import useOverlayAnimation from "@/utils/useOverlayAnimation";
import { debounce, handleFoodCategoryListScroll } from "@/pages/menu/info/components/common";
interface PropsI {
    bottom?: number;
    searchResultList: any;
    defaultList: any;
    modelValue: string;
    animationTime?: number;
    resultTitle?: string;
    defaultTitle?: string;
    type?: string
}
interface EmitI {
    (e: "clickResultItem", id: number): void;
    (e: "clickCancel"): void;
    (e: "update:modelValue"): void;
}
// const foodScrollHandle = () => {
//     console.log(11111)

// };
const idPre = "img-search";
const foodScrollHandle = debounce(handleScroll, 70);
const currentInstance = getCurrentInstance();
async function handleScroll() {
    if (props.type !== 'searchFood') {
        return
    }
    const currentCollectFoodList = props.modelValue ? props.searchResultList : props.defaultList;
    const searchListBoxId = props.modelValue ? "#result-box" : "#default-box";
    const res = await selectQuery(searchListBoxId, currentInstance);
    const searchBosPositionInfo = {
        top: res.top,
        bottom: res.bottom,
    };

    const { top, bottom } = searchBosPositionInfo;
    for (let i = 0; i < currentCollectFoodList.length; i++) {
        const foodItem = currentCollectFoodList[i];
        const imgPositionInfo = await selectQuery(`#${idPre}-${foodItem.foodID}`, currentInstance);
        if ((top <= imgPositionInfo.top && imgPositionInfo.top <= bottom) || (top <= imgPositionInfo.bottom && imgPositionInfo.bottom < bottom)) {
            foodItem.currentImg = foodItem.fullImgPath;
        }
        if (imgPositionInfo.top > bottom) {
            break;
        }
    }
}

// const searchDefaultTransitionTime = 300
const props: PropsI = withDefaults(defineProps<PropsI>(), {
    bottom: 0,
    searchResultList: [],
    defaultList: [],
    modelValue: "",
    animationTime: searchDefaultTransitionTime,
    resultTitle: "搜索结果",
    defaultTitle: "推荐结果",
    type: ''
});
const emit = defineEmits<EmitI>();
const { overlayAnimationData, toStartAnimation, toEndAnimation } = useOverlayAnimation({
    duration: props.animationTime,
});
onMounted(() => {
    toStartAnimation();
    setTimeout(() => {
        handleScroll();
    }, 50);
});
function inputChange(e: any) {
    emit("update:modelValue", e.detail.value);
}
watch(
    () => props.modelValue,
    () => {
        if (props.searchResultList.length) {
            setTimeout(() => {
                handleScroll();
            }, 150);
        }
    }
);

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
            top: 35rpx;
            left: 40rpx;
            width: 50rpx;
            height: 50rpx;
            // transform: translateY(-50%);
        }
        .clear-input {
            position: absolute;
            top: 35rpx;
            right: 140rpx;
            width: 30rpx;
            height: 30rpx;
            padding: 10rpx;
            // background-color: red;
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
