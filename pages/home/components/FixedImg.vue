<template>
    <view class="fixed-img-container" :animation="mainAnimationData" :style="{'bottom': fixedImgBottom + 'px'}">
        <image class="fixed-img" @click.stop="clickImg" src="/static/img/home/fixed-img.gif"></image>
    </view>
</template>

<script lang="ts" setup>
import { HomeStoreI, useHomeStore } from "@/piniaStore/home";
import { showToast } from "@/utils/";
import router from "@/utils/router";
import useOverlayAnimation from "@/utils/useOverlayAnimation";
import { reactive, watch } from "vue";
import { fixedImgBottom } from "../homeConfig";
// import { HomeStoreI, useHomeStore } from "../../../delete/piniaStore-copy";

const homeStore: HomeStoreI = useHomeStore();
function clickImg() {
    console.log("clickImg");
    router.navigateTo({
        name: "explain",
    });
}
const { mainAnimationData, toStartAnimation, toEndAnimation } = useOverlayAnimation({
    type: "fixedImg",
});
watch(
    () => homeStore.homeState.fixedImgOpacityFlag,
    (newValue: boolean, oldValue: boolean) => {
        console.log("fixedImgOpacityFlag");
        console.log(homeStore.homeState.fixedImgOpacityFlag);
        if (newValue) {
            toStartAnimation();
        } else {
            toEndAnimation();
        }
    }
);
</script>

<style lang="scss" scoped>
.fixed-img-container {
    position: fixed;
    width: 100rpx;
    height: 100rpx;
    right: 30rpx;
    bottom: 150px;
    .fixed-img {
        width: 100%;
        height: 100%;
    }
    // background-color: red;
    // z-index: 300;
}
</style>
