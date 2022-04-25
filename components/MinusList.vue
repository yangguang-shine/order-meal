<template>
    <div class="minus-list-container flex-row flex-a-center" :style="{'color': mainColor}">
        <div class="minus-item flex-shrink"  v-for="(minusItem, index) in minusList" :key="index">
            {{minusItem.reach}}减{{minusItem.reduce}}
            <div class="border-right" :style="{'background-color': mainColor}"></div>
        </div>
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
  minusList: {
        type: Array,
            default: () => []
  },
  mainColor: {
      type: String,
      default: '#fb4e44'
  }
})
</script>

<style lang="scss" scoped>
.minus-list-container {
    // color: #eb5940;
    color: #fb4e44;
    // rgb(255, 74, 38)
    border: 1rpx solid;
    padding: 4rpx 0;
    border-radius: 8rpx;

    .minus-item {
        position: relative;
        padding: 0 9rpx 0 8rpx;
        font-size: 20rpx;
        line-height: 22rpx;
    }
    .border-right {
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 1rpx;
        height: 18rpx;
        // background-color:;
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
