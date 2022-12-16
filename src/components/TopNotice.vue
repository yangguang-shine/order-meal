<template>
    <view class="top-notice-container flex-center" :style="{ 'background-color': bgc || $mainColor, color: color }">
        <view v-if="animationFlag" class="content content-animation flex-row flex-a-center" :class="animationFlag ? '' : 'felx-center'">{{ content }}</view>

        <div v-else class="content flex-item flex-center text-center">{{ content }}</div>

        <view v-if="linkFlag" id="content-link" class="content-link flex-center" @click="toExplain">{{linkContent}}</view>
    </view>
</template>

<script lang="ts" setup>
import router from "@/utils/router";
import { ref } from "vue";
interface PropsI {
    content: string;
    animationFlag?: boolean;
    bgc?: string;
    color?: string;
    linkFlag?: boolean,
    linkContent?: string
}
const props: PropsI = withDefaults(defineProps<PropsI>(), {
    content: "",
    animationFlag: false,
    bgc: "",
    color: "#fff",
    linkFlag: false,
    linkContent: '详情'
});
console.log(props.linkFlag)
const conentlen = ref(props.content.length);
function toExplain() {
    router.navigateTo({
        name: 'explain',
        
    })
}
</script>

<style scoped lang="scss">
.top-notice-container {
    position: relative;
    width: 100%;
    height: 80rpx;
    color: #fff;
    font-size: 30rpx;
    font-weight: bold;
    box-sizing: border-box;
    // .content-box {
    //     // width: 300rpx;
    // }

    .content {
        height: 100%;
    }
    .content-animation {
        position: absolute;
        top: 0;
        left: 0;
        padding-left: 30rpx;
        white-space: nowrap;
        animation: content-animation 15s linear both infinite;
    }
    @keyframes content-animation {
        from {
            transform: translateX(630rpx);
        }
        to {
            transform: translateX(-100%);
        }
    }
    .content-link {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        height: 100%;
        width: 120rpx;
        background-color: #b188d0;
    }
}
</style>
