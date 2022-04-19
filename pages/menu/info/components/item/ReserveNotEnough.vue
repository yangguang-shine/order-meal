<template>
    <view class="reserve-not-enough-container flex-row flex-ja-center flex-shrink" @click.stop>{{text}}</view>
</template>

<script lang="ts" setup>
interface PropsI {
    text?: string
}
const props: PropsI = withDefaults(defineProps<PropsI>(), {
    text: "已售罄",
});

</script>

<style lang="scss" scoped>
.reserve-not-enough-container {
    background-color: #eee;
    font-size: 24rpx;
    height: 26rpx;
    color: #aaa;
    padding: 6rpx;
}
</style>
