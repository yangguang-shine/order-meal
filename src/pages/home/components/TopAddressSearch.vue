<template>
    <view class="top-address-search-container" id="top-address-search-container">
        <!-- <view class="top-vertical-scroll"> </view> -->
        <TopNotice animationFlag linkFlag bgc="#d34eb0" content="项目代码地址：https://github.com/yangguang-shine/order-meal 点击右侧按钮查看详情"></TopNotice>
        <view class="top-address-search flex-row flex-a-center" :style="{ 'background-color': $mainColor }">
            <view class="address-box flex-row flex-a-center" :style="{ 'max-width': topAddressWidthFlag ? '0' : '' }" @click.stop="toSelectAddress">
                <image class="address-icon flex-shrink" src="/static/img/user-home/home-address-icon.png"></image>
                <view class="address-info flex-item line1">{{ defaultAddress.address1 || "请选择地址" }}</view>
                <image src="/static/img/user-home/home-address-arrow-icon.png" class="arrow-right-icon flex-shrink" mode=""></image>
            </view>
            <view class="input-search line1 flex-item flex-row flex-a-center" @click.stop="toSearchShop">
                <image class="search-icon" src="/static/img/common/search.png"></image>
                请输入商家名称
            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { ComputedMutationI} from "@/interface/vuex";
import { defineComponent, computed, getCurrentInstance, toRefs, onMounted } from "vue";
import router from "@/utils/router";
import { AddressStoreI, useAddressStore } from "@/piniaStore/address";
import { onShow, onLoad, onPageScroll, onHide, onUnload } from "@dcloudio/uni-app";
import { HomeStoreI, useHomeStore } from "@/piniaStore/home";
import { selectQuery } from "@/utils/";
import { HomeStateG } from "@/piniaStore/home/state";
import { AddressStateG } from "@/piniaStore/address/state";



interface MutationF {
    setSearchShopFlag: ComputedMutationI<boolean>;
}
// home store
const homeStore: HomeStoreI = useHomeStore();
// home state
const { topAddressWidthFlag }: HomeStateG = toRefs(homeStore.homeState);
// home action
const { setSearchShopFlag, setTopAddressSearchPX } = homeStore;
// address store
const addressStore: AddressStoreI = useAddressStore();
// address state
const { defaultAddress }: AddressStateG = toRefs(addressStore.addressState);
const currentInstance = getCurrentInstance()

onShow(() => {});
onMounted(() => {
    getTopAddressSearchContainerHeihgt();
});
async function getTopAddressSearchContainerHeihgt() {
    const res = await selectQuery("#top-address-search-container", currentInstance);
    setTopAddressSearchPX(res.height);
}

function toSelectAddress() {
    router.navigateTo({
        name: "address/list",
        query: {
            fromPage: "userHome",
        },
    });
}

const toSearchShop = () => {
    setSearchShopFlag(true);
};
</script>

<style lang="scss" scoped>
.top-address-search-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
    .top-vertical-scroll {
        width: 100%;
        height: 50rpx;
        background-color: orange;
    }
    .top-address-search {
        width: 100%;
        height: 100rpx;
        // background-color: #1C1B20;
        padding: 0 20rpx;
        box-sizing: border-box;
        .address-box {
            font-size: 32rpx;
            color: #ffffff;
            line-height: 60rpx;
            max-width: 380rpx;
            transition: all 0.5s;
        }
        .address-icon {
            width: 30rpx;
            height: 30rpx;
            margin-right: 10rpx;
        }
        .address-info {
        }
        .arrow-right-icon {
            width: 20rpx;
            height: 20rpx;
            margin-left: 6rpx;
            margin-right: 30rpx;
        }
        .input-search {
            position: relative;
            height: 60rpx;
            padding: 0 70rpx;
            background-color: #fff;
            border-radius: 30rpx;
            color: #999;
        }
        .search-icon {
            position: absolute;
            top: 50%;
            left: 10rpx;
            width: 50rpx;
            height: 50rpx;
            transform: translateY(-50%);
        }
    }
}
</style>
