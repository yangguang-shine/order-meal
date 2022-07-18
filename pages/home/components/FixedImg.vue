<template>
    <image class="fixed-img-container" @click.stop="clickImg" src="/static/img/home/fixed-img.gif"></image>
</template>

<script lang="ts" setup>
import { showToast } from "@/utils/";
import router from "@/utils/router";
import { reactive } from "vue";


function clickImg() {
    console.log("clickImg");
    showToast({
        title: '暂未设置跳转'
    })
}
</script>

<style lang="scss" scoped>
.fixed-img-container {
    position: fixed;
    width: 100rpx;
    height: 100rpx;
    right: 30rpx;
    bottom: 300rpx;
    // background-color: red;
    // z-index: 300;
}
</style>
