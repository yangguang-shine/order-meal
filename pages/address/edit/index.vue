<template>
    <view class="address-edit-container">
        <div class="item flex-row flex-a-center">
            <div class="title text-center">姓名</div>
            <input class="flex-item input-item" type="text" v-model="addressInfo.name" />
        </div>
        <div class="item flex-row flex-a-center">
            <div class="title text-center"></div>
            <div class="flex-row flex-a-center">
                <div class="sex-item" :style="{ color: addressInfo.sex === 1 ? $mainColor : '' }" @click="changeSex(1)">男</div>
                <div class="sex-item" :style="{ color: addressInfo.sex === 2 ? $mainColor : '' }" @click="changeSex(2)">女</div>
            </div>
        </div>
        <div class="item flex-row flex-a-center">
            <div class="title text-center">手机号</div>
            <input class="flex-item input-item" type="text" v-model="addressInfo.mobile" />
        </div>
        <div class="item flex-row flex-a-center">
            <div class="title text-center">地址</div>
            <div class="flex-item input-item line1" @click="chooseAddress" :style="{ color: addressInfo.address1 ? '' : '#999' }">{{ addressInfo.address1 || "请选择地址" }}</div>
        </div>
        <div class="item flex-row flex-a-center">
            <div class="title text-center">门牌号</div>
            <input type="text" class="flex-item input-item" v-model="addressInfo.address2" />
        </div>
        <div class="flex-row flex-j-center">
            <div v-if="routerAddressID" class="button" :style="{ 'background-color': $mainColor }" @click="toEditAddress">修改</div>
            <div v-else class="button" :style="{ 'background-color': $mainColor }" @click="toAddAddress">新增</div>
        </div>
    </view>
</template>
<script lang="ts" setup>
import { getSetting, authorize } from "@/utils";
import { defineComponent, computed, getCurrentInstance, reactive, ref } from "vue";
import { mapState, mapMutation, mapAction } from "@/utils/mapVuex";
import { onShow, onLoad } from "@dcloudio/uni-app";
import { AddressItemI, ComputedActionI, ComputedStateI } from "@/interface/index";
import { RefI } from "@/interface/vueInterface";
import { AddressStoreI, useAddressStore } from "@/piniaStore/address";
import { hideLoading, showLoading, showModal, showToast } from "@/utils/";
import router from "@/utils/router";
interface ActionF {
    addAddress: ComputedActionI<AddressItemI>;
    findAddress: ComputedActionI<number, AddressItemI>;
    editAddress: ComputedActionI<AddressItemI>;
}
// address store
const addressStore: AddressStoreI = useAddressStore();
// address action
const { addAddress, findAddress, editAddress } = addressStore;
let routerAddressID: RefI<number> = ref("");
interface OptionI {
    addressID: string;
}
onLoad((option: OptionI) => {
    if (option.addressID) {
        routerAddressID.value = Number(option.addressID);
        init();
    }
});
let addressInfo: AddressItemI = reactive<AddressItemI>({
    name: "",
    sex: 1,
    mobile: "",
    address1: "北京市丰台区顶秀金瑞家园",
    address2: "",
    latitude: "111",
    longitude: "222",
});
async function init() {
    try {
        showLoading();
        await toFindAddress();
    } catch (error) {
        console.log(error);
    } finally {
        hideLoading();
    }
}
async function toFindAddress() {
    let findAddressInfo: AddressItemI = await findAddress(routerAddressID.value);
    Object.assign(addressInfo, findAddressInfo);
}
async function toAddAddress() {
    try {
        if (!checkAddress()) return;
        showLoading();
        await addAddress(addressInfo);
        hideLoading();
        await showModal({
            content: "添加成功",
        });
        router.back(1);
    } catch (e) {
        console.log(e);
    } finally {
        hideLoading();
    }
}
async function toEditAddress() {
    try {
        if (!checkAddress()) return;
        showLoading();
        await editAddress({
            ...addressInfo,
            addressID: routerAddressID.value,
        });
        hideLoading();
        await showModal({
            content: "修改成功",
        });
        router.back(1);
    } catch (e) {
        console.log(e);
    } finally {
        hideLoading();
    }
}
function checkAddress() {
    let flag = true;
    if (!addressInfo.name) {
        flag = false;
        showToast({
            title: "请输入姓名",
        });
    } else if (!addressInfo.mobile) {
        flag = false;

        showToast({
            title: "请输入手机号",
        });
    } else if (!addressInfo.address1) {
        flag = false;
        showToast({
            title: "请选择地址",
        });
    } else if (!addressInfo.address2) {
        flag = false;
        showToast({
            title: "请输入门牌号",
        });
    }
    return flag;
}
function changeSex(index: number) {
    addressInfo.sex = index;
}

async function chooseAddress() {
    // #ifdef MP-WEIXIN
    try {
        await getSetting("scope.userLocation");
    } catch (e) {
        console.log(e);
        try {
            await authorize("scope.userLocation");
        } catch (e) {
            console.log(e);
            return;
        }
    }
    // #endif
    uni.chooseLocation({
        success: (res: any) => {
            console.log("res");
            console.log(res);
            if (res.address && res.latitude && res.longitude) {
                addressInfo.address1 = res.address;
                addressInfo.latitude = res.latitude;
                addressInfo.longitude = res.longitude;
            } else {
                showToast({
                    title: "地址获取失败",
                });
            }
        },
    });
}
</script>

<style lang="scss">
page {
    // height: 100%;
}
.address-edit-container {
    height: 100%;
    font-size: 30rpx;
    .item {
        padding: 20rpx 0;
        height: 60rpx;
        // line-height: 1.2rpx;
        // border-bottom: 2rpx solid #eee;
    }
    input {
        height: 60rpx;
        line-height: 1.2;
    }
    .title {
        width: 180rpx;
        margin-right: 16rpx;
    }
    .sex-item {
        color: #aaa;
        border: 2rpx solid;
        height: 60rpx;
        width: 120rpx;
        line-height: 60rpx;
        text-align: center;
        margin-right: 16rpx;
    }
    .button {
        margin-top: 40rpx;
        width: 300rpx;
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        border-radius: 40rpx;
        color: #fff;
    }
    .input-item {
        margin-right: 80rpx;
        height: 60rpx;
        border-bottom: 1rpx solid #ccc;
        line-height: 60rpx;
    }
}
</style>
