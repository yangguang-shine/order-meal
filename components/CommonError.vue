<template>
    <div class="com-error-container flex-col flex-ja-center">
        <image v-if="errorInfo.type === '1'" class="no-data-img" src="/static/img/error/error-no-data.png"></image>
        <view class="error-title">{{errorInfo.title}}</view>
    </div>
</template>

<script>
export default {
    props: {
        errorInfo: {
            type: Object,
            default: () => ({
                type: '1',
                title: '暂无数据'
            })
        },
    },
    data() {
        return {}
    }
}
</script>

<style lang="scss" scoped>
.com-error-container {
    .no-data-img {
        width: 128rpx;
        height: 128rpx;
    }
    .error-title {
        margin-top: 40rpx;
        color: #666;
        padding-bottom: 50rpx;
    }
}
</style>