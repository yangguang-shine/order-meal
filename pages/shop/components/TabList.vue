<template>
    <view class="tab-list-container flex-row flex-a-center">
        <view v-for="(tabItem, index) in tabList" :key="index" class="tab-item flex-item flex-row flex-ja-center" :class="selectedTabItem.type === tabItem.type ? 'select-tab-item' : ''" @click="clickTabItem(tabItem)">{{ tabItem.title }}</view>
        <div class="tab-item flex-item flex-row flex-ja-center">
            <view class="search-box flex-row flex-ja-center" @click.stop="toSearch">
                <image class="search-icon" src='/static/img/common/search.png'></image>

                <view class="search-title">搜索</view>
            </view>
        </div>
    </view>
</template>

<script lang="ts" setup>
import { defineComponent, computed, getCurrentInstance, ref, toRefs } from "vue";
import { mapState, mapMutation, mapAction } from "@/utils/mapVuex";
import { TabItemI, ComputedStateI, ComputedMutationI, ComputedActionI } from "@/interface/index";
import { RefI } from "@/interface/vueInterface";
import { onShow, onLoad, onPageScroll } from "@dcloudio/uni-app";
import { delaySync, hideLoading, showLoading } from "@/utils/";
import { ShopStoreI, useShopStore } from "@/piniaStore/shop";
import { storeToRefs} from 'pinia'
import { HomeStoreI, useHomeStore } from "@/piniaStore/home";
interface ShopStateF {
    routerBusinessType: ComputedStateI<number>;
}
interface HomeStateF {
    tabList: ComputedStateI<TabItemI[]>;
}
// shop store
const shopStore: ShopStoreI = useShopStore()
// shop state
const { routerBusinessType }: ShopStateF = toRefs(shopStore.shopState);
// shop action
const { setSearchShopListFlag, getShopList } = shopStore;
// home store
const homeStore: HomeStoreI = useHomeStore()
// home state
const { tabList }: HomeStateF = toRefs(homeStore.homeState);
// self state
const selectedTabItem: RefI<TabItemI> = ref(tabList.value[0]);
onLoad(() => {
    init();
});
async function init() {
    try {
        showLoading();
        await toGetShopList(selectedTabItem.value);
    } catch (e) {
        console.log(e);
    } finally {
        hideLoading();
    }
}
async function clickTabItem(tabItem: TabItemI) {
    if (selectedTabItem.value.type === tabItem.type) return;
    try {
        showLoading();
        await toGetShopList(tabItem);
        selectedTabItem.value = tabItem;
    } catch (e) {
        console.log(e);
    } finally {
        hideLoading();
    }
}
async function toGetShopList(tabItem: TabItemI) {
    // await delaySync(1000)
    await getShopList({
        businessType: routerBusinessType.value,
        type: tabItem.type,
    });
}
function toSearch() {
    setSearchShopListFlag(true);

}
</script>

<style lang="scss" scoped>
.tab-list-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 80rpx;
    background-color: #fff;
    z-index: 100;
    .tab-item {
        color: #666;
        height: 100%;
    }
    .select-tab-item {
        font-weight: bold;
        color: #333;
    }
    .search-box {
        width: 160rpx;
        height: 50rpx;
        color: #ccc;
        border: 1px solid;
        position: relative;
        border-radius: 25rpx;
        .search-icon {
            position: absolute;
            top: 50%;
            left: 10rpx;
            transform: translateY(-50%);
            width: 40rpx;
            height: 40rpx;
            // background-color: #ccc;
            border-radius: 50%;
        }
        .search-title {
            margin-left: 8rpx;
            font-size: 24rpx;
            color: #ccc;
        }
    }
}
</style>
