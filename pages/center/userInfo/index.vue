<template>
    <div class="page-user-info">
        <div class="user-info-list">
            <div class="info-item flex-row flex-a-center flex-j-between" @click="toDisableToast">
                <div class="left">头像</div>
                <div class="right flex-row flex-a-center">
                    <img v-if="userInfo.userImg" class="user-img" :src="userInfo.userImg" alt="" />
                    <div v-else class="user-img no-img"></div>
                    <img class="arrow-right arrow-right-visiable" src="@/static/img/arrow-right.png" alt="" />
                </div>
            </div>

            <div class="info-item flex-row flex-a-center flex-j-between" @click="toEditInfo('nickname')">
                <div class="left">昵称</div>
                <div class="right flex-row flex-a-center">
                    <div class="info">{{ userInfo.nickname }}</div>

                    <img class="arrow-right" src="@/static/img/arrow-right.png" alt="" />
                </div>
            </div>
            <div class="info-item flex-row flex-a-center flex-j-between" @click="toDisableToast">
                <div class="left">修改密码</div>
                <div class="right flex-row flex-a-center">
                    <div class="info">暂不支持设置</div>

                    <img class="arrow-right arrow-right-visiable" src="@/static/img/arrow-right.png" alt="" />
                </div>
            </div>
            <div class="info-item flex-row flex-a-center flex-j-between" @click="toDisableToast">
                <div class="left">手机号</div>
                <div class="right flex-row flex-a-center">
                    <div class="info">{{ userInfo.phone }}</div>

                    <img class="arrow-right arrow-right-visiable" src="@/static/img/arrow-right.png" alt="" />
                </div>
            </div>
        </div>
        <div class="logout-button flex-row flex-ja-center" @click="showLogoutModal">退出该账号</div>
    </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, reactive } from "vue";
import { onShow, onLoad, onPageScroll } from "@dcloudio/uni-app";
import { UserInfoI } from "@/interface/center";
import { ComputedActionI, ComputedStateI } from "@/interface/vuex";
import { mapAction, mapState } from "@/utils/mapVuex";
import { hideLoading, showLoading, showModal } from "@/utils/index";
import router from "@/utils/router";
const { $showLoading, $hideLoading, $showModal, $myrouter, $showToast } = getCurrentInstance().proxy;

interface StateF {
    userInfo: ComputedStateI<UserInfoI>;
}
interface ActionF {
    logout: ComputedActionI
}
const { userInfo }: StateF = mapState(["userInfo"]);
const { logout }: ActionF = mapAction(["logout"]);
function toEditInfo(key: string) {
    $myrouter.navigateTo({
        name: "center/userInfo/edit",
        query: {
            key,
        },
    });
}
function toDisableToast() {
    $showToast({
        title: "暂不支持修改",
    });
}
async function showLogoutModal() {
    try {
        await showModal({
            content: "确认退出该账号吗？",
            showCancelFlag: true,
        });
        showLoading();
        await logout();
        router.redirectTo({
            name: 'login'
        })
    } catch (e) {
        console.log(e);
    } finally {
        hideLoading();
    }
}
</script>

<style lang="scss">
page {
    background-color: #f5f5f5;
}
.page-user-info {
    padding-top: 60rpx;
    .user-info-list {
        background-color: #fff;
    }
    .info-item {
        padding: 0 30rpx;
        height: 100rpx;
    }
    .user-img {
        width: 70rpx;
        height: 70rpx;
        border-radius: 35rpx;
    }
    .no-img {
        background-color: #ddd;
    }
    .left {
        color: #666;
    }
    .right {
        color: #999;
    }
    .arrow-right {
        margin-left: 8px;
        width: 12rpx;
        height: 22rpx;
    }
    .arrow-right-visiable {
        visibility: hidden;
    }
    .logout-button {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100rpx;
        font-size: 30rpx;
        color: rgb(248, 69, 69);
        background-color: #fff;
    }
}
</style>
