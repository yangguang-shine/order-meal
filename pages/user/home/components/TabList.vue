<template>
    <view class="tab-list-container">
        <view id="tab-list-fixed-id" class="tab-list flex-row flex-a-center" :class="{ 'tab-list-fixed': tabListFixedFlag }" :style="{ top: tabListFixedFlag ? topAddressSearchHeight + 'px' : '' }">
            <view v-for="(tabItem, index) in tabList" :key="index" class="tab-item flex-item flex-row flex-ja-center" :class="selectTabItem.type === tabItem.type ? 'select-tab-item' : ''" @click="clickTabItem(tabItem)">{{ tabItem.title }}</view>
        </view>
    </view>
</template>

<script>

import { defineComponent, computed } from 'vue'
import { mapState, mapMutations, mapActions, useStore } from "vuex";
import computedMapState from "../../../../utils/computedMapState";
export default defineComponent({
    setup() {
        const { changeTabItem } = mapMutations('user/home', ['changeTabItem'])
        const clickTabItem = (tabItem) => {
            changeTabItem(tabItem)
        }
        return {
            ...computedMapState('user/home', ['tabList', 'selectTabItem']),
            clickTabItem
            // ...mapMutations('user/home', ['changeTabItem']),
        }
    },
})

</script>

<style lang="scss" scoped>
.tab-list-container {
    position: relative;
    width: 100%;
    height: 80rpx;
    .tab-list {
        position: absolute;
        top: 0;
        left: -20rpx;
        width: 750rpx;
        height: 80rpx;
        box-sizing: border-box;
        // border-top: 1rpx solid #e4e4e4;
        // border-bottom: 1rpx solid #e4e4e4;
    }
    .tab-list-fixed {
        position: fixed;
        left: 0;
        border-top: none;
        background-color: #fff;
        z-index: 100;
    }
    .tab-item {
        color: #666;
        height: 100%;
    }
    .select-tab-item {
        font-weight: bold;
        color: #333;
    }
}
</style>
