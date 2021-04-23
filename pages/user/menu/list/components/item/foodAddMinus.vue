<template>
    <view class="food-add-minus-container flex-row flex-a-center">
        <view v-if="foodItem.orderCount < 1" class="food-count-add" :style="{ 'background-color': $mainColor }" @click.stop="addCount()">
            <div class="add-click-area"></div>
        </view>
        <view v-else class="flex-row flex-a-center">
            <view class="food-count-minus" :style="{ color: $mainColor }" @click.stop="minusCount()">
                <view class="reduce-icon-css" :style="{ 'background-color': $mainColor }"></view>
                <div class="add-click-area"></div>

            </view>
            <view class="food-order-count">{{ foodItem.orderCount }}</view>
            <view class="food-count-add" :style="{ 'background-color': $mainColor }" @click.stop="addCount()">
                <div class="add-click-area"></div>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    props: {
        foodItem: {
            type: Object,
            default: () => { }
        }
    },
    methods: {
        addCount() {
            this.$emit('addCount', this.foodItem)
        },
        minusCount() {
            this.$emit('minusCount', this.foodItem)
        },
    }

}
</script>

<style lang="scss" scoped>
.food-add-minus-container {
    font-size: 26rpx;
    .food-count-minus {
        position: relative;
        width: 40rpx;
        height: 40rpx;
        border: 1px solid;
        border-radius: 50%;
        text-align: center;
        line-height: 40rpx;
        background-color: #fff;
        box-sizing: border-box;
    }

    .food-order-count {
        width: 60rpx;
        text-align: center;
        font-size: 30rpx;
        line-height: 36rpx;
        color: #333;
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

    .food-count-add {
        position: relative;
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

    .add-icon-css {
        position: relative;
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