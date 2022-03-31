<template>
    <view class="role-container flex-col flex-ja-center">
        <view class="role-box flex-row flex-j-around">
            <view class="user" @click="toUserHome">用户操作</view>
            <view class="manage" @click="toManageHome">管理员操作</view>
        </view>
        <view class="reptile" @click="toAnimate">动画</view>
        <view class="role-box flex-row flex-j-around">
            <view class="user" @click="toUserOderList">用户订单列表</view>
            <view class="manage" @click="toManageHome">管理员订单列表</view>
        </view>
        <view class="role-box flex-row flex-j-around">
            <view class="user" @click="toClearUserCookie">注销用户登录</view>
            <view class="manage" @click="toClearManageCookie">注销管理员登录</view>
        </view>
    </view>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    onLoad() {},
    methods: {
        toUserHome(): void {
            const userToken: string = this.$getStorage("userToken");
            if (userToken) {
                this.$myrouter.navigateTo({
                    name: "home",
                    query: {}
                });
            } else {
                this.$myrouter.navigateTo({
                    name: "login",
                    query: {
                        roleName: "user"
                    }
                });
            }
        },

        toManageHome(): void {
            const manageToken: string = this.$getStorage("manageToken");
            if (manageToken) {
                this.$myrouter.navigateTo({
                    name: "manage/shop/list"
                });
            } else {
                this.$myrouter.navigateTo({
                    name: "login",
                    query: {
                        roleName: "manage"
                    }
                });
            }
        },
        toAnimate(): void {
            this.$myrouter.navigateTo({
                name: "animate/list"
            });
        },
        async toClearUserCookie(): Promise<void> {
            this.$setStorage("userToken", null);
            try {
                await this.$showModal({
                    content: "确认清除登录状态吗",
                    showCancel: true,
                    confirmText: "确认清除"
                });
                this.$showLoading()
                await this.$fetch('account/logout')
            } catch (error) {
                return
            } finally {
                this.$hideLoading()
            }
            this.$showToast({
                title: "用户登录态注销成功",
                icon: "none"
            });
        },

        toClearManageCookie(): void {
            this.$setStorage("manageToken", null);
            this.$showToast({
                title: "管理员登录态注销成功",
                icon: "none"
            });
        },

        toUserOderList(): void {
            // this.$myrouter.navigateTo({
            //     name: 'order/list'
            // });
            this.$myrouter.navigateTo({
                name: "order/list"
            });
        },

        toManageOderList(): void {
            this.$myrouter.reLaunchTo({
                name: "manage/order/list"
            });
        }
    }
});
</script>

<style lang="scss" scoped>
.role-container {
    height: 100%;
    .role-box {
        box-sizing: border-box;
        width: 100%;
        padding: 40rpx;
    }
    .reptile {
        box-sizing: border-box;

        width: 100%;
        padding: 40rpx;
        text-align: center;
    }
}
</style>
