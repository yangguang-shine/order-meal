<template>
    <view class="recommand-info-container">
        <view class="recommand-title flex-row flex-ja-center">推荐外卖商家</view>
        <TabList></TabList>
        <ShopList></ShopList>
    </view>
</template>

<script lang="ts" setup>

import TabList from './TabList.vue';
import ShopList from './ShopList.vue';

</script>

<style lang="scss" scoped>
.recommand-info-container {
    margin: 20rpx 20rpx 0;
    padding-bottom: 20rpx;
    background-color: #fff;
    border-top-left-radius: 12rpx;
    border-top-right-radius: 12rpx;
    .recommand-title {
        padding-top: 20rpx;
        position: relative;
        height: 72rpx;
        width: 100%;
        color: #000;
        font-size: 30rpx;
        // margin-bottom: 10rpx;
    }
    .recommand-title::before {
        content: "";
        height: 2rpx;
        width: 40rpx;
        background-color: #999;
        margin-right: 26rpx;
    }
    .recommand-title::after {
        content: "";
        height: 2rpx;
        width: 40rpx;
        background-color: #999;
        margin-left: 26rpx;
    }
}
</style>
