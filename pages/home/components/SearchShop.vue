<template>
    <view class="search-shop-container" :animation="searchModalAnimationData" >
        <view class="top-box flex-row flex-ja-center">
            <input type="text" class="search-input flex-item" placeholder="请输入关键字" v-model="searchValue" />
            <view class="cancel" @click="clickCancel">取消</view>
            <view class="search-icon"></view>
            <view class="clear-input" @click="clearInput"></view>
        </view>
        <view v-if="searchFoodList.length" class="search-shop-list">
            <FoodItem v-for="searchFoodItem in searchFoodList" :key="searchFoodItem.foodID" class="search-shop-item" :foodItem="searchFoodItem" @clickFoodItem="toShowFoodDetail">{{ searchFoodItem.foodName }}</FoodItem>
        </view>
        <view v-else class="search-shop-list-empty flex-col flex-ja-center">
            <!-- <img src="/static" alt=""> -->
            <CommonError></CommonError>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { CategoryItemI, FoodItemI } from "@/interface/menu";
import { ComputedI, RefI } from "@/interface/vueInterface";
import { ComputedGetterI, ComputedMutationI, ComputedStateI } from "@/interface/vuex";
import { MinusPromotionsObjectI } from "@/store/getters/menu";
import { delaySync } from "@/utils/";
import { mapGetter, mapMutation, mapState } from "@/utils/mapVuex";
import { ref, onMounted, computed } from "vue";
interface StateF {
    categoryList: ComputedStateI<CategoryItemI[]>;
}
interface GetterF {
    minusPromotionsObject: ComputedGetterI<MinusPromotionsObjectI>;
}
interface MutationF {
    setSearchFoodFlag: ComputedMutationI<boolean>;
    setFoodDetailFlag: ComputedMutationI<boolean>;
    setFoodInfo: ComputedMutationI<FoodItemI>;
}
const { categoryList }: StateF = mapState(["categoryList"]);
const { minusPromotionsObject }: GetterF = mapGetter(["minusPromotionsObject"]);
const { setSearchFoodFlag, setFoodDetailFlag, setFoodInfo }: MutationF = mapMutation(["setSearchFoodFlag","setFoodDetailFlag", "setFoodInfo"]);

const searchValue: RefI<string> = ref("");
const searchFoodList: ComputedI<FoodItemI> = computed(() => {
    console.log(1111);
    if (!searchValue.value) return [];
    const searchFoodList: FoodItemI[] = [];
    categoryList.value.forEach((categoryItem) => {
        categoryItem.foodList.forEach((foodItem) => {
            if (foodItem.foodName.includes(searchValue.value)) {
                searchFoodList.push(foodItem);
            }
        });
    });
    console.log("searchFoodList");
    console.log(searchFoodList);
    return searchFoodList;
});
console.log(searchFoodList);
const searchModalAnimationData: RefI<any> = ref(null);
const searchModalAnimation = uni.createAnimation({
    duration: 1000,
    timingFunction: "linear",
});
onMounted(() => {
    showStartAnimation();
});
function showStartAnimation() {
    searchModalAnimationData.value = searchModalAnimation.opacity(1).step().export();
}
function showEndAnimation() {
    searchModalAnimationData.value = searchModalAnimation.opacity(0).step().export();
}
function clearInput() {
    searchValue.value = "";
}
function toShowFoodDetail(foodItem: FoodItemI) {
    setFoodDetailFlag(true);
    setFoodInfo(foodItem);
}

async function clickCancel() {
    showEndAnimation();
    await delaySync(1000);
    setSearchFoodFlag(false);
}
</script>

<style lang="scss">
.search-shop-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    bottom: 140rpx;
    z-index: 300;
    color: #999;
    opacity: 0;
    .search-shop-overlay {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
    }
    .top-box {
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
    .search-shop-list {
        position: absolute;
        top: 0;
        // bottom: 0;
        // max-height: 100%;
        left: 0;
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        padding-top: 120rpx;
        background-color: #fff;
        overflow: auto;
        // z-index: 5;
        .search-shop-item {
            border-bottom: 1rpx solid #eee;
            // height: 200rpx;
            // background-color: red;
        }
        .search-shop-item:last-child {
            border-bottom: none;
            margin-bottom: 30rpx;
        }
    }
    .search-shop-list-empty {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        box-sizing: border-box;
        padding-top: 120rpx;
        background-color: #fff;
        overflow: auto;
        z-index: 5;
    }
}
</style>
