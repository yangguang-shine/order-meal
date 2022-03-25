<template>
    <view class="food-add-minus-container flex-row flex-ja-center">
        <transition name="food-count-minus">
            <view class="food-count-minus" v-if="foodItem.orderCount" @click.stop="minusCount()">
                <div class="add-click-area"></div>
                <view class="reduce-icon-css" :style="{ 'background-color': $mainColor }"></view>
            </view>
        </transition>
        <transition name="food-order-count">
            <view v-if="foodItem.orderCount" class="food-order-count">{{ foodItem.orderCount || "" }}</view>
        </transition>
        <view class="food-count-add" :style="{ 'background-color': $mainColor }" @click.stop="addCount()">
            <div class="add-click-area"></div>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { delaySync } from "@/utils/index.js";
import { watch } from "vue";
import { mapMutations, mapState } from "../../../../../../utils/mapVuex";
import { FoodItemI } from "@/interface/index";
interface Props {
    foodItem: FoodItemI;
}
const {
    cartChange,
    setCartDetailFlag,
}: {
    cartChange: ({ foodItem, count }: { foodItem: FoodItemI; count: number }) => void;
    setCartDetailFlag: (flag: boolean) => void;
} = mapMutations(["cartChange", "setCartDetailFlag"]);
const { cartCategoryList, cartDetailFlag } = mapState(["cartCategoryList", "cartDetailFlag"]);
const props = withDefaults(defineProps<Props>(), {
    foodItem: {},
});
watch(
    () => props.foodItem.orderCount,
    () => {
        console.log("props.foodItem.orderCount");
    }
);
function addCount() {
    cartChange({
        foodItem: props.foodItem,
        count: props.foodItem.orderCount + 1,
    });
}

function minusCount() {
    cartChange({
        foodItem: props.foodItem,
        count: props.foodItem.orderCount - 1,
    });
    if (cartCategoryList.value.length === 0 && cartDetailFlag.value) {
        setCartDetailFlag(false);
    }
}
// addCount(foodItem) {
//     if (!this.addCountState) return;
//     this.addCountState = false;
//     foodItem.orderCount += 1;
//     this.cartCountChange(foodItem);
//     this.addCountState = true;
//     if (!this.cartCategoryList.length) this.showCartDetail = false;
// },
// minusCount(foodItem) {
//     if (!this.minusCountState) return;
//     this.minusCountState = false;
//     foodItem.orderCount -= 1;
//     this.cartCountChange(foodItem);
//     this.minusCountState = true;
//     if (!this.cartCategoryList.length) this.showCartDetail = false;
// },
</script>

<style lang="scss" scoped>
.food-add-minus-container {
    font-size: 26rpx;
    position: relative;
    min-width: 140rpx;
    height: 40rpx;
    .food-count-add {
        position: absolute;
        right: 0;
        top: 0;
        width: 40rpx;
        height: 40rpx;
        border-radius: 50%;
        // text-align: center;
        // line-height: 40rpx;
        // color: #fff;
    }

    .food-count-add::after {
        content: "";
        position: absolute;
        width: 24rpx;
        height: 4rpx;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
        border-radius: 2rpx;
    }

    .food-count-add::before {
        content: "";
        position: absolute;
        width: 4rpx;
        height: 24rpx;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
        border-radius: 2rpx;
    }

    .food-count-minus {
        position: absolute;
        top: 0;
        right: 100rpx;
        width: 40rpx;
        height: 40rpx;
        border: 1px solid;
        border-radius: 50%;
        text-align: center;
        line-height: 40rpx;
        background-color: #fff;
        box-sizing: border-box;
        // transform: translateX(-100rpx);
    }
    .food-count-minus-enter-from,
    .food-count-minus-leave-to {
        right: 0;
        transform: rotate(0);
        // transform: translateX(0) rotate(0);
    }
    .food-count-minus-enter-active,
    .food-count-minus-leave-active {
        transition: all ease-in-out 0.3s;
    }
    .food-count-minus-enter-to,
    .food-count-minus-leave-from {
        right: 100rpx;
        transform: rotate(-180deg);
        // transform: translateX(-100rpx) rotate(180deg);
    }

    // .food-count-minus-show {
    //     right: 100rpx;
    //     transform: rotate(-180deg);
    // }

    .food-order-count {
        font-size: 30rpx;
        line-height: 36rpx;
        color: #333;
        transition: all ease-in-out 0.3s;
    }
    .food-order-count-enter-from,
    .food-order-count-leave-to {
        opacity: 0;
    }
    .food-order-count-enter-to,
    .food-order-count-leave-from {
        opacity: 1;
    }

    .food-order-count-show {
        opacity: 1;
    }

    .reduce-icon-css {
        position: absolute;
        top: 50%;
        left: 50%;
        height: 4rpx;
        width: 24rpx;
        transform: translate(-50%, -50%);
        border-radius: 2rpx;
    }
    .add-click-area {
        // position: absolute;
        // width: 60rpx;
        // height: 60rpx;
        // top: -10rpx;
        // left: -10rpx;
    }
}
</style>
