<template>
    <div class="page-explain">
        <div class="title flex-center">整体项目说明</div>
        <div class="item flex-row">
            <div class="left">前端体验：</div>
            <div class="right flex-item">http://yangguang.natappvip.cc</div>
        </div>
        <div class="item flex-row">
            <div class="left">后台体验：</div>
            <div class="right flex-item felx-col">
                http://daddf.natappvip.cc
                <div>(该体验域名会因为每次启动随机变动)</div>
            </div>
        </div>
        <div class="item flex-row">
            <div class="left">客户端代码：</div>
            <div class="right flex-item">https://github.com/yangguang-shine/order-meal</div>
        </div>

        <div class="item flex-row">
            <div class="left">管理端代码：</div>
            <div class="right flex-item">https://github.com/yangguang-shine/manage</div>
        </div>
        <div class="item flex-row">
            <div class="left">服务端代码：</div>
            <div class="right flex-item">https://github.com/yangguang-shine/manage</div>
        </div>
        <div class="item flex-row">
            <div class="left">客户端核心：</div>
            <div class="right flex-item">Vue3、composition API、TypeScript、Pinia、Uni-App、Sass、ES6及以上</div>
        </div>
        <div class="item flex-row">
            <div class="left">管理端核心：</div>
            <div class="right flex-item">react-hook、antd、webpack</div>
        </div>
        <div class="item flex-row item-bottom-0">
            <div class="left">服务端核心：</div>
            <div class="right flex-item">node.js、Koa2、Mysql、Natapp（提供外网访问）、</div>
        </div>
        <div class="title flex-center">功能介绍</div>
        <div class="item flex-row">
            <div class="left">客服端功能：</div>
            <div class="right flex-item">
               <div class="function">1. 登录、注册、个人信息、地址列表、</div>
               <div class="function">1. 首页提供不同的下单类型（外卖、堂食、字体）</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, reactive, toRefs } from "vue";
import { onShow, onLoad, onPageScroll } from "@dcloudio/uni-app";
import { mapAction, mapState } from "@/utils/mapVuex";
import { ComputedActionI, ComputedStateI } from "@/interface/vuex";
import { UserInfoI } from "@/interface/center";
import { storeToRefs } from "pinia";

import { CenterStoreI, useCenterStore } from "@/piniaStore/center";
import router from "@/utils/router";

// interface ActionF {
//     getUserInfo: ComputedActionI;
// }

// const { userInfo }: StateF = mapState(["userInfo"]);

onShow(() => {});
</script>
<style>
/* page {
    background-color: #f5f5f5;
} */
</style>
<style lang="scss">
.page-explain {
    height: 100%;
    font-size: 28rpx;
    .title {
        font-size: 36rpx;
        padding: 30rpx 0;
    }
    .item {
        margin-bottom: 30rpx;
        line-height: 40rpx;
        .left {
            width: 200rpx;
            text-align: right;
        }
    }
    .item-bottom-0 {
        margin-bottom: 0;
    }
}
</style>
