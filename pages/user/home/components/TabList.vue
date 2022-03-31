<template>
    <view class="tab-list-container">
        <view id="tab-list-fixed-id" class="tab-list flex-row flex-a-center" :class="{ 'tab-list-fixed': tabListFixedFlag }" :style="{ top: tabListFixedFlag ? topAddressSearchHeight + 'px' : '' }">
            <view v-for="(tabItem, index) in tabList" :key="index" class="tab-item flex-item flex-row flex-ja-center" :class="selectedTabItem.type === tabItem.type ? 'select-tab-item' : ''" @click="clickTabItem(tabItem)">{{ tabItem.title }}</view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { defineComponent, computed, getCurrentInstance, ref } from "vue";
import { mapState, mapMutation, mapAction } from "@/utils/mapVuex";
import { topAddressSearchHeight, tabListTop } from "../homeConfig";
import { TabItemI, ComputedStateI, ComputedMutationI, ComputedActionI } from "@/interface/index";
const { $showLoading, $hideLoading, $showModal, $delaySync } = getCurrentInstance().proxy;

interface StateF {
    tabList: ComputedStateI<TabItemI[]>;
    selectedTabItem: ComputedStateI<TabItemI>;
    tabListFixedFlag: ComputedStateI<boolean>;
}

interface MutationF {
    changeTabItem: ComputedMutationI<TabItemI>;
}
interface ActionF {
    getRecommandShopList: ComputedActionI<void>;
}
const { tabList, selectedTabItem, tabListFixedFlag }: StateF = mapState(["tabList", "selectedTabItem", "tabListFixedFlag"]);
const { changeTabItem }: MutationF = mapMutation(["changeTabItem"]);
const { getRecommandShopList }: ActionF = mapAction(["getRecommandShopList"]);
const clickTabItem = async (tabItem: TabItemI) => {
    if (selectedTabItem.value.type === tabItem.type) return;
    try {
        $showLoading();
        await getRecommandShopList();
        // await $delaySync(2000)
        changeTabItem(tabItem);
        uni.pageScrollTo({
            scrollTop: tabListTop - topAddressSearchHeight,
            duration: 200,
        });
    } catch (e) {
        console.log(e);
    } finally {
        $hideLoading();
    }
};
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
