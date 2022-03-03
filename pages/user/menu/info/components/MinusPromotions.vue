<template>
    <view class="promotion-title flex-row flex-ja-center" :style="{'position': shopInfoFlag ? 'absolute' : 'fixed'}">
        <text v-for="(contentItem, index) in minusPromotionsObject.contentList" :key="index" :class="{ 'content-red': index % 2 !== 0 }">{{ contentItem }}</text>
    </view>
</template>

<script lang='ts' setup>
import { mapGetters, mapState } from '../../../../../utils/mapVuex';
const {minusPromotionsObject } = mapGetters('user', ['minusPromotionsObject'])
const { shopInfoFlag } = mapState('user', ['shopInfoFlag'])
</script>

<style lang="scss">
.promotion-title {
    position: fixed;
    bottom: 140rpx;
    left: 0;
    width: 100%;
    height: 50rpx;
    background-color: #fff1d0;
    line-height: 50rpx;
    font-size: 22rpx;
    color: #333;
    z-index: 500;
    .content-red {
        color: #e23232;
    }
}
// .promotion-title::before {
//     content: "";
//     width: 100%;
//     height: 50rpx;
// }
</style>
