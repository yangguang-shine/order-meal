<template>
    <div class="order-header-container">
        <div class="flex-row flex-j-between flex-a-center">
            <div class="order-status flex-row flex-a-center">
                <div class="title">订单</div>
                <div class="detail" :style="{ color: $mainColor }">{{ orderDetail.orderTypeTitle }}</div>
            </div>
            <div class="order-time">{{ orderDetail.orderTimeDetail }}</div>
        </div>
        <div class="order-tip-title">感谢您的支持</div>
        <div class="order-button-box flex-row flex-a-center flex-j-between">
            <div v-if="orderDetail.orderStatus === 10 || orderDetail.orderStatus === 20" class="button-item flex-row flex-ja-center" :style="{ color: $mainColor }" @click="toCancelOrder">取消订单</div>
            <div v-else></div>
            <div class="button-item flex-row flex-ja-center" :style="{ color: $mainColor }" @click="orderAgain()">再来一单</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance, toRefs } from "vue";
import { hideLoading, showLoading, showModal } from "@/utils/";
import router from "@/utils/router";
import { OrderStoreI, useOrderStore } from "@/piniaStore/order";
import { MenuStoreI, useMenuStore } from "@/piniaStore/menu";
import { OrderStateG } from "@/piniaStore/order/state";
// order store
const orderStore: OrderStoreI = useOrderStore()
// order state
const { orderDetail,orderDetailShopInfo }: OrderStateG = toRefs(orderStore.orderState);
// order action
const { getOrderDetail, cancelOrder } = orderStore;
// home store
const menuStore: MenuStoreI = useMenuStore()
// home action
const { setBusinessType, getShopInfo} = menuStore
// props
const props = defineProps({
    orderKey: {
        type: String,
        defult: "",
    },
});


async function toCancelOrder() {
    try {
        await showModal({
            content: "确认取消订单",
            showCancelFlag: true,
        });
        showLoading();
        await cancelOrder({
            orderKey: props.orderKey,
        });
        hideLoading();
        showModal({
            content: "取消订单成功",
        });
        await getOrderDetail({
            orderKey: props.orderKey,
        });
    } catch (e) {
        console.log(e);
    } finally {
        hideLoading();
    }
}

async function orderAgain() {
    try {
        showLoading();
        await getShopInfo({
            shopID: orderDetail.value.shopID,
        });
        setBusinessType(orderDetail.value.businessType);
        router.navigateTo({
            name: "menu/info",
            query: {
                orderKey: orderDetail.value.orderKey,
                businessType: orderDetail.value.businessType,
                shopID: orderDetail.value.shopID
            },
        });
    } catch (e) {
        console.log(e);
    } finally {
        hideLoading();
    }
}
</script>

<style lang="scss" scoped>
.order-header-container {
    font-size: 28rpx;
    color: #333;
    padding: 40rpx 30rpx;
    border-radius: 12rpx;
    margin-bottom: 20rpx;
    background-color: #fff;
    .order-status {
        font-size: 36rpx;
        font-weight: bold;
        .title {
            padding-right: 6rpx;
        }
    }
    .order-time {
        color: #999;
    }

    .order-tip-title {
        margin-top: 30rpx;
    }
    .order-button-box {
        margin-top: 30rpx;
    }
    .button-item {
        font-size: 28rpx;
        height: 50rpx;
        width: 150rpx;
        border-radius: 30rpx;
        border: 1rpx solid;
    }
}
</style>
