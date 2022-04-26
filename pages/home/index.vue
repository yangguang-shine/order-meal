<template>
    <view class="home-container" id="home-container">
        <TopAddressSearch></TopAddressSearch>
        <ToolsList></ToolsList>
        <Banner></Banner>
        <RecommandInfo></RecommandInfo>
        <SearchShop v-if="searchShopFlag" :bottom="tabBarHeightPX"></SearchShop>
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
import RecommandInfo from "./components/RecommandInfo.vue";
import SearchShop from "./components/SearchShop.vue";
import { topAddressSearchHeight } from "./homeConfig";
import { getCurrentInstance, onMounted } from "vue";
import { onShow, onLoad, onPageScroll, onHide, onUnload } from "@dcloudio/uni-app";
import { AddressItemI, ComputedActionI, ComputedMutationI, ComputedStateI, ShopItemI, TabItemI } from "@/interface/index";
import { hideLoading, selectQuery, showLoading, showModal, tabBarHeightPX } from "@/utils/";
import router from "@/utils/router";
import { ShopListParamsI } from "@/store/actions/home";

interface StateF {
    searchShopFlag: ComputedStateI<boolean>;
    tabListTop: ComputedStateI<number>;
    selectedTabItem: ComputedStateI<TabItemI>;
}
interface MutationF {
    setTopAddressWidthFlag: ComputedMutationI<boolean>;
    setTabListFixedFlag: ComputedMutationI<boolean>;
}
interface ActionF {
    getDefaultAddress: ComputedActionI<void, AddressItemI>;
    getRecommandShopList: ComputedActionI<ShopListParamsI>;
}
const { searchShopFlag, tabListTop, selectedTabItem }: StateF = mapState();
const { setTopAddressWidthFlag, setTabListFixedFlag }: MutationF = mapMutation();

const { getDefaultAddress, getRecommandShopList }: ActionF = mapAction();

// console.log(JSON.stringify(addressList.value))
onShow(() => {
    console.log();
    console.log("onShow");
    init();
    setTimeout(async () => {
        const res = await selectQuery("#home-container");
        console.log(res);
        if (-res.top >= tabListTop.value - topAddressSearchHeight) {
            setTabListFixedFlag(true);
        } else {
            setTabListFixedFlag(false);
        }
    }, 0);

    // setTimeout(() => {
    //     console.log(111)
    //         uni.pageScrollTo({
    //     scrollTop: 0,
    //     duration: 200,
    // });
    // }, 0);
});
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
    console.log("onPageScroll");
    console.log(e)
    if (e.scrollTop > topAddressSearchHeight) {
        setTopAddressWidthFlag(true);
    } else {
        setTopAddressWidthFlag(false);
    }
    if (e.scrollTop > tabListTop.value - topAddressSearchHeight) {
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
