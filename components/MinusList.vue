<template>
    <div class="minus-list-container flex-row flex-a-center">
        <div class="minus-item flex-shrink" v-for="(minusItem, index) in minusList" :key="index">
            {{minusItem.reach}}减{{minusItem.reduce}}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        minusList: {
            type: Array,
            default: () => []
        }
    }
}
</script>

<style lang="scss" scoped>
.minus-list-container {
    // color: #eb5940;
    color: #fb4e44;
    // rgb(255, 74, 38)
    border: 1rpx solid #fb4e44;
    padding: 6rpx 0;
    border-radius: 8rpx;

    .minus-item {
        position: relative;
        padding: 0 9rpx 0 8rpx;
        font-size: 20rpx;
    }
    .minus-item::after {
        content: "";
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 1rpx;
        height: 18rpx;
        background-color: #fb4e44;
    }
    .minus-item:last-child {
        padding: 0 8rpx;
    }
    .minus-item:last-child::after {
        width: 0;
    }
}
</style>
