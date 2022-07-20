<template>
    <div class="page-explain">
        <div class="title flex-center">整体项目说明</div>

        <div v-for="(linkItem, index) in linkList" :key="index" class="item flex-row">
            <div class="left">{{ linkItem.title }}</div>
            <div class="right flex-item felx-col" @click="clickLink(linkItem)">
                {{ linkItem.content }}
                <div v-if="linkItem.notice">{{ linkItem.notice }}</div>
            </div>
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
const linkList = [
    {
        title: "前端体验：",
        link: "http://yangguang.natappvip.cc",

        content: "http://yangguang.natappvip.cc",
        notice: "",
    },
    {
        title: "后台体验：",
        link: "http://daddf.natappvip.cc",

        content: "http://daddf.natappvip.cc",
        notice: "(该体验域名会因为每次启动随机变动)",
    },
    {
        title: "客户端代码：",
        link: "https://github.com/yangguang-shine/order-meal",

        content: "https://github.com/yangguang-shine/order-meal",
        notice: "",
    },
    {
        title: "管理端代码：",
        link: "https://github.com/yangguang-shine/manage",

        content: "https://github.com/yangguang-shine/manage",
        notice: "",
    },
    {
        title: "服务端代码：",
        link: "https://github.com/yangguang-shine/serve",

        content: "https://github.com/yangguang-shine/serve",
        notice: "",
    },
    {
        title: "客户端核心：",
        link: "https://github.com/yangguang-shine/order-meal",

        content: "Vue3、composition API、TypeScript、Pinia、Uni-App、Sass、ES6及以上",
        notice: "",
    },
    {
        title: "管理端核心：",
        link: "https://github.com/yangguang-shine/manage",

        content: "react-hook、antd、webpack",
        notice: "",
    },
    {
        title: "服务端核心：",
        link: "https://github.com/yangguang-shine/serve",

        content: "node.js、Koa2、Mysql、Natapp（提供外网访问）",
        notice: "",
    },
];
function clickLink(clickLink) {
    window.location.href = clickLink.link;
}
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
        .right {
            color: #ff4b33;
        }
    }
    .item-bottom-0 {
        margin-bottom: 0;
    }
}
</style>
