<template>
    <view class="banner-container">
        <swiper class="swiper-box" indicator-dots autoplay interval="2000" circular>
            <swiper-item v-for="(swiperItem, index) in swiperList" :key="index" class="flex-row flex-ja-center" @click="clickSwiperItem(swiperItem)">
                <view class="swiper-item uni-bg-red ">{{swiperItem.title}}</view>
            </swiper-item>
        </swiper>
    </view>
</template>

<script lang="ts" setup>
import { reactive } from "vue";

interface SwiperItemI {
    img: string;
    title: string;
    name: string;
    businessType: number;
}
const swiperList: SwiperItemI[] = reactive([
    {
        img: "",
        title: "堂食",
        name: "shop",
        businessType: 1,
    },
    {
        img: "",
        title: "外卖",
        name: "shop",
        businessType: 2,
    },
    {
        img: "",
        title: "自提",
        name: "shop",
        businessType: 3,
    },
] as SwiperItemI[]);
function clickSwiperItem(swiperItem: SwiperItemI) {
    router.navigateTo({
        name: swiperItem.name,
        query: {
            businessType:swiperItem.businessType
        }
    })
}
</script>

<style lang="scss" scoped>
.banner-container {
    position: relative;
    height: 200rpx;
    // background-color: red;
    margin: 20rpx 20rpx 0;
    .swiper-box {
        height: 200rpx;
        width: 100%;
        box-sizing: border-box;
        padding: 20rpx;
        background-color: #fff;
        border-radius: 16rpx;
    }
}
</style>
