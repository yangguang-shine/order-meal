<template>
    <view class="address-edit-container">
        <div class="item flex-row flex-a-center">
            <div class="title text-center">姓名</div>
            <input class="flex-item" type="text" v-model="addressInfo.name">
        </div>
        <div class="item flex-row flex-a-center">
            <div class="title text-center"></div>
            <div class="flex-row flex-a-center">
                <div class="sex-item" :style="{'color': addressInfo.sex === 1 ? $mainColor : ''}" @click="changeSex(1)">男</div>
                <div class="sex-item" :style="{'color': addressInfo.sex === 2 ? $mainColor : ''}" @click="changeSex(2)">女</div>
            </div>
        </div>
        <div class="item flex-row flex-a-center">
            <div class="title text-center">手机号</div>
            <input class="flex-item" type="text" v-model="addressInfo.mobile">
        </div>
        <div class="item flex-row flex-a-center">
            <div class="title text-center">地址</div>
            <div class="flex-item" @click="chooseAddress" :style="{color: addressInfo.address1 ? '' : '#999'}">{{addressInfo.address1 || '请选择地址'}}</div>
        </div>
        <div class="item flex-row flex-a-center">
            <div class="title text-center">门牌号</div>
            <input type="text" v-model="addressInfo.address2">
        </div>
        <div class="flex-row flex-j-center">
            <div v-if="routerAddressID" class="button" :style="{'background-color': $mainColor}" @click="toEditAddress">修改</div>
            <div v-else class="button" :style="{'background-color': $mainColor}" @click="toAddAddress">新增</div>
        </div>
    </view>
</template>
<script lang="ts" setup>
import { getSetting, authorize } from "@/utils";
import {
    defineComponent,
    computed,
    getCurrentInstance,
    reactive,
    ref
} from "vue";
import { mapState, mapMutations, mapActions } from "../../../../utils/mapVuex";
import { onShow, onLoad } from "@dcloudio/uni-app";
const internalInstance = getCurrentInstance();
const {
    $showLoading: showLoading,
    $hideLoading: hideLoading,
    $showModal: showModal,
    $delaySync: delaySync,
    $myrouter: myrouter
} = internalInstance.proxy;
const { addAddress, findAddress, editAddress } = mapActions("user", [
    "addAddress",
    "findAddress",
    "editAddress"
]);
onShow(() => {});
let routerAddressID = ref("");
onLoad((option: any) => {
    routerAddressID.value = option.addressID;
    if (option.addressID) {
        routerAddressID.value = option.addressID;
        init();
    }
});
let addressInfo = reactive({
    name: "",
    sex: 1,
    mobile: "",
    address1: "",
    address2: "",
    latitude: "",
    longitude: ""
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
    let findAddressInfo = await findAddress(routerAddressID.value);
    Object.assign(addressInfo, findAddressInfo);
}
async function toAddAddress() {
    try {
        showLoading();
        await addAddress(addressInfo);
        hideLoading();
        await showModal({
            content: "添加成功"
        });
        myrouter.back(1);
    } catch (e) {
        console.log(e);
    } finally {
        hideLoading();
    }
}
async function toEditAddress() {
    try {
        showLoading();
        await editAddress({
            ...addressInfo,
            addressID: routerAddressID.value
        });
        hideLoading();
        await showModal({
            content: "修改成功"
        });
        myrouter.back(1);
    } catch (e) {
        console.log(e);
    } finally {
        hideLoading();
    }
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
        success: res => {
            console.log("res");
            console.log(res);
            addressInfo.address1 = res.address;
            addressInfo.latitude = res.latitude;
            addressInfo.longitude = res.longitude;
        }
    });
}
// data() {
//     return {
//         addressInfo: {
//             name: "",
//             sex: 1,
//             mobile: "",
//             address1: "",
//             address2: "",
//             latitude: "",
//             longitude: ""
//         },
//         addressID: ""
//     };
// },
// onLoad(options) {
//     this.addressID = options.addressID || "";
//     if (this.addressID) {
//         this.init();
//     }
// },
// methods: {
// async init() {
//     try {
//         this.$showLoading();
//         const addressInfo = await this.$fetch("user/address/find", {
//             addressID: this.addressID
//         });
//         this.addressInfo = addressInfo || {};
//         this.$hideLoading();
//     } catch (e) {
//         console.log(e);
//     }
// },
// async addAddress() {
//     try {
//         this.$showLoading();
//         await this.$fetch("user/address/add", { ...this.addressInfo });
//         this.$hideLoading();
//         await this.$showModal({
//             content: "添加成功"
//         });
//         this.$myrouter.back(1);
//     } catch (e) {
//         console.log(e);
//     } finally {
//         this.$hideLoading();
//     }
// },
// async editAddress() {
//     try {
//         this.$showLoading();
//         await this.$fetch("user/address/edit", {
//             ...this.addressInfo,
//             addressID: this.addressID
//         });
//         this.$hideLoading();
//         await this.$showModal({
//             content: "修改成功"
//         });
//         this.$myrouter.back(1);
//     } catch (e) {
//         console.log(e);
//     }
// },
// async chooseAddress() {
//     // #ifdef MP-WEIXIN
//     try {
//         await getSetting("scope.userLocation");
//     } catch (e) {
//         console.log(e);
//         try {
//             await authorize("scope.userLocation");
//         } catch (e) {
//             console.log(e);
//             return;
//         }
//     }
//     // #endif
//     uni.chooseLocation({
//         success: res => {
//             console.log("res");
//             console.log(res);
//             this.addressInfo.address1 = res.address;
//             this.addressInfo.latitude = res.latitude;
//             this.addressInfo.longitude = res.longitude;
//             console.log(this.addressInfo);
//         }
//     });
// },
// changeSex(index) {
//     this.addressInfo.sex = index;
// }
// }
</script>

<style lang="scss">
page {
    height: 100%;
}
.address-edit-container {
    height: 100%;
    font-size: 30rpx;
    .item {
        padding: 20rpx 0;
        height: 60rpx;
        line-height: 1.2rpx;
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
}
</style>
