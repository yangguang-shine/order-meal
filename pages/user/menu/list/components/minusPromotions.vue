<template>
    <view class="promotion-title center" :style="{'position': showShopInfo ? 'absolute' : 'fixed'}">
        <text v-for="(contentItem, index) in minusPromotionsObject.contentList" :key="index" :class="{ 'content-red': index % 2 !== 0 }">{{ contentItem }}</text>
    </view>
</template>

<script>
export default {
    props: {
        showShopInfo: {
            type: Boolean,
            default: 'false'
        },
        minusPromotionsObject: {
            type: Object,
            default: () => { }
        }
    },
    methods: {}
};
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
    z-index: 450;
    .content-red {
        color: #e23232;
    }
}
.promotion-title::before {
    content: "";
    width: 100%;
    height: 50rpx;
}
</style>
