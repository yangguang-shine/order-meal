<template>
    <div class="order-ext-info-container">
        <div class="order-ext-title">订单信息</div>
        <div v-if="orderDetail.noteText" class="info-item flex-row flex-a-center flex-j-between">
            <div class="left-title">订单备注</div>
            <div class="right-title">{{ orderDetail.noteText }}</div>
        </div>
        <div class="info-item flex-row flex-a-center flex-j-between">
            <div class="left-title">支付方式</div>
            <div class="right-title">在线支付</div>
        </div>
        <div class="info-item flex-row flex-a-center flex-j-between">
            <div class="left-title">订单号</div>
            <div class="right-title" :style="{ color: $mainColor }">{{ orderDetail.orderKey }}</div>
        </div>

        <div class="info-item flex-row flex-a-center flex-j-between">
            <div class="left-title">下单时间</div>
            <div class="right-title">{{ orderDetail.orderTimeDetail }}</div>
        </div>

        <div class="info-item flex-row flex-a-center flex-j-between">
            <div class="left-title">预计送达时间</div>
            <div class="right-title">{{ orderDetail.takeOutTime }}</div>
        </div>
        <div class="info-item flex-row flex-a-center flex-j-between">
            <div class="left-title">送达地址</div>
            <div class="right-title">{{ orderDetail.deliverAddress.address1 + orderDetail.deliverAddress.address2 }}</div>
        </div>
        <div class="info-item flex-row flex-a-center flex-j-between">
            <div class="left-title">用户信息</div>
            <div class="right-title flex-row flex-a-center">
                <div class="mobile">
                    {{ orderDetail.deliverAddress.mobile }}
                    <div class="split" :style="{ background: $mainColor }"></div>
                </div>
                <div class="name">{{ orderDetail.deliverAddress.name }}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ShopItemI } from "@/interface/home";
import { OrderDetailI } from "@/interface/order";
import { ComputedStateI } from "@/interface/vuex";
import { OrderStoreI, useOrderStore } from "@/piniaStore/order";
import { mapState } from "@/utils/mapVuex";
import { toRefs } from "vue";
interface OrderStateF {
    orderDetail: ComputedStateI<OrderDetailI>;
    orderDetailShopInfo: ComputedStateI<ShopItemI>;
}
// order store
const orderStore: OrderStoreI = useOrderStore();
// order state
const { orderDetail, orderDetailShopInfo }: OrderStateF = toRefs(orderStore.orderState);

function copyOrderKey() {
    wx.setClipboardData({
        data: `${orderDetail.value.orderKey}`,
        success: () => {
            wx.showToast({
                title: "订单号已复制",
                icon: "none",
                duration: 2000,
                mask: false
            });
        },
    });
}
</script>

<style lang="scss" scoped>
.order-ext-info-container {
    padding: 0 30rpx 20rpx;
    background-color: #fff;
    font-size: 28rpx;
    margin-top: 20rpx;
    border-radius: 12rpx;
    .order-ext-title {
        padding: 20rpx 0;
        font-size: 34rpx;
        color: #333333;
        font-weight: bold;
        // border-bottom: 1rpx solid #e4e4e4;
    }
    .info-item {
        position: relative;
        height: 88rpx;
        border-bottom: 1rpx solid #e4e4e4;
        // padding-right: 34rpx;
    }
    .info-item:last-child {
        border-bottom: none;
    }
    .mobile {
        position: relative;
        padding-right: 22rpx;
    }
    .split {
        position: absolute;
        top: 50%;
        right: 10rpx;
        transform: translateY(-50%);
        width: 2rpx;
        height: 24rpx;
    }
}
</style>
