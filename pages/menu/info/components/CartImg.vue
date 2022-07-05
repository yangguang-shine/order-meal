<template>
    <div class="cart-box flex-center">
        <div class="left" :style="{'color': shopInfo.mainColor}"></div>
        <div class="center" :style="{'background-color': shopInfo.mainColor}">
            <div class="fu-shou">
                <div class="left1" :style="{'background-color': shopInfo.mainColor}"></div>
                <div class="right1" :style="{'background-color': shopInfo.mainColor}"></div>
            </div>
            <div class="lun flex-row flex-j-around flex-a-center">
                <div class="lun1" :style="{'background-color': shopInfo.mainColor}"></div>
                <div class="lun1" :style="{'background-color': shopInfo.mainColor}"></div>
            </div>
        </div>
        <div class="right" :style="{'color': shopInfo.mainColor}"></div>
    </div>
</template>

<script lang="ts" setup>
import { ShopItemI } from "@/interface/home";
import { ComputedStateI } from "@/interface/vuex";
import { MenuStoreI, useMenuStore } from "@/piniaStore/menu";
import router from "@/utils/router";
import { toRefs } from "vue";

interface MenuStateF {
    shopInfo: ComputedStateI<ShopItemI>
}
const menuStore: MenuStoreI = useMenuStore()
const { shopInfo }: MenuStateF = toRefs(menuStore.menuState)
</script>

<style lang="scss" scoped>
.cart-box {
    position: relative;
    width: 120rpx;
    height: 120rpx;
    box-sizing: border-box;
    // padding: 10rpx 0 0 10rpx;
    // background-color: orange;
    // border: 4rpx solid red;
    border-radius: 50%;
    .tixing {
        // position: absolute;
        // top: 0;
        // left: 0;
        // width: 100rpx;
        // height: 50rpx;
        // border: 60rpx solid;
    }
    .left,
    .right {
        height: 50rpx;
        width: 10rpx;
    }
    .center {
        position: relative;
        width: 50rpx;
        height: 40rpx;
        // background-color: red;
    }
    .left {
        width: 0;
        height: 0;
        border-top: 20rpx solid ;
        border-bottom: 20rpx solid transparent;
        border-left: 6rpx solid transparent;
        border-right: 6rpx solid ;
    }
    .right {
        width: 0;
        height: 0;
        border-top: 20rpx solid;
        border-bottom: 20rpx solid transparent;
        border-left: 6rpx solid ;
        border-right: 6rpx solid transparent;
    }
    .a1 {
        position: absolute;
        top: -30rpx;
        left: 0;
        width: 8rpx;
        height: 40rpx;
        // background-color: blue;
        transform: rotate(-20deg);
    }
    .top {
        position: relative;
        width: 100rpx;
        height: 100rpx;
        background-color: rgb(211, 190, 190);
        border: 4rpx solid rgb(42, 206, 83);
    }
    .fu-shou {
        position: absolute;
        top: -25rpx;
        left: -30rpx;
        width: 40rpx;
        height: 40rpx;
    }
    .left1 {
        position: absolute;
        right: 0;
        top: 0;
        width: 35rpx;
        height: 6rpx;
        // background-color: red;
    }
    .right1 {
        position: absolute;
        right: 0;
        top: 0;
        height: 30rpx;
        width: 6rpx;
        // background-color: red;
        // transform-origin: 8rpx 0;
        transform-origin: top right;
        transform: rotate(-10deg);
    }
    .lun {
        position: absolute;
        left: 0;
        bottom: -20rpx;
        width: 50rpx;
        height: 20rpx;
    }
    .lun1 {
        width: 16rpx;
        height: 16rpx;
        border-radius: 50%;
        // background-color: red;
    }
}
</style>
