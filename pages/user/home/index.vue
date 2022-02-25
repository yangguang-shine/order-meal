<template>
    <view class="home-container">
        <TopAddressSearch></TopAddressSearch>
        <ToolsList></ToolsList>
        <RecommandInfo></RecommandInfo>
    </view>
</template>

<script lang="ts" setup>
// import { host } from '@/config/host';
import getShopMinusList from "../../../utils/getShopMinusList";
// import SelectModal from '@/components/SelectModal.vue';
import { mapState, mapMutations, mapActions } from "../../../utils/mapVuex";
import TopAddressSearch from "./components/TopAddressSearch.vue";
import ToolsList from "./components/ToolsList.vue";
import RecommandInfo from "./components/RecommandInfo.vue";
import { topAddressSearchHeight, tabListTop } from "./homeConfig";
import { defineComponent, getCurrentInstance } from "vue";
import { onShow, onLoad, onPageScroll } from "@dcloudio/uni-app";

interface Istate {
    topAddressWidthFlag: boolean;
    tabListFixedFlag: boolean;
    addressList: any[];
}
interface IMutations {
    setTopAddressWidthFlag: any;
    setTabListFixedFlag: any;
    setDefaultAddress: any;
    toSelectAddress: any;
}
interface IActions {
    getAddressList: () => any;
    getRecommandShopList: () => any;
}
const internalInstance = getCurrentInstance();
const { $showLoading, $hideLoading, $showModal } = internalInstance.proxy;
const {
    setTopAddressWidthFlag,
    setTabListFixedFlag,
    setDefaultAddress,
    setRecommandShopList,
    toSelectAddress
} = mapMutations("user", [
    "setTopAddressWidthFlag",
    "setTabListFixedFlag",
    "setDefaultAddress",
    "setRecommandShopList",
    "toSelectAddress"
]);

const { getAddressList, getRecommandShopList } = mapActions("user", [
    "getAddressList",
    "getRecommandShopList"
]);
const { topAddressWidthFlag, tabListFixedFlag, addressList } = mapState(
    "user",
    ["topAddressWidthFlag", "tabListFixedFlag", "addressList"]
);
// console.log(JSON.stringify(addressList.value))
onShow(() => {
    uni.pageScrollTo({
        scrollTop: 0,
        duration: 0
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
})
async function getDefaultAddress() {
    await getAddressList();
    if (addressList.value.length) {
        setDefaultAddress(addressList.value[0]);
    } else {
        await $showModal({
            content: "为提供更好服务，请先选择地址",
            confirmText: "去选择地址"
        });
        toSelectAddress();
    }
}
async function init() {
    try {
        $showLoading();
        await getDefaultAddress();
        await getRecommandShopList();
    } catch (e) {
        console.log(e);
    } finally {
        $hideLoading();
    }
}

// onShow() {
//     uni.pageScrollTo({
//         scrollTop: 0,
//         duration: 0
//     });
//     this.init();
// }
// onPageScroll(e) {
//     if (e.scrollTop > topAddressSearchHeight) {
//         this.setTopAddressWidthFlag(true);
//     } else {
//         this.setTopAddressWidthFlag(false);
//     }
//     if (e.scrollTop >= tabListTop - topAddressSearchHeight) {
//         this.setTabListFixedFlag(true);
//     } else {
//         this.setTabListFixedFlag(false);
//     }
// }
// async init(): Promise<void> {
//     try {
//         this.$showLoading();
//         await this.getDefaultAddress();
//         await this.getRecommandShopList();
//     } catch (e) {
//         console.log(e);
//     } finally {
//         this.$hideLoading();
//     }
// },
// async getDefaultAddress() {
//     await this.getAddressList();
//     console.log(this);
//     if (this.addressList.length) {
//         console.log(this.addressList[0]);
//         this.setDefaultAddress(this.addressList[0]);
//     } else {
//         await this.$showModal({
//             content: "为提供更好服务，请先选择地址",
//             confirmText: "去选择地址"
//         });
//         this.toSelectAddress();
//     }
// },
// async getShopList() {
//     if (!this.defaultAddress.latitude || !this.defaultAddress.longitude)
//         return;
//     const params = {
//         businessType: 2,
//         // type: this.selectTabItem.type,
//         latitude: this.defaultAddress.latitude,
//         longitude: this.defaultAddress.longitude
//     };
//     const recommandShopList = await this.$fetch(
//         "user/shop/list",
//         params
//     );
//     recommandShopList.forEach(item => {
//         item.minusList = this.$getShopMinusList(item.minus || "");
//     });
//     const remandShopList1 = recommandShopList.concat(recommandShopList);
//     const tmandShopList2 = remandShopList1.concat(remandShopList1);
//     this.recommandShopList = tmandShopList2.concat(tmandShopList2);
// },
// async changeTabItem(tabItem) {
//     try {
//         this.$showLoading();
//         await this.getShopList();
//         this.selectTabItem = tabItem;
//         uni.pageScrollTo({
//             scrollTop: tabListTop - topAddressSearchHeight,
//             duration: 200
//         });
//     } catch (e) {
//         console.log(e);
//     } finally {
//         this.$hideLoading();
//     }
// },

// toShopList(businessType) {
//     this.saveBusinessType(businessType);
//     this.$myrouter.navigateTo({
//         name: "user/shop/list",
//         query: {
//             businessType
//         }
//     });
// },

// toOrder(shopItem) {
//     this.saveShopInfo(shopItem);
//     this.saveBusinessType(2);
//     this.$myrouter.navigateTo({
//         name: "user/menu/list",
//         query: {
//             businessType: 2
//         }
//     });
// },
// saveBusinessType(businessType) {
//     uni.setStorageSync("businessType", businessType);
// },
// saveShopInfo(shopItem) {
//     if (!shopItem.minusList) {
//         shopItem.minusList = getShopMinusList(shopItem.minus || "");
//     }
//     uni.setStorageSync("shopInfo", shopItem);
// }
</script>

<style lang="scss">
page {
    // minheight: 100%;
    // background-color: #fff;
    background-color: $color-bg-f5;
}
.home-container {
    line-height: 1.2;
    font-size: 28rpx;
    color: #333;
    min-height: 100vh;
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
        background-color: $color-bg-f5;
        padding: 20rpx 20rpx 0;
    }
    // .near-shop-box {
    // 	// padding: 30rpx;
    // }
}
</style>
