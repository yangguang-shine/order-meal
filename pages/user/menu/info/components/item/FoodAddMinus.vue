<template>
    <view class="food-add-minus-container flex-row flex-ja-center">
        <view class="food-count-minus" :class="showAddAnimate ? 'food-count-minus-show' : ''" :style="{ color: $mainColor, 'transition': addAnimationFlag ? 'all ease-in-out .3s' : ''}" @click.stop="minusCount()">
            <div class="add-click-area"></div>
            <view class="reduce-icon-css" :style="{ 'background-color': $mainColor }"></view>
        </view>
        <view :class="showAddAnimate ? 'food-order-count-show' : ''" class="food-order-count">{{ foodItem.orderCount || ''}}</view>
        <view class="food-count-add" :style="{ 'background-color': $mainColor }" @click.stop="addCount()">
            <div class="add-click-area"></div>
        </view>
    </view>
</template>


<script lang="ts" setup>
import { delaySync } from "@/utils/index.js";
import { watch } from 'vue'
const showAddAnimate = false
const addAnimationFlag = false
interface Props {
    foodItem: any;
}
const props = withDefaults(defineProps<Props>(), {
    foodItem: () => ({})
});
watch(() => props.foodItem.orderCount,() => {
	console.log('props.foodItem.orderCount')
})
function addCount() {
	console.log('addCount')
}

function minusCount() {
	console.log('minusCount')
}
        // addCount(foodItem) {
        //     if (!this.addCountState) return;
        //     this.addCountState = false;
        //     foodItem.orderCount += 1;
        //     this.cartCountChange(foodItem);
        //     this.addCountState = true;
        //     if (!this.cartFoodList.length) this.showCartDetail = false;
        // },
        // minusCount(foodItem) {
        //     if (!this.minusCountState) return;
        //     this.minusCountState = false;
        //     foodItem.orderCount -= 1;
        //     this.cartCountChange(foodItem);
        //     this.minusCountState = true;
        //     if (!this.cartFoodList.length) this.showCartDetail = false;
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
        // transition: all ease-in-out .3s;
    }
    .food-count-minus-show {
        right: 100rpx;
        transform: rotate(-180deg);
    }

    .food-order-count {
        font-size: 30rpx;
        line-height: 36rpx;
        color: #333;
        opacity: 0;
        transition: all ease-in-out 0.3s;
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
        position: absolute;
        width: 80rpx;
        height: 80rpx;
        top: -20rpx;
        left: -20rpx;
    }
}
</style>
