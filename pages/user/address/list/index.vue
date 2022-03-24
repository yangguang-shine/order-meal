<template>
    <view class="address-list-container">
        <div class="address-lsit">
            <div class="address-item" v-for="(addressItem, index) in addressList" :key="index" @click="toSetDefaultAddress(addressItem)">
                <div class="address-title line1">
                    {{addressItem.address1}} {{addressItem.address2}}
                </div>
                <div class="user-info flex-row flex-a-center">
                    <div class="address-name">{{addressItem.name}}</div>
                    <div class="address-mobile">{{addressItem.mobile}}</div>
                </div>
                <image class="edit-icon" src="/static/img/shop-edit.svg" @click.stop="toEditAddress(addressItem.addressID)"></image>
                <image class="delete-icon" src="/static/img/shop-delete.svg" @click.stop="toDeleteAddress(addressItem.addressID)"></image>

                <div v-if="defaultAddress.addressID === addressItem.addressID" class="default-bgc" :style="{'color': $mainColor}"></div>
                <div v-if="defaultAddress.addressID === addressItem.addressID" class="default-title">默认</div>
            </div>
        </div>
        <div class="address-add" :style="{'background': $mainColor}" @click="toAddAddress">
            新增收获地址
        </div>
    </view>
</template>
<script lang="ts" setup>
import {
    defineComponent,
    computed,
    getCurrentInstance,
    ref,
    onMounted
} from "vue";
import { mapState, mapMutations, mapActions } from "../../../../utils/mapVuex";
import { onShow, onLoad } from "@dcloudio/uni-app";

const internalInstance = getCurrentInstance();
const {
    $showLoading,
    $hideLoading,
    $showModal,
    $delaySync,
    $myrouter
} = internalInstance.proxy;
const { addressList, defaultAddress } = mapState([
    "addressList",
    "defaultAddress"
]);
const {
    getAddressList,
    deleteAddress,
    setDefaultAddressFetch
} = mapActions([
    "getAddressList",
    "deleteAddress",
    "setDefaultAddressFetch"
]);
const { setDefaultAddress } = mapMutations(["setDefaultAddress"]);
let routerOptions: any;
onShow(() => {
    init();
});
onLoad((options: any) => {
    routerOptions = options;
});
async function init() {
    try {
        $showLoading();
        await getAddressList();
        if (addressList.value.length) {
            setDefaultAddress(addressList.value[0]);
        }
    } catch (e) {
        console.log(e);
    } finally {
        $hideLoading();
    }
}
async function toDeleteAddress(addressID) {
    try {
        await $showModal({
            content: "确认删除该地址吗？",
            showCancel: true
        });
    } catch (e) {
        console.log(e);
        return;
    }
    try {
        $showLoading();
        await deleteAddress(addressID);
        $hideLoading();
        await $showModal({
            content: "删除成功"
        });
    } catch (e) {
        console.log(e);
        return;
    } finally {
        $hideLoading();
    }
    init();
}
async function toSetDefaultAddress(addressItem) {
    if (defaultAddress.value.addressID === addressItem.addressID) return;
    try {
        await $showModal({
            content: "确认设置为默认地址吗？",
            showCancel: true
        });
    } catch (e) {
        console.log(e);
        return;
    }
    try {
        $showLoading();
        await setDefaultAddressFetch(addressItem.addressID);
        setDefaultAddress(addressItem);
        // await $fetch("user/address/setDefault", { addressID });
        if (routerOptions.fromPage) {
            $myrouter.back();
            return
        }
        
    } catch (e) {
        console.log(e);
    } finally {
        $hideLoading();
    }
    init();
}

function toEditAddress(addressID) {
    $myrouter.navigateTo({
        name: "user/address/edit",
        query: {
            addressID
        }
    });
}

function toAddAddress() {
    $myrouter.navigateTo({
        name: "user/address/edit"
    });
}
</script>

<style lang="scss">
page {
    height: 100%;
}
.address-list-container {
    font-size: 30rpx;
    padding: 30rpx 0 110rpx;
    background-color: #f5f5f5;
    color: #333;
    min-height: 100%;
    box-sizing: border-box;
    .address-item {
        position: relative;
        padding: 36rpx;
        margin-bottom: 30rpx;
        background-color: #fff;
    }
    .address-title {
        font-weight: bold;
        width: 500rpx;
        margin-bottom: 16rpx;
    }
    .user-info {
        font-size: 24rpx;
        color: #666;
    }
    .address-name {
        margin-right: 20rpx;
    }
    .delete-icon,
    .edit-icon {
        position: absolute;
        right: 80rpx;
        width: 30rpx;
        height: 30rpx;
    }
    .delete-icon {
        top: 30rpx;
    }
    .edit-icon {
        bottom: 30rpx;
    }
    .address-add {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100rpx;
        line-height: 100rpx;
        text-align: center;
        font-size: 32rpx;
        color: #fff;
    }
    .default-bgc {
        position: absolute;
        top: 0;
        right: 0;
        width: 0;
        height: 0;
        border: 40rpx solid;
        border-left: 40rpx solid transparent;
        border-bottom: 40rpx solid transparent;
    }
    .default-title {
        position: absolute;
        top: 14rpx;
        right: 4rpx;
        transform: rotate(45deg);
        color: #fff;
        font-size: 18rpx;
    }
}
</style>
