<template>
    <div class="page-explain">
        <div class="main-title flex-center">整体项目说明</div>
        <div class="link-list">
            <div v-for="(linkItem, index) in linkList" :key="index" class="link-item flex-row">
                <div class="left">{{ linkItem.title }}</div>
                <div class="right flex-item felx-col" @click="clickLink(linkItem)">
                    {{ linkItem.content }}
                    <div v-if="linkItem.notice">{{ linkItem.notice }}</div>
                </div>
            </div>
        </div>

        <div class="main-title flex-center">功能介绍</div>
        <div class="function-list">
            <div class="function-item" v-for="(functionItem, index) in functionList" :key="index">
                <div class="function-title">{{ functionItem.title }}</div>
                <div class="function-content flex-row" v-for="(contentItem, contentIndex) in functionItem.contentList" :key="contentIndex">
                    <div class="num-index">{{contentIndex + 1}}.</div>
                    <div class="flex-item">{{ contentItem }}</div>
                   
                </div>
            </div>
        </div>

        <!-- <div class="function-title"></div>
        <div class="item flex-row">
            <div class="left">客服端功能：</div>
            <div class="right flex-item">
                <div class="function">1登录、注册、个人信息、地址列表、</div>
                <div class="function">1. 首页提供不同的下单类型（外卖、堂食、字体）</div>
            </div>
        </div> -->
    </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, reactive, toRefs } from "vue";
import { onShow, onLoad, onPageScroll } from "@dcloudio/uni-app";
const linkList = [
    {
        title: "前端体验：",
        link: "http://yangguang.natappvip.cc",
        content: "http://yangguang.natappvip.cc",
    },
    {
        title: "后台体验：",
        link: "http://yangguang.natappvip.cc/manage",
        content: "http://yangguang.natappvip.cc/manage",
    },
    {
        title: "客户端代码：",
        link: "https://github.com/yangguang-shine/order-meal",
        content: "https://github.com/yangguang-shine/order-meal",
    },
    {
        title: "管理端代码：",
        link: "https://github.com/yangguang-shine/manage",
        content: "https://github.com/yangguang-shine/manage",
    },
    {
        title: "服务端代码：",
        link: "https://github.com/yangguang-shine/serve",
        content: "https://github.com/yangguang-shine/serve",
    },
    {
        title: "客户端核心：",
        link: "https://github.com/yangguang-shine/order-meal",
        content: "Vue3、composition API、TypeScript、Pinia、Uni-App、Sass、ES6及以上",
    },
    {
        title: "管理端核心：",
        link: "https://github.com/yangguang-shine/manage",
        content: "react-hook、antd、webpack",
    },
    {
        title: "服务端核心：",
        link: "https://github.com/yangguang-shine/serve",
        content: "node.js、Koa2、Mysql、Natapp（提供外网访问）",
    },
];

const homeInfo = {
    title: "首页",
    contentList: ["登录、注册、注销、查看和修改个人信息", "个人地址添加、删除、修改", "支持店铺搜索、不同店铺`业务类型`（外卖、堂食、字体）、店铺不同`排序展示`（综合、销量、距离）、店铺的`满减营销`", "支持店铺的满减营销、轮播广告位、固定浮动广告位"],
};
const menuInfo = {
    title: "下单页",
    contentList: ["支持点餐过程菜品和店铺切换、搜索菜品、菜品和分类`联合滚动`", "支持店铺 `垂直模式` 和 `水平模式` 任意切换", "支持滚动过程菜品`图片懒加载`", "支持菜品详情、购物车总数量查看", "支持购物车同菜品不同规格分别展示", "支持菜品增加数量时，添加`按钮和购物车动效`", "支持`菜品多规格、多规格加价`", "支持菜品打包费、运费、起送价格配置", "支持`分类必选项`、`店铺满减`信息实时查看", "支持菜品增加减少时，所有相关信息动态展示最新价格和数量", "支持菜品`凑单功能`、支持不同的价格区间展示", "支持购物车`一键清空`菜品", "支持动态展示必选项和起送差价按钮", "支持弹框展示过渡动效"],
};

const confirmInfo = {
    title: "确订单页",
    contentList: ["支持送达大约`时间选择`", "支持送达`地址选择`", "支持继续点单", "支持同菜品不同规格分别展示", "支持下单菜品量大时，展示更多下单菜品", "支持查看包装费、运送费、满减优惠、实际预付价", "支持`用户备注`", "支持`下单`"],
};

const orderInfo = {
    title: "订单页",
    contentList: ["支持不同类型的订单显示", "支持订单`再来一单`", "支持订单的业务类型、店铺、订单状态、满减信息、支付信息等", "支持查看订单详情", "支持取消订单", "支持订单相关菜品以及其他信息展示"],
};
const functionList = [homeInfo, menuInfo, confirmInfo, orderInfo];

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
    .main-title {
        font-size: 36rpx;
        padding: 20rpx 0 20rpx;
    }
    .link-list {
        .link-item {
            margin-bottom: 20rpx;
            line-height: 40rpx;
        }
        .left {
            width: 200rpx;
            text-align: right;
        }
        .right {
            color: #ff4b33;
        }
        .link-item:last-child {
            margin-bottom: 0;
        }
    }

    .item-bottom-0 {
        margin-bottom: 0;
    }
    .function-list {
        padding: 0 0 50rpx;
        .function-item {
            padding: 0 30rpx 10rpx;
        }
        .function-title {
            font-size: 32rpx;
            padding: 0 0 10rpx;
            font-weight: bold;
        }
        .function-content {
            font-size: 28rpx;
            line-height: 36rpx;
            padding: 0 0 15rpx 0;
        }
        .num-index {
            width: 44rpx;
        }
    }
}
</style>
