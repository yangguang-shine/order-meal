<template>
    <view class="login-container flex-row flex-ja-center">
        <div class="login-box">
            <div class="input-item-box flex-row flex-a-center">
                <div class="title">手机号</div>
                <input class="input-item flex-item" type="text" v-model="phone" max-length="50" placeholder="请输入手机号" />
            </div>
            <div class="input-item-box flex-row flex-a-center">
                <div class="title">密码</div>
                <input class="input-item flex-item" type="text" v-model="password" max-length="50" placeholder="请输入密码" />
            </div>
            <div class="submit-button" :style="{ 'background-color': $mainColor }" @click="userLogin">用户登录</div>

            <div class="to-login-box">
                没有用户账号，
                <span :style="{ color: $mainColor }" @click="toRegisterPage">去注册</span>
            </div>
        </div>
    </view>
</template>

<script lang="ts" setup>
import { ref, getCurrentInstance } from "vue";
import { RefI } from "@/interface/vueInterface";
import router from "@/utils/router";
import { showModal, showLoading, hideLoading } from "@/utils/";
import fetch from "@/utils/fetch";
const phone: RefI<string> = ref("");
const password: RefI<string> = ref("");

function toRegisterPage() {
    router.reLaunchTo({
        name: "register",
    });
}

async function userLogin() {
    if (!checkLegal()) return;
    const params = {
        phone: phone.value,
        password: password.value,
    };
    try {
        showLoading();
        await fetch("account/login", params);
        router.reLaunchTo({
            name: "home",
        });
    } catch (e) {
        console.log(e);
    } finally {
        hideLoading();
    }
}
function checkLegal(): boolean {
    const phonereg = /^\d{11}$/;
    const passwordreg = /^[a-zA-Z0-9]{8,30}$/;
    if (!phonereg.test(phone.value)) {
        showModal({
            content: "请输入正确手机号",
        });
        return false;
    }
    if (!passwordreg.test(password.value)) {
        showModal({
            content: "密码只支持8-30位的字母或数字",
        });
        return false;
    }
    return true;
}
</script>

<style lang="scss">
page {
    // height: 100%;
    background-color: #f4f4f4;
}
.login-container {
    height: 100%;
    font-size: 28rpx;
    color: #333;
    .login-box {
        padding: 30rpx;
        width: 550rpx;
        background-color: #fff;
        border-radius: 12rpx;
    }
    .input-item-box {
        height: 100rpx;
        padding-bottom: 10rpx;
    }
    .input-item {
        height: 100rpx;
        border-bottom: 1px solid #eee;
    }
    .title {
        width: 150rpx;
    }
    .submit-button {
        color: #fff;
        height: 60rpx;
        width: 200rpx;
        line-height: 60rpx;
        text-align: center;
        border-radius: 10rpx;
        margin: 30rpx auto;
    }
    .to-login-box {
        padding-top: 10rpx;
        margin: 0 auto;
        width: 400rpx;
        text-align: center;
    }
}
</style>
