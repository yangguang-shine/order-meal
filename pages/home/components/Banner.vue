<template>
    <view class="banner-container">
        <swiper class="swiper-box"  autoplay interval="200000" circular>
            <swiper-item v-for="(swiperItem, index) in swiperList" :key="index" class="flex-row flex-ja-center" @click="clickSwiperItem(swiperItem)">
                <image class="swiper-item-img" :src="swiperItem.fullImgPath"></image>
                <!-- <view class="swiper-item uni-bg-red">{{ swiperItem.title }}</view> -->
            </swiper-item>
        </swiper>
    </view>
</template>

<script lang="ts" setup>
import { commonImgPath } from "@/config/";
import router from "@/utils/router";
import { reactive } from "vue";

interface SwiperItemI {
    fullImgPath: string;
    title: string;
    name: string;
    businessType: number;
}
// const imgList = ["578808989505515.jpeg", "578809020287334.jpeg", "578809225709769.jpeg", "578809268289436.jpeg", "578809315094131.jpeg"];
// const swiperList = imgList.map((url) => {
//     return {
//         fullImgPath: `${commonImgPath}/${url}`,
//     }
// })
const swiperList: SwiperItemI[] = reactive([
    {
        fullImgPath: `${commonImgPath}/578809225709769.jpeg`,

        title: "堂食",
        name: "shop",
        businessType: 1,
    },
    {
        fullImgPath: `${commonImgPath}/578809315094131.jpeg`,
        title: "外卖",
        name: "shop",
        businessType: 2,
    },
    {
        fullImgPath: `${commonImgPath}/578809268289436.jpeg`,

        title: "自提",
        name: "shop",
        businessType: 3,
    },
] as SwiperItemI[]);
function clickSwiperItem(swiperItem: SwiperItemI) {
    router.navigateTo({
        name: swiperItem.name,
        query: {
            businessType: swiperItem.businessType,
        },
    });
}
</script>

<style lang="scss" scoped>
.banner-container {
    position: relative;
    // height: 200rpx;
    // background-color: red;
    margin: 20rpx 20rpx 0;
        padding: 20rpx;
        background-color: #fff;

    .swiper-box {
        height: 206rpx;
        box-sizing: border-box;
        background-color: #fff;
        border-radius: 16rpx;
    }
    .swiper-item-img {
        width: 658rpx;
        height: 206rpx;
        border-radius: 12rpx;

    }
}
</style>
