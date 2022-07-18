<template>
    <div class="page-user-info-edit">
        <div v-if="key === 'nickname'" class="flex-col">
            <div class="title">昵称:</div>
            <input class="key-input" type="text" v-model="nicknameInput" />
            <div class="tips">限4-16个字符，一个汉字为2个字符</div>
            <div class="confirm-button flex-row flex-ja-center" :style="{background: $mainColor}" @click="toShowConfrimModal">确认</div>
        </div>
        <!-- 后续to do -->
        <div v-else-if="key === 'passward'"></div>
    </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, reactive, ref, toRefs } from "vue";
import { onShow, onLoad, onPageScroll } from "@dcloudio/uni-app";
import { UserInfoI } from "@/interface/center";
import { ComputedActionI, ComputedStateI } from "@/interface/vuex";
import { mapAction, mapState } from "@/utils/mapVuex";
import { RefI } from "@/interface/vueInterface";
import { showLoading, showModal, showToast, hideLoading } from "@/utils/";
import { InputEventI } from "@/interface/input";
import { CenterStoreI, useCenterStore } from "@/piniaStore/center";
import router from "@/utils/router";
import { storeToRefs} from 'pinia'

interface OptionI {
    key: string;
}
interface CenterStateF {
    userInfo: ComputedStateI<UserInfoI>;
}
// center store
const centerStore: CenterStoreI = useCenterStore()
const { userInfo }: CenterStateF = toRefs(centerStore.centerState);
const { changeUserInfo,getUserInfo } = centerStore;
const key: RefI<string> = ref("");
const nicknameInput: RefI<string> = ref(userInfo.value.nickname);
const keyList = ["nickname"];
onLoad(async (option: OptionI) => {
    key.value = option.key;
    if (!keyList.find((item) => item === key.value)) {
        await showModal({
            content: "链接错误",
        });
        router.back();
    }
});

function getByteLen(val: string): number {
    var len = 0;
    for (var i = 0; i < val.length; i++) {
        var a = val.charAt(i);
        if (a.match(/[^\x00-\xff]/gi) != null) {
            len += 2;
        } else {
            len += 1;
        }
    }
    return len;
}
async function toShowConfrimModal() {
    const len = getByteLen(nicknameInput.value);
    if (len < 4 || len > 16) {
        showToast({
            title: "请输入符合要求长度的字符",
        });
        return;
    }
    try {
        await showModal({
            content: "确认使用修改吗",
            showCancelFlag: true,
        });
        showLoading();
        await changeUserInfo({
            key: key.value,
            value: nicknameInput.value,
        });
        getUserInfo();
        router.back();
    } catch (e) {
        console.log(e);
    } finally {
        hideLoading();

    }
}
</script>
<style>
page {
    background-color: #f5f5f5;
}
</style>
<style lang="scss">
.page-user-info-edit {
    // border-top: 1rpx solid #666;
    padding: 40rpx 20rpx;
    font-size: 28rpx;
    .title {
        height: 50rpx;
    }
    .key-input {
        height: 70rpx;
        border-bottom: 1rpx solid #ccc;
        font-size: 30rpx;
    }
    .tips {
        margin-top: 20rpx;
        font-size: 26rpx;
    }
    .confirm-button {
        margin-top: 40rpx;
        height: 80rpx;
        // background-color: red;
        color: #fff;
        font-weight: bold;
        font-size: 32rpx;
        border-radius: 30rpx;
    }
}
</style>
