<template>
    <view class="tools-list-container flex-row flex-wrap">
        <view class="tool-item flex-col flex-a-center" v-for="(toolItem, index) in toolsList" :key="index" @click="toToolDetail(toolItem)">
            <image class="tool-icon" :src="toolItem.icon"></image>
            <view class="tool-title line1 text-center">
                {{ toolItem.title }}
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { commonImgPath } from "@/config/";
import router from "@/utils/router";
import { reactive } from "vue";
interface ToolItemI {
    icon: string;
    title: string;
    name?: string;
    businessType?: number;
}
const toolsList: ToolItemI[] = reactive([
    {
        icon: `${commonImgPath}/tang-shi.png`,
        title: "堂食",
        name: "shop",
        businessType: 1,
    },
    {
        icon: `${commonImgPath}/wai-mai.png`,

        title: "外卖",
        name: "shop",
        businessType: 2,
    },
    {
        icon: `${commonImgPath}/zi-ti.png`,
        title: "自提",
        name: "shop",
        businessType: 3,
    },
    {
        icon: `${commonImgPath}/order.png`,
        title: "订单",
        name: "order/list",
        businessType: 0,
    },
] as ToolItemI[]);

function toToolDetail(toolItem: ToolItemI) {
    if (toolItem.name && toolItem.businessType) {
        router.navigateTo({
            name: toolItem.name,
            query: {
                businessType: toolItem.businessType,
            },
        });
    } else if (toolItem.name === 'order/list') {
        router.switchTabTo({
            name: toolItem.name
        })
    }
}
</script>

<style lang="scss" scoped>
.tools-list-container {
    // width: 100%;
    width: 710rpx;
    margin: 20rpx auto 0;
    background-color: #fff;
    border-radius: 12rpx;
    padding-bottom: 40rpx;
    font-size: 28rpx;
    line-height: 1.2;
    .tool-item {
        padding-top: 40rpx;
        width: 177rpx;
        color: #666666;
        font-size: 28rpx;
    }
    .tool-icon {
        width: 90rpx;
        height: 90rpx;
        // background-color: red;
    }
    .tool-title {
        padding-top: 12rpx;
        width: 100%;
    }
}
</style>
