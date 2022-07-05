<template>
    <view :animation="shopInfoAnimationData" class="shop-info-container">

        <!-- 		address: "西直门凯德茂地铁站"
		businessTypes: "2,3"
		endTime: "18:00"
		imgUrl: ""
		manageID: 100000020
		minus: "13-1,24-2,43-4"
		minusList: Array(3)
		shopID: 100020
		shopName: "汉堡"
		startTime: "09:00" -->
        <view class="shop-title">商家信息</view>
        <view class="shop-description">
            {{shopInfo.description}}
        </view>
        <view class="shop-item flex-row flex-a-center flex-j-between">
            <view class="item-left flex-row flex-a-center">
                <image class="item-icon" src="/static/img/shop/eglass-shop.png" mode=""></image>
                <view class="item-title">商家名称</view>
            </view>
            <view class="item-right">{{shopInfo.shopName}}</view>
        </view>
        <view class="shop-item flex-row flex-a-center flex-j-between">
            <view class="item-left flex-row flex-a-center">
                <image class="item-icon" src="/static/img/shop/shop-open-icon.png" mode=""></image>
                <view class="item-title">营业时间</view>
            </view>
            <view class="item-right">{{shopInfo.startTime}}-{{shopInfo.endTime}}</view>
        </view>
        <view class="shop-item flex-row flex-a-center flex-j-between">
            <view class="item-left flex-row flex-a-center">
                <image class="item-icon" src="/static/img/shop/shop-address-icon.png" mode=""></image>
                <view class="item-title">商家地址</view>
            </view>
            <view class="item-right">{{shopInfo.address}}</view>
        </view>
        <view v-if="shopInfo.minusList" class="shop-item flex-row flex-a-center flex-j-between">
            <view class="item-left flex-row flex-a-center">
                <image class="item-icon" src="/static/img/shop/shop-minus-icon.png" mode=""></image>
                <view class="item-title">商家满减</view>
            </view>
            <MinusList :minusList="shopInfo.minusList.length > 6 ? shopInfo.minusList.slice(0, 6) : shopInfo.minusList" :mainColor="shopInfo.mainColor"></MinusList>
            <!-- <view class="item-right">洁柔</view> -->
        </view>
    </view>
</template>

<script lang='ts' setup>
import MinusList from "@/components/MinusList.vue";
import { ShopItemI } from "@/interface/home";
import { ComputedStateI } from "@/interface/vuex";
import { mapState } from "@/utils/mapVuex";
import { defineComponent, getCurrentInstance, computed, watch, ref, toRefs } from "vue";
import { shopInfoTransitionTime } from "../infoConfig";
import { MenuStoreI, useMenuStore } from "@/piniaStore/menu";

interface MenuStateF {
    shopInfo: ComputedStateI<ShopItemI>,
    startShopInfoAnimationFlag: ComputedStateI<boolean>,
}
// store
const menuStore: MenuStoreI = useMenuStore();
// state
const { shopInfo, startShopInfoAnimationFlag }: MenuStateF = toRefs(menuStore.menuState)

const shopInfoAnimationData = ref(null);
const shopInfoAnimation = uni.createAnimation({
    duration: shopInfoTransitionTime,
    timingFunction: "ease-in-out",
});
function toStartAnimation() {
    shopInfoAnimation.left(0).step();
    shopInfoAnimationData.value = shopInfoAnimation.export();
}
function toEndAnimation() {
    shopInfoAnimation.left('750rpx').step();
    shopInfoAnimationData.value = shopInfoAnimation.export();
}

watch(startShopInfoAnimationFlag, (newValue: boolean, oldValue: boolean) => {
    if (newValue) {
        toStartAnimation();
    } else {
        toEndAnimation();
    }
});
</script>

<style lang="scss" scoped>
.shop-info-container {
    position: absolute;
    top: 0;
    left: 750rpx;
    width: 100%;
    height: 100%;
    padding-top: 80rpx;
    padding: 80rpx 30rpx;
    box-sizing: border-box;
    transition: all ease-in-out 0.3s;
    font-size: 28rpx;
    color: #333333;
    background-color: #fff;
    .shop-title {
        font-size: 34rpx;
        color: #333;
        font-weight: bold;
        padding-top: 50rpx;
    }
    .shop-description {
        font-size: 28rpx;
        padding: 30rpx 0;
        color: #999999;
        border-bottom: 1rpx solid #e4e4e4;
    }
    .shop-item {
        padding: 30rpx 0;
        font-size: 28rpx;
        border-bottom: 1rpx solid #e4e4e4;
    }
    .item-icon {
        width: 32rpx;
        height: 32rpx;
        // background-color: red;
        margin-right: 20rpx;
    }
    .item-title {
        font-weight: bold;
    }
    .item-right {
        color: #999;
    }
    // .shop-item:last-of-type {
    // 	border-bottom: none;
    // }
}

// .hide-shop-info-container {
// 	left: 750rpx;
// }
</style>
