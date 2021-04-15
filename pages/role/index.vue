<template>
    <view class="role-container flex-col flex-ja-center">
        <view class="role-box flex-row flex-j-around">
            <view class="user" @click="toUserHome">用户操作</view>
            <view class="manage" @click="toManageHome">管理员操作</view>
        </view>
        <view class="reptile">爬虫</view>
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

<script>
export default {
    onLoad() { },
    methods: {
        toUserHome() {
            const userToken = this.$getStorage('userToken');
            if (userToken) {
                this.$myrouter.navigateTo({
                    name: 'user/home',
                    query: {}
                });
            } else {
                this.$myrouter.navigateTo({
                    name: 'login',
                    query: {
                        roleFlag: 'user'
                    }
                });
            }
        },

        toManageHome() {
            const manageToken = this.$getStorage('manageToken');
            if (manageToken) {
                this.$myrouter.navigateTo({
                    name: 'manage/shop/list'
                });
            } else {
                this.$myrouter.navigateTo({
                    name: 'login',
                    query: {
                        roleFlag: 'manage'
                    }
                });
            }
        },

        toClearUserCookie() {
            this.$setStorage('userToken', null)
            this.$showToast({
                title: '用户登录态注销成功',
                icon: 'none'

            })
        },

        toClearManageCookie() {
            this.$setStorage('manageToken', null)
            this.$showToast({
                title: '管理员登录态注销成功',
                icon: 'none'
            })
        },

        toUserOderList() {
            // this.$myrouter.navigateTo({
            //     name: 'user/order/list'
            // });
			this.$myrouter.navigateTo({
			    name: 'user/order/list'
			});
        },

        toManageOderList() {
            this.$myrouter.reLaunchTo({
                name: 'manage/order/list'
            });
        },
    }
};
</script>

<style lang="scss" scoped>
.role-container {
    height: 100%;
    .role-box {
        width: 100%;
		padding: 40rpx;
    }
    .reptile {
        width: 100%;
        padding: 40rpx;
        text-align: center;
    }
}
</style>
