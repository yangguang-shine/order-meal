<template>
    <view class="tab-list-container" id="tab-list-container">
        <view id="tab-list-fixed-id" class="tab-list flex-row flex-a-center" :class="{ 'tab-list-fixed': tabListFixedFlag }" :style="{ top: tabListFixedFlag ? topAddressSearchPX + 'px' : '' }">
            <view v-for="(tabItem, index) in tabList" :key="index" class="tab-item flex-item flex-row flex-ja-center" :class="selectedTabItem.type === tabItem.type ? 'select-tab-item' : ''" @click="clickTabItem(tabItem)">{{ tabItem.title }}</view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { defineComponent, computed, getCurrentInstance, ref, onMounted, toRefs } from "vue";
import { mapState, mapMutation, mapAction } from "@/utils/mapVuex";
import { TabItemI, ComputedStateI, ComputedMutationI, ComputedActionI } from "@/interface/index";
import { hideLoading, selectQuery, showLoading } from "@/utils/";
import { ShopListParamsI } from "@/store/actions/home";
import { HomeStoreI, useHomeStore } from "@/piniaStore/home";
import { storeToRefs } from "pinia";
interface HomeStateF {
    tabList: ComputedStateI<TabItemI[]>;
    selectedTabItem: ComputedStateI<TabItemI>;
    tabListFixedFlag: ComputedStateI<boolean>;
    tabListTop: ComputedStateI<number>;
    topAddressSearchPX: ComputedStateI<number>;
}
// home store
const homeStore: HomeStoreI = useHomeStore();
// home state
const { tabList, selectedTabItem, tabListFixedFlag, tabListTop, topAddressSearchPX }: HomeStateF = toRefs(homeStore.homeState);
const { changeTabItem, setTabListTop, getRecommandShopList } = homeStore;

onMounted(() => {
    getTabListTop();
    // 为了获取最终的位置
    setTimeout(() => {
        getTabListTop()
    }, 200);
    //    uni.createSelectorQuery()
    //         .select('#tab-list-fixed-id')
    //         .boundingClientRect((res: any) => {
    //             console.log('res>>>')
    //             console.log(res)
    //         })
    //         .exec();
});
async function getTabListTop() {
    const res = await selectQuery("#tab-list-fixed-id");
    setTabListTop(res.top);
}
const clickTabItem = async (tabItem: TabItemI) => {
    if (selectedTabItem.value.type === tabItem.type) return;
    try {
        showLoading();
        await getRecommandShopList({
            type: tabItem.type,
            businessType: 2,
        });
        // await $delaySync(2000)
        changeTabItem(tabItem);
        uni.pageScrollTo({
            scrollTop: tabListTop.value - topAddressSearchPX.value,
            duration: 200,
        });
    } catch (e) {
        console.log(e);
    } finally {
        hideLoading();
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
