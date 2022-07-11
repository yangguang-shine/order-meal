<template>
    <div class="order-detail-container">
        <OrderDetailHeader :orderKey="orderKey"></OrderDetailHeader>
        <OrderFoodInfo></OrderFoodInfo>
        <OrderExtInfo></OrderExtInfo>
        <CommonLoading v-if="commonLoadingFlag"></CommonLoading>
    </div>
</template>

<script lang="ts" setup>
import OrderDetailHeader from "./components/OrderDetailHeader.vue";
import OrderFoodInfo from "./components/OrderFoodInfo.vue";
import OrderExtInfo from "./components/OrderExtInfo.vue";
import { onShow, onLoad, onPageScroll } from "@dcloudio/uni-app";
import { ref, getCurrentInstance, toRefs } from "vue";
import { mapState, mapAction, mapMutation } from "@/utils/mapVuex";
import { RefI } from "@/interface/vueInterface";
import { ComputedActionI, ComputedStateI } from "@/interface/vuex";
import { OrderItemI } from "@/interface/order";
import { ShopItemI } from "@/interface/home";
import { OrderStoreI, useOrderStore } from "@/piniaStore/order";
import { OrderStateI } from "@/store/state/order";
import router from "@/utils/router";
import { showModal } from "@/utils/";
interface OrderStateF {
    orderDetailShopInfo: ComputedStateI<ShopItemI>;
}
// home store
const orderStore: OrderStoreI = useOrderStore()
// home state
const { orderDetailShopInfo }: OrderStateF = toRefs(orderStore.orderState);
// home action
const { getOrderDetail, getOrderDetailShopInfo } = orderStore;


interface OptionI {
    orderKey: string;
    shopID: string;
}
const commonLoadingFlag: RefI<boolean> = ref(false);
const orderKey: RefI<string> = ref("");
const shopID: RefI<string> = ref("");


onLoad(async (option: OptionI) => {
    orderKey.value = option.orderKey;
    const shopID = Number(option.shopID);
    if (shopID !== orderDetailShopInfo.value.shopID) {
        getOrderDetailShopInfo({
            shopID,
        });
    }
    if (!orderKey.value) {
        await showModal({
            content: "无订单号",
        });
        router.back();
    } else {
        init();
    }
});
async function init() {
    try {
        commonLoadingFlag.value = true;
        await getOrderDetail({
            orderKey: orderKey.value,
        });
    } catch (e) {
        console.log(e);
    } finally {
        commonLoadingFlag.value = false;
    }
}
</script>

<style lang="scss" scoped>
page {
    height: 100vh;
    background-color: #f4f4f4;
}
.order-detail-container {
    min-height: 100vh;

    padding: 20rpx 20rpx 40rpx;
    font-size: 28rpx;
    color: #333;
}
</style>
