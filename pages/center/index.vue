<template>
    <div class="page-center">
        <div class="user-info-box flex-row flex-a-center flex-j-between" @click="toPageUserInfo">
            <div class="left flex-row flex-a-center">
                <img v-if="userInfo.userImg" :src="userInfo.userImg" alt="" class="user-img" />
                <img v-else src="@/static/img/manage-active.png" alt="" class="user-img" />
                <div class="nickname">{{ userInfo.nickname }}</div>
            </div>
            <img class="right arrow-right" src="@/static/img/right-arrow.png" alt="" />
        </div>
        <div class="tool-list">
            <div v-for="(toolItem, index) in toolsList" :key="index" class="tool-item flex-row flex-a-center flex-j-between" @click="clickToolItem(toolItem)">
                <div class="left flex-row flex-a-center">
                    <img src="@/static/img/manage-active.png" alt="" class="tool-img" />
                    <div class="tool-name">{{ toolItem.title }}</div>
                </div>
                <img class="right arrow-right" src="@/static/img/right-arrow.png" alt="" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, reactive, toRefs } from "vue";
import { onShow, onLoad, onPageScroll } from "@dcloudio/uni-app";

import { CenterStoreI, useCenterStore } from "@/piniaStore/center";
import router from "@/utils/router";
import { CenterStateG } from "@/piniaStore/center/state";
interface ToolItemI {
    img: string;
    title: string;
    name: string;
}
// center store
const centerStore: CenterStoreI = useCenterStore();
const { userInfo }: CenterStateG = toRefs(centerStore.centerState)
const { getUserInfo } = centerStore;


// interface ActionF {
//     getUserInfo: ;
// }

// const { userInfo }: StateF = mapState(["userInfo"]);

onShow(() => {
    init();
});
async function init() {
    try {
        await getUserInfo();
    } catch (e) {
        console.log(e);
    } finally {
    }
}
const toolsList: ToolItemI[] = reactive([
    {
        img: "",
        title: "我的地址",
        name: "address/list",
    },
    {
        img: "",
        title: "我的足迹",
        name: "address/list",
    },
    {
        img: "",
        title: "我的评价",
        name: "address/list",
    },
    {
        img: "",
        title: "个人信息",
        name: "center/userInfo",
    },
] as ToolItemI[]);
function clickToolItem(toolItem: ToolItemI) {
    router.navigateTo({
        name: toolItem.name,
    });
}
function toPageUserInfo() {
    router.navigateTo({
        name: "center/userInfo",
    });
}
</script>
<style>
page {
    background-color: #f5f5f5;
}
</style>
<style lang="scss">
.page-center {
    padding: 0 20rpx;
    height: 100%;
    background-color: #f5f5f5;
    color: $c333;
    font-size: 28rpx;
    line-height: 1.2;
    .user-info-box,
    .tool-list {
        padding: 20rpx;
        margin-top: 20rpx;
        border-radius: 20rpx;
        background-color: #fff;
    }
    .user-info-box {
        .user-img {
            width: 120rpx;
            height: 120rpx;
            border-radius: 50%;
        }
        .nickname {
            margin-left: 12rpx;
            font-size: 34rpx;
            font-weight: bold;
        }
    }
    .right {
        width: 12rpx;
        height: 22rpx;
        // background-color: red;
        margin-right: 20rpx;
    }
    .tool-list {
        .tool-item {
            border-bottom: 1rpx solid #eee;
            margin-bottom: 20rpx;
            padding-bottom: 12rpx;
            &:last-child {
                border-bottom: none;
                margin-bottom: 0;
            }
            &:first-child {
                padding-top: 12rpx;
            }
            // padding: 20rpx;
            .tool-img {
                width: 80rpx;
                height: 80rpx;
                // background-color: red;
            }
            .tool-name {
                margin-left: 12rpx;
                font-size: 32rpx;
            }
            .right {
                color: #999;
                margin-right: 20rpx;
            }
        }
    }
}
</style>
