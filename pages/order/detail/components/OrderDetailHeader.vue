<template>
    <div class="order-header-container">
        <div class="flex-row flex-j-between flex-a-center">
            <div class="order-status flex-row flex-a-center">
                <div class="title">订单</div>
                <div class="detail" :style="{ color: orderDetailShopInfo.mainColor }">{{ orderDetail.orderTypeTitle }}</div>
            </div>
            <div class="order-time">{{ orderDetail.orderTimeDetail }}</div>
        </div>
        <div class="order-tip-title">感谢您的支持</div>
        <div class="order-button-box flex-row flex-a-center flex-j-between">
            <div v-if="orderDetail.orderStatus === 10 || orderDetail.orderStatus === 20" class="button-item flex-row flex-ja-center" :style="{ color: orderDetailShopInfo.mainColor }" @click="toCancelOrder">取消订单</div>
            <div v-else></div>
            <div class="button-item flex-row flex-ja-center" :style="{ color: orderDetailShopInfo.mainColor }" @click="orderAgain()">再来一单</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance } from "vue";
import { mapState, mapMutation, mapAction } from "@/utils/mapVuex";
import { ComputedActionI, ComputedMutationI, ComputedStateI } from "@/interface/vuex";
import { OrderDetailI } from "@/interface/order";
import { ShopItemI } from "@/interface/home";
import { hideLoading, showLoading, showModal } from "@/utils/";
import router from "@/utils/router";
interface StateF {
    orderDetail: ComputedStateI<OrderDetailI>;
    orderDetailShopInfo: ComputedStateI<ShopItemI>
}
interface MutationF {
    saveShopInfo: ComputedMutationI<ShopItemI>;
    saveBusinessType: ComputedMutationI<number>;
}
interface ActionF {
    cancelOrder: ComputedActionI<{orderKey: string}>;
    getOrderDetail: ComputedActionI<{ orderKey: string }>;
    getShopInfo: ComputedActionI<{ shopID: number }>;
}
const props = defineProps({
    orderKey: {
        type: String,
        defult: "",
    },
});


const { orderDetail, orderDetailShopInfo }: StateF = mapState();

const { saveShopInfo, saveBusinessType,  }: MutationF = mapMutation();
const { cancelOrder, getOrderDetail, getShopInfo }: ActionF = mapAction();

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
        saveBusinessType(orderDetail.value.businessType);
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
