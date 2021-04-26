<template>
    <view class="com-top-bar-container">
        <view class="top-bar-list flex-row ">
            <view class="top-bar-item flex-item flex-row flex-ja-center" :class="{ 'select-top-item': selectTopBarItem === '点餐' }" @click="changeTopBar('点餐')">点餐</view>
            <view class="top-bar-item flex-item flex-row flex-ja-center" :class="{ 'select-top-item': selectTopBarItem === '商家' }" @click="changeTopBar('商家')">商家</view>
            <div class="select-top-bar-bottom" :style="{ background: $mainColor, left: selectTopBarItem === '点餐' ? '25%' : '75%' }"></div>
        </view>
    </view>
</template>

<script>
export default {
    props: {
        selectTopBarItem: {
            type: String,
            default: '点餐'
        }
    },
    methods: {
        changeTopBar(title) {
            this.$emit('changeTopBar', title)
        }
    }
};
</script>

<style lang="scss" scoped>
.com-top-bar-container {
    // position: relative;
    width: 100%;
    height: 80rpx;
    // background-color: #ffffff;
    // z-index: 200;
    .top-bar-list {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 80rpx;
        box-sizing: border-box;
        border-bottom: 1rpx solid #e4e4e4;
        background-color: #ffffff;
    z-index: 200;

    }
    .top-bar-item {
        font-size: 32rpx;
    }
    .select-top-item {
        font-weight: bold;
    }
    .select-top-bar-bottom {
        position: absolute;
        left: 25%;
        transform: translate(-50%, 0);
        transition: all ease-in-out 0.3s;
        bottom: 0;
        width: 40rpx;
        height: 4rpx;
    }
}
</style>
