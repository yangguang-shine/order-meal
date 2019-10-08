<template>
    <div class="com-no-data">
        <image class="no-data-img" src="/static/img/no-data.svg"></image>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    }
}
</script>

<style lang="scss">
.no-data-img {
    position: fixed;
    width: 200rpx;
    height: 200rpx;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%)
}
</style>