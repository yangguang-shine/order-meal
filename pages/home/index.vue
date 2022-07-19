<template>
    <view class="home-container" id="home-container" :style="{ 'padding-top': topAddressSearchPX + 'px' }">
        <TopAddressSearch></TopAddressSearch>
        <ToolsList></ToolsList>
        <Banner></Banner>
        <RecommandInfo></RecommandInfo>
        <SearchShop v-if="searchShopFlag" :bottom="tabBarHeightPX"></SearchShop>
        <FixedImg ref="refFixedImg"></FixedImg>
    </view>
</template>

<script lang="ts" setup>
// import { host } from '@/config/host';
import getShopMinusList from "@/utils/getShopMinusList";
// import SelectModal from '@/components/SelectModal.vue';
import { mapState, mapMutation, mapAction } from "@/utils/mapVuex";
import TopAddressSearch from "./components/TopAddressSearch.vue";
import ToolsList from "./components/ToolsList.vue";
import Banner from "./components/Banner.vue";
import FixedImg from "./components/FixedImg.vue";
import RecommandInfo from "./components/RecommandInfo.vue";
import SearchShop from "./components/SearchShop.vue";
import { getCurrentInstance, onMounted, toRefs } from "vue";
import { onShow, onLoad, onPageScroll, onHide, onUnload } from "@dcloudio/uni-app";
import { AddressItemI, ComputedActionI, ComputedMutationI, ComputedStateI, ShopItemI, TabItemI } from "@/interface/index";
import { hideLoading, selectQuery, showLoading, showModal, tabBarHeightPX } from "@/utils/";
import router from "@/utils/router";
import { ShopListParamsI } from "@/store/actions/home";
import { AddressStoreI, useAddressStore } from "@/piniaStore/address";
import { HomeStoreI, useHomeStore } from "@/piniaStore/home";
import { HomeStateI } from "@/store/state/home";
import { storeToRefs } from "pinia";

interface HomeStateF {
    searchShopFlag: ComputedStateI<boolean>;
    tabListTop: ComputedStateI<number>;
    selectedTabItem: ComputedStateI<TabItemI>;
    topAddressSearchPX: ComputedStateI<number>;
}

// home store
const homeStore: HomeStoreI = useHomeStore();
// home state
const { searchShopFlag, tabListTop, selectedTabItem, topAddressSearchPX }: HomeStateF = toRefs(homeStore.homeState);
// home action
const { getRecommandShopList, setTopAddressWidthFlag, setTabListFixedFlag } = homeStore;

// address store
const addressStore: AddressStoreI = useAddressStore();
// address action
const { getDefaultAddress } = addressStore;
let pageHaShowFlag = false;
onShow(async () => {
    console.log("onShow");
    init();
    if (pageHaShowFlag) {
        // 页面展示时是否固定店铺tab
        getShowTabListPosition();
    } else {
        // 渲染时获取不到相关元素信息 需要延迟获取
        setTimeout(() => {
            getShowTabListPosition();
        }, 100);
        pageHaShowFlag = true;
    }
    setTimeout(async () => {
        try {
            const res = await selectQuery("#home-container");
            if (-res.top >= tabListTop.value - topAddressSearchPX.value) {
                setTabListFixedFlag(true);
            } else {
                setTabListFixedFlag(false);
            }
        } catch (e) {
            console.log(e);
        } finally {
            console.log(1111);
        }
    }, 100);

    // setTimeout(() => {
    //     console.log(111)
    //         uni.pageScrollTo({
    //     scrollTop: 0,
    //     duration: 200,
    // });
    // }, 0);
});
async function getShowTabListPosition() {
    try {
        const res = await selectQuery("#home-container");
        if (-res.top >= tabListTop.value - topAddressSearchPX.value) {
            setTabListFixedFlag(true);
        } else {
            setTabListFixedFlag(false);
        }
    } catch (e) {
        console.log(e);
    } finally {
    }
}
onLoad(() => {
    console.log("onLoad");
});
onMounted(() => {
    console.log("onMounted");
});
onHide(() => {
    console.log("page hide");
});
onUnload(() => {
    console.log("onUnload");
});

onPageScroll((e: any) => {
    if (e.scrollTop > topAddressSearchPX.value) {
        setTopAddressWidthFlag(true);
    } else {
        setTopAddressWidthFlag(false);
    }
    if (e.scrollTop > tabListTop.value - topAddressSearchPX.value) {
        setTabListFixedFlag(true);
    } else {
        setTabListFixedFlag(false);
    }
});
async function toGetDefaultAddress() {
    const defaultAddress: AddressItemI = await getDefaultAddress();
    if (!defaultAddress.addressID) {
        await showModal({
            content: "为提供更好服务，请先选择地址",
            confirmText: "去选择地址",
        });
        router.navigateTo({
            name: "address/list",
            query: {
                fromPage: "userHome",
            },
        });
    }
}
async function init() {
    try {
        showLoading();
        await toGetDefaultAddress();
        await getRecommandShopList({
            type: selectedTabItem.value.type,
            businessType: 2,
        });
    } catch (e) {
        console.log(e);
    } finally {
        hideLoading();
    }
}
</script>

<style lang="scss">
page {
    background-color: #f5f5f5;
}
.home-container {
    line-height: 1.2;
    font-size: 28rpx;
    color: #333;
    padding-bottom: 30rpx;
    margin-top: 20rpx;
    .swiper-box {
        height: 280rpx;
        width: 100%;
    }
    .swiper-item-box {
        width: 100%;
        height: 100%;
    }
    .swiper-item-img {
        padding: 30rpx;
        width: 100%;
        height: 300rpx;
        box-sizing: border-box;
    }
    .business-type-box {
        padding: 20rpx 0;
        background-color: #fff;
        margin: 20rpx;
        border-radius: 20rpx;
    }

    .type-item {
        width: 150rpx;
        height: 150rpx;
        border-radius: 50%;
    }
    .type-img {
        width: 80rpx;
        height: 80rpx;
    }
    .near-shop-title {
        padding: 10rpx 30rpx;
        font-size: 32rpx;
        font-weight: bold;
        // margin-bottom: 20rpx;
    }
    .shop-list {
        background-color: #f5f5f5;
        padding: 20rpx 20rpx 0;
    }
    // .near-shop-box {
    // 	// padding: 30rpx;
    // }
}
</style>
