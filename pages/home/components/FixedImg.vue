<template>
    <view class="fixed-img-container">

    </view>
</template>

<script lang="ts" setup>
import router from "@/utils/router";
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
.fixed-img-container {
    position: fixed;
    right: 0;
    bottom: 300rpx;
    
}
</style>
