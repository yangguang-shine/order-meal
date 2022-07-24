<template>
    <view class="register-container flex-row flex-ja-center">
        <div class="register-box">
            <div class="input-item-box flex-row flex-a-center">
                <div class="title">手机号</div>
                <input class="input-item flex-item" type="text" v-model="phone" max-length="50" placeholder="请输入手机号" />
            </div>
            <div class="input-item-box flex-row flex-a-center">
                <div class="title">密码</div>
                <input class="input-item flex-item" type="password" v-model="password" max-length="50" placeholder="请输入密码" />
            </div>
            <!-- <div class="input-item-box flex-row flex-a-center">
                <div class="title">确认密码</div>
                <input class="input-item flex-item" type="text" v-model="confirmPassword" max-length="50" placeholder="请确认密码" />
            </div>
            <div class="input-item-box flex-row flex-a-center">
                <div class="title">昵称</div>
                <input class="input-item flex-item" type="text" v-model="nickname" max-length="50" placeholder="请输入昵称" />
            </div> -->
            <div class="register-button" :style="{ 'background-color': $mainColor }" @click="userRegister">用户注册</div>
            <div class="to-login-box">
                有用户账号，
                <span :style="{ color: $mainColor }" @click="toLoginPage">去登录</span>
            </div>
 
        </div>
    </view>
</template>

<script lang="ts" setup>
import { ref, getCurrentInstance } from "vue";
import { RefI } from "@/interface/vueInterface";
import { hideLoading, showLoading, showModal } from "@/utils/";
import router from "@/utils/router";
import fetch from "@/utils/fetch";

const phone: RefI<string> = ref("");
const password: RefI<string> = ref("");
const confirmPassword: RefI<string> = ref("");
const nickname: RefI<string> = ref("");
function toLoginPage() {
    router.reLaunchTo({
        name: "login",
    });
}

async function userRegister() {
    if (!checkRegisterLegal()) return;
    const params = {
        phone: phone.value,
        password: password.value,
        nickname: nickname.value || phone.value,
    };
    try {
        showLoading();
        const res = await fetch("account/register", params);
        console.log(res)
        // #ifdef MP-WEIXIN
        uni.setStorageSync('userToken', res.userToken);
        // #endif
        router.reLaunchTo({
            name: "home",
        });
        hideLoading();
    } catch (e) {
        console.log(e);
        hideLoading();
    }
}
function checkRegisterLegal() {
    const phonereg = /^\d{11}$/;
    const passwordreg = /^[a-zA-Z0-9]{8,30}$/;
    if (!phonereg.test(phone.value)) {
        showModal({
            content: "请输入正确手机号",
        });
        return;
    }
    if (!passwordreg.test(password.value)) {
        showModal({
            content: "密码只支持8-30位的字母或数字",
        });
        return;
    }
    // if (password.value !== confirmPassword.value) {
    //     showModal({
    //         content: "两次输入密码不一样",
    //     });
    //     return;
    // }
    // if (!nickname.value) {
    //     showModal({
    //         content: "请输入昵称",
    //     });
    //     return;
    // }
    return true;
}

</script>

<style lang="scss">
page {
    height: 100%;
    background-color: #f4f4f4;
}
.register-container {
    height: 100%;
    font-size: 28rpx;
    color: #333;
    .register-box {
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
    .register-button {
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
