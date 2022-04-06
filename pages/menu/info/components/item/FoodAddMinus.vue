<template>
    <view class="food-add-minus-container flex-row flex-ja-center">
        <!-- <MyTransition name="food-count-minus" :flag="!!foodItem.orderCount" :time="500" v-slot="slotProps">
            <view class="food-count-minus" :class="slotProps.addClass" @click.stop="minusCount()">
                <view class="add-click-area"></view>
                <view class="reduce-icon-css" :style="{ 'background-color': $mainColor }"></view>
            </view>
        </MyTransition> -->
        <view :animation="minusAnimationData" class="food-count-minus" :class="showInfoFlag ? 'show-food-count-minus' : ''" @click.stop="minusCount()">
            <view class="add-click-area"></view>
            <view class="reduce-icon-css" :style="{ 'background-color': $mainColor }"></view>
        </view>
        <view v-if="foodItem.orderCount" :class="showInfoFlag ? 'show-food-order-count' : ''" :animation="countAnimationData" class="food-order-count">{{ foodItem.orderCount }}</view>

        <!-- <MyTransition name="food-order-count" :flag="!!foodItem.orderCount" :time="transitionTime" v-slot="slotProps">
            <view class="food-order-count" :class="slotProps.addClass">{{ foodItem.orderCount || "" }}</view>
        </MyTransition> -->
        <view class="food-count-add" :style="{ 'background-color': $mainColor }" @click.stop="addCount()">
            <view class="add-click-area"></view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { delaySync } from "@/utils/index";
import { watch, reactive, ref } from "vue";
import { mapMutation, mapState } from "@/utils/mapVuex";
import MyTransition from "@/components/MyTransition.vue";
import { onShow, onLoad, onPageScroll } from "@dcloudio/uni-app";

import { CategoryItemI, ComputedMutationI, ComputedStateI, FoodItemI } from "@/interface/index";
import { RefI } from "@/interface/vueInterface";
interface PropsI {
    foodItem: FoodItemI;
}
interface CartChangeParamI {
    foodItem: FoodItemI;
    count: number;
}
const transitionTime = 300;
const OriginFoodItem = props.foodItem
const showInfoFlag: RefI<boolean> = ref(false);
const countAnimation = uni.createAnimation({
    duration: transitionTime,
    timingFunction: "ease-in-out",
});

const minusAnimation = uni.createAnimation({
    duration: transitionTime,
    timingFunction: "ease-in-out",
});

const countAnimationData = ref(null);
const minusAnimationData = ref(null);

interface StateF {
    cartCategoryList: ComputedStateI<CategoryItemI[]>;
    cartDetailFlag: ComputedStateI<boolean>;
}
interface MutationF {
    cartChange: ComputedMutationI<CartChangeParamI>;
    setCartDetailFlag: ComputedMutationI<boolean>;
}
const { cartChange, setCartDetailFlag }: MutationF = mapMutation(["cartChange", "setCartDetailFlag"]);
const { cartCategoryList, cartDetailFlag }: StateF = mapState(["cartCategoryList", "cartDetailFlag"]);
const props: PropsI = withDefaults(defineProps<PropsI>(), {
    foodItem: {},
});
onLoad(() => {
    if (props.foodItem.orderCount > 0) {
        showInfoFlag.value = true;
        // countAnimation.opacity(1).step();
        // countAnimationData.value = countAnimation.export();
        // minusAnimation.right("100rpx").rotate(-180).step();
        // minusAnimationData.value = minusAnimation.export();
        // console.log(minusAnimationData.value);
    }
}),
    watch(
        () => props.foodItem.orderCount,
        (newValue: number, oldValue: number) => {
            console.log(OriginFoodItem === props.foodItem)
            console.log(newValue, oldValue);
            if (newValue === 1 && oldValue === 0) {
                countAnimation.opacity(1).step();
                countAnimationData.value = countAnimation.export();
                minusAnimation.right("100rpx").rotate(-180).step();
                minusAnimationData.value = minusAnimation.export();
                console.log(minusAnimationData.value);
            } else if (newValue === 0 && oldValue === 1) {
                countAnimation.opacity(0).step();
                countAnimationData.value = countAnimation.export();
                minusAnimation.right(0).rotate(0).step();
                minusAnimationData.value = minusAnimation.export();
                console.log(minusAnimationData.value);
            }
        }
    );
function addCount() {
    // if (!canAddFlag) return;
    const count = props.foodItem.orderCount + 1;
    cartChange({
        foodItem: props.foodItem,
        count,
    });
    console.log("addCount");
}

async function minusCount() {
    if (!props.foodItem.orderCount) return;
    console.log("minusCount");
    const count = props.foodItem.orderCount - 1;
    cartChange({
        foodItem: props.foodItem,
        count,
    });
    if (cartCategoryList.value.length === 0 && cartDetailFlag.value) {
        setCartDetailFlag(false);
    }
    // console.log(count);
    // if (count === 0) {
    //     console.log("fffffff");
    //     canAddFlag = false;
    //     await delaySync(transitionTime);
    //     canAddFlag = true;
    // }
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
        right: 0;
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
    .show-food-count-minus {
        right: 100rpx;
        transform: rotate(0);
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
        opacity: 0;
    }
    .show-food-order-count {
        opacity: 1;
    }
    .food-order-count-enter-from,
    .food-order-count-leave-to {
        opacity: 0;
    }
    .food-order-count-enter-active,
    .food-order-count-leave-active {
        // transition: all ease-in-out 3s;
        transition: all ease-in-out 1s;
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
