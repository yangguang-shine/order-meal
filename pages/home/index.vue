<template>
    <view class="home-container">
        <TopAddressSearch></TopAddressSearch>
        <ToolsList></ToolsList>
        <RecommandInfo></RecommandInfo>
    </view>
</template>

<script lang="ts" setup>
// import { host } from '@/config/host';
import getShopMinusList from "@/utils/getShopMinusList";
// import SelectModal from '@/components/SelectModal.vue';
import { mapState, mapMutation, mapAction } from "@/utils/mapVuex";
import TopAddressSearch from "./components/TopAddressSearch.vue";
import ToolsList from "./components/ToolsList.vue";
import RecommandInfo from "./components/RecommandInfo.vue";
import { topAddressSearchHeight, tabListTop } from "./homeConfig";
import { getCurrentInstance } from "vue";
import { onShow, onLoad, onPageScroll } from "@dcloudio/uni-app";
import { AddressItemI, ComputedActionI, ComputedMutationI, ComputedStateI, ShopItemI } from '@/interface/index'
import { hideLoading, showLoading, showModal } from "@/utils/";
import router from "@/utils/router";

interface StateF {
    shopInfo: ComputedStateI<ShopItemI>
}
interface MutationF {
    setTopAddressWidthFlag: ComputedMutationI<boolean>,
    setTabListFixedFlag: ComputedMutationI<boolean>,
}
interface ActionF {
    getDefaultAddress: ComputedActionI<void, AddressItemI>,
    getRecommandShopList: ComputedActionI<void>,
}
const {
    setTopAddressWidthFlag,
    setTabListFixedFlag,
}: MutationF = mapMutation([
    "setTopAddressWidthFlag",
    "setTabListFixedFlag",
]);

const { getDefaultAddress, getRecommandShopList  }:ActionF = mapAction([
    "getDefaultAddress",
    "getRecommandShopList",
]);

// console.log(JSON.stringify(addressList.value))
onShow(() => {
    uni.pageScrollTo({
        scrollTop: 0,
        duration: 0,
    });
    init();
});
onPageScroll((e: any) => {
    if (e.scrollTop > topAddressSearchHeight) {
        setTopAddressWidthFlag(true);
    } else {
        setTopAddressWidthFlag(false);
    }
    if (e.scrollTop >= tabListTop - topAddressSearchHeight) {
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
        await getRecommandShopList();
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
    .type-item-box {
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
