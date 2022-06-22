<template>
    <view class="fixed-img-container" @click="clickImg">

    </view>
</template>

<script lang="ts" setup>
import router from "@/utils/router";
import { reactive } from "vue";

function clickImg() {
    console.log('clickImg')
}
</script>

<style lang="scss" scoped>
.fixed-img-container {
    position: fixed;
    width: 50rpx;
    height: 50rpx;
    right: 50rpx;
    bottom: 300rpx;
    background-color: red;
    // z-index: 300;
    
}
</style>
