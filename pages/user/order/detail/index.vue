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

const { $showLoading, $hideLoading, $myrouter, $showModal } = getCurrentInstance().proxy;

interface ActionF {
    getOrderDetail: ComputedActionI<{orderKey: string}>;
}
interface OptionI {
    orderKey: string;
}
const showLoadingFlag: RefI<boolean> = ref(false);
const orderKey: RefI<string> = ref("");
const { getOrderDetail }:ActionF = mapAction(["getOrderDetail"]);

onLoad(async (option: OptionI) => {
    orderKey.value = option.orderKey;
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
    min-height: 100vh;
    background-color: #f4f4f4;
}
.order-detail-container {
    padding: 20rpx 20rpx 40rpx;
    font-size: 28rpx;
    color: #333;
}
</style>
