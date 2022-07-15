<template>
    <view class="food-specification-container flex-row flex-ja-center" @click.stop="closeFoodSpecification" @touchmove.stop.prevent>
        <view :animation="overlayAnimationData" class="food-specification-overlay"></view>
        <view :animation="detailAnimationData" class="food-specification-box" @click.stop>
            <!-- <view class="food-img"></view> -->
            <view class="food-name flex-center">{{ foodSpecificationInfo.foodName }}</view>
            <scroll-view scroll-y class="food-specification-list-scroll">
                <view class="food-specification-list">
                    <view v-for="(specificationItem, index) in foodSpecificationInfo.specificationList" :key="index" class="food-specification-item">
                        <view class="specification-name">{{ specificationItem.name }}:</view>
                        <view class="food-specification-detail-list flex-row flex-wrap">
                            <view v-for="(specificationDetailItem, specificationIndex) in specificationItem.categoryList" :key="specificationIndex" class="food-specification-detail flex-row flex-a-center" :style="{ color: specificationIndex === foodSpecificationInfo.specificationSlectedIndexList[index] ? $mainColor : '', border: specificationIndex === foodSpecificationInfo.specificationSlectedIndexList[index] ? '1px solid ' + $mainColor : '' }" @click="change(index, specificationIndex)">
                                <view class="food-specification-content flex-center line1"> {{ specificationDetailItem.content }}</view>
                                <view v-if="specificationDetailItem.price > 0" class="food-specification-price flex-center" :style="{ 'border-left': specificationIndex === foodSpecificationInfo.specificationSlectedIndexList[index] ? '1px solid ' + $mainColor : '' }"> ¥{{ specificationDetailItem.price }}</view>
                            </view>
                        </view>
                    </view>
                </view>
            </scroll-view>
            <div class="select-specification"><span>已选规格：</span>{{ selectSpecificationText }}</div>
            <!-- <image class="food-img" :src="foodSpecificationInfo.fullImgPath" alt=""></image> -->
            <view class="food-info">
                <view v-if="foodSpecificationInfo.description" class="food-description">{{ foodSpecificationInfo.description }}</view>
                <view class="food-price-order flex-row flex-j-between">
                    <div class="flex-row flex-a-end">
                        <div class="food-price">¥{{foodaAddspecificaPrice}}</div>
                        <div v-if="foodSpecificationInfo.unit" class="food-unit">/{{ foodSpecificationInfo.unit }}</div>
                    </div>
                    <FoodAddMinusItemSpecificaTion :foodItem="foodSpecificationInfo" type="foodSpecification"></FoodAddMinusItemSpecificaTion>
                </view>
            </view>
            <image class="close-img" src="/static/img/user-menu/close-food-detail.png" mode="" @click.stop="closeFoodSpecification"></image>
        </view>
    </view>
</template>

<script lang="ts" setup>
import FoodAddMinusItemSpecificaTion from "./item/FoodAddMinusItemSpecificaTion.vue";
import { delaySync } from "@/utils/index";
import { mapState, mapMutation } from "@/utils/mapVuex";
import { ComputedMutationI, ComputedStateI } from "@/interface/vuex";
import { FoodItemI, initFoodItem } from "@/interface/menu";
import { foodDetailTransitionTime } from "../infoConfig";
import { getCurrentInstance, computed, onMounted, ref, toRefs, onBeforeUnmount } from "vue";
import { MenuStoreI, useMenuStore } from "@/piniaStore/menu";
import { RefI } from "@/interface/vueInterface";
import { onShow, onLoad, onPageScroll, onUnload, onHide, onReady } from "@dcloudio/uni-app";

interface MenuStateF {
    foodSpecificationInfo: ComputedStateI<FoodItemI>;
}
interface MutationF {
    setFoodSpecificationFlag: ComputedMutationI<boolean>;
    setFoodInfo: ComputedMutationI<FoodItemI>;
}
// store
const menuStore: MenuStoreI = useMenuStore();
// state
const { foodSpecificationInfo }: MenuStateF = toRefs(menuStore.menuState);
// action
const { setFoodSpecificationFlag, setFoodSpecificationInfo } = menuStore;
const overlayAnimationData = ref(null);
const detailAnimationData = ref(null);
const overlayAnimation = uni.createAnimation({
    duration: foodDetailTransitionTime,
    timingFunction: "ease-in-out",
});
const foodaAddspecificaPrice = computed(() => {
    return foodSpecificationInfo.value.specificationSlectedIndexList.reduce((price, item, index) => {
        price += foodSpecificationInfo.value.specificationList[index].categoryList[item].price;
        return price
    }, foodSpecificationInfo.value.price);
});

const detailAnimation = uni.createAnimation({
    duration: foodDetailTransitionTime,
    timingFunction: "ease-in-out",
});
const selectSpecificationText = computed(() => {
    return foodSpecificationInfo.value.specificationSlectedIndexList.reduce((str, value, index) => {
        const specification: string = foodSpecificationInfo.value.specificationList[index].categoryList[value].content;
        if (str) {
            str = `${str}、${specification}`;
        } else {
            str = specification;
        }
        return str;
    }, "");
});

onMounted(() => {
    toStartAnimation();
    initSpecificationSlectedIndexList();
});
onLoad(() => {
    console.log("onLoad");
    // initSpecificationSlectedIndexList();
});

function initSpecificationSlectedIndexList() {
    const orderSpecifaListLength = foodSpecificationInfo.value.orderSpecifaList.length;
    if (orderSpecifaListLength) {
        foodSpecificationInfo.value.specificationSlectedIndexList = foodSpecificationInfo.value.orderSpecifaList[orderSpecifaListLength - 1].specifa.map((item) => item.index);
    } else {
        foodSpecificationInfo.value.specificationSlectedIndexList = foodSpecificationInfo.value.specificationList.map(() => {
            return 0;
        });
    }
}
function toStartAnimation() {
    overlayAnimation.opacity(1).step();
    overlayAnimationData.value = overlayAnimation.export();
    detailAnimation.scale(1).step();
    detailAnimationData.value = detailAnimation.export();
}
function toEndAnimation() {
    overlayAnimation.opacity(0).step();
    overlayAnimationData.value = overlayAnimation.export();
    detailAnimation.scale(0).step();
    detailAnimationData.value = detailAnimation.export();
}

async function closeFoodSpecification() {
    toEndAnimation();
    await delaySync(foodDetailTransitionTime);
    setFoodSpecificationFlag(false);
    initSpecificationSlectedIndexList();
    setFoodSpecificationInfo(initFoodItem);
}
function change(index: number, specificationIndex: number) {
    foodSpecificationInfo.value.specificationSlectedIndexList[index] = specificationIndex;
}
</script>

<style lang="scss" scoped>
.food-specification-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    // -webkit-backdrop-filter: blur(20px) brightness(100%);
    // backdrop-filter: blur(20px) brightness(100%);
    // background-color: rgba(0, 0, 0, 0.5);
    z-index: 1100;
    .food-specification-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        // -webkit-backdrop-filter: blur(20px) brightness(100%);
        // backdrop-filter: blur(20px) brightness(100%);
        background-color: rgba(0, 0, 0, 0.5);
        opacity: 0;
    }
    .food-specification-box {
        position: relative;
        width: 600rpx;
        margin-bottom: 140rpx;
        transform: scale(0);
        background-color: #fff;
        border-radius: 16rpx;
    }
    .food-name {
        padding: 30rpx;
        font-weight: bold;
        font-size: 32rpx;
        line-height: 36rpx;
        color: #333333;
        border-bottom: 1rpx solid #eee;
    }
    .food-specification-list-scroll {
        min-height: 300rpx;
        max-height: 600rpx;
        padding: 0 30rpx;
        box-sizing: border-box;
    }
    .specification-name {
        padding-top: 30rpx;
        color: #666;
    }
    .food-specification-detail {
        margin-top: 20rpx;
        margin-right: 20rpx;
        border-radius: 8rpx;
        border: 1px solid #ccc;
    }
    .food-specification-item:last-child {
        padding-bottom: 30rpx;
    }
    .food-specification-content,
    .food-specification-price {
        padding: 0 20rpx;
        font-size: 26rpx;
        height: 60rpx;
    }

    .food-specification-price {
        border-left: 1px solid #ccc;
    }
    .food-specification-content {
        min-width: 150rpx;
        max-width: 300rpx;
        box-sizing: border-box;
    }
    .select-specification {
        padding: 30rpx;
        font-size: 24rpx;
        background-color: #f5f5f5;
    }

    .food-info {
        padding: 20rpx 34rpx 0;
        border-bottom-left-radius: 16rpx;
        border-bottom-right-radius: 16rpx;
    }

    .food-description {
        padding-top: 20rpx;
        font-size: 22rpx;
        color: #666;
        line-height: 30rpx;
    }
    .food-price-order {
        padding-top: 20rpx;
        padding-bottom: 40rpx;
        color: #fb4e44;
        font-size: 48rpx;
        vertical-align: top;
        line-height: 56rpx;
        // color: #ff4b33;

        // background-color: #fafafa;
    }
    .food-unit {
        color: #999;
        font-size: 24rpx;
        line-height: 28rpx;
        padding-bottom: 8rpx;
    }
    .close-img {
        position: absolute;
        left: 50%;
        bottom: -120rpx;
        transform: translateX(-50%);
        width: 80rpx;
        height: 80rpx;
        // z-index: 900;
    }
}
</style>
