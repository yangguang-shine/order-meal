<template>
    <div class="address-deliver-container">
        <div class="address-detail-box flex-row flex-a-center" @click="toAddressList">
            <image class="address-icon" src="/static/img/user-confirm/address-icon.png"></image>
            <div class="address-detail flex-item">
                <div class="address-info line1">{{ defaultAddress.address1 }} {{ defaultAddress.address2 }}</div>
                <div class="user-info">{{ defaultAddress.name }} {{ defaultAddress.mobile }}</div>
            </div>
            <image class="arrow-right" src="/static/img/user-confirm/arrow-right.png" mode=""></image>
        </div>
        <picker class="flex-item" mode="time" :value="takeOutTime" start="00:00" end="23:59" @change="takeOutTimeChange">
            <div class="deliver-box flex-row flex-a-center">
                <image class="deliver-icon" src="/static/img/user-confirm/deliver-time-icon.png"></image>
                <div class="deliver-info flex-row flex-item">
                    <div class="send-time">立即送出</div>
                    <div class="deliver-time">大约 {{ takeOutTime }} 送达</div>
                </div>
                <image class="arrow-right" src="/static/img/user-confirm/arrow-right.png" mode=""></image>
            </div>
        </picker>
        <!--        <div class="deliver-box flex-row flex-a-center">
			<picker class="flex-item" mode="time" :value="takeOutTime" start="00:00" end="23:59" @change="takeOutTimeChange">
            <image class="deliver-icon" src="/static/img/user-confirm/deliver-time-icon.png"></image>
				<div class="deliver-info flex-row">
					<div class="send-time">立即送出</div>
					<div class="deliver-time">大约 {{takeOutTime}} 送达</div>
				</div>
			</picker>
        </div> -->
    </div>
</template>

<script lang="ts" setup>
import { mapState, mapMutations, mapActions, mapGetters } from "../../../../../utils/mapVuex";
import { computed, ref, getCurrentInstance } from "vue";
const { $showLoading, $hideLoading, $showModal, $myrouter } = getCurrentInstance().proxy;

const { defaultAddress, takeOutTime } = mapState(["defaultAddress", "takeOutTime"]);
const { setTakeOutTime } = mapMutations(["setTakeOutTime"]);
function toAddressList() {
    $myrouter.navigateTo({
        name: "user/address/list",
        query: {
            fromPage: "userMenuConfirm",
        },
    });
}
function takeOutTimeChange(e: {
    detail: {
        value: string;
    };
}) {
    setTakeOutTime(e.detail.value);
}

// export default {
//     props: {
//         takeOutTime: {
//             type: String,
//             default: "00:00"
//         }
//     },
//     methods: {
//         toAddressList() {},

//         takeOutTimeChange(e) {
//             this.$emit("takeOutTimeChange", e);
//         }
//     }
// };
</script>

<style lang="scss" scoped>
.address-deliver-container {
    background-color: #fff;
    padding: 0 20rpx;
    border-radius: 12rpx;
    .address-detail-box {
        padding: 30rpx 0;
        border-bottom: 1rpx solid #d7d7d7;
    }
    .address-detail {
        width: 600rpx;
    }
    .address-info {
        font-size: 30rpx;
        font-weight: bold;
        line-height: 42rpx;
        color: #333;
    }
    .user-info {
        margin-top: 6rpx;
        font-size: 28rpx;
        line-height: 40rpx;
        color: #777;
    }
    .address-icon,
    .deliver-icon {
        width: 40rpx;
        height: 40rpx;
        padding-right: 20rpx;
    }
    .arrow-right {
        width: 12rpx;
        height: 22rpx;
        padding-right: 15rpx;
    }
    .deliver-box {
        padding: 30rpx 0 40rpx;
        font-size: 30rpx;
        line-height: 42rpx;
    }

    .send-time {
        font-weight: bold;
        color: #333;
        padding-right: 10rpx;
    }
}
</style>
