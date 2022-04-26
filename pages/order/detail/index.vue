<template>
    <div class="order-detail-container">
        <OrderDetailHeader :orderKey="orderKey"></OrderDetailHeader>
        <OrderFoodInfo></OrderFoodInfo>
        <OrderExtInfo></OrderExtInfo>
        <CommonLoading v-if="showLoadingFlag"></CommonLoading>
    </div>
</template>

<script lang="ts" setup>
import OrderDetailHeader from "./components/OrderDetailHeader.vue";
import OrderFoodInfo from "./components/OrderFoodInfo.vue";
import OrderExtInfo from "./components/OrderExtInfo.vue";
import { onShow, onLoad, onPageScroll } from "@dcloudio/uni-app";
import { ref, getCurrentInstance } from "vue";
import { mapState, mapAction, mapMutation } from "@/utils/mapVuex";
import { RefI } from "@/interface/vueInterface";
import { ComputedActionI, ComputedStateI } from "@/interface/vuex";
import { OrderItemI } from "@/interface/order";
import { ShopItemI } from "@/interface/home";

const { $showLoading, $hideLoading, $myrouter, $showModal } = getCurrentInstance().proxy;
interface StateF {
    orderDetailShopInfo: ComputedStateI<ShopItemI>;
}
interface ActionF {
    getOrderDetail: ComputedActionI<{ orderKey: string }>;
    getOrderDetailShopInfo: ComputedActionI<{ shopID: number }>;
}
interface OptionI {
    orderKey: string;
    shopID: string;
}
const showLoadingFlag: RefI<boolean> = ref(false);
const orderKey: RefI<string> = ref("");
const shopID: RefI<string> = ref("");
const { orderDetailShopInfo }: StateF = mapState();

const { getOrderDetail, getOrderDetailShopInfo }: ActionF = mapAction();

onLoad(async (option: OptionI) => {
    orderKey.value = option.orderKey;
    const shopID = Number(option.shopID);
    console.log(shopID !== orderDetailShopInfo.value.shopID)
    if (shopID !== orderDetailShopInfo.value.shopID) {
        getOrderDetailShopInfo({
            shopID,
        });
    }
    if (!orderKey.value) {
        await $showModal({
            content: "无订单号",
        });
        $myrouter.back();
    } else {
        init();
    }
});
async function init() {
    try {
        showLoadingFlag.value = true;
        await getOrderDetail({
            orderKey: orderKey.value,
        });
    } catch (e) {
        console.log(e);
    } finally {
        showLoadingFlag.value = false;
    }
}
</script>

<style lang="scss" scoped>
page {
    height: 100vh;
    background-color: #f4f4f4;
}
.order-detail-container {
    height: 100vh;

    padding: 20rpx 20rpx 40rpx;
    font-size: 28rpx;
    color: #333;
}
</style>
