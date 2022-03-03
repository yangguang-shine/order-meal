<template>
    <div class="footer-button-container">
        <div class="footer-fixed">
            <div class="footer-box">
                <div class="footer-discount-price"></div>
                <div class="footer-pay-price"></div>
                <div class="submit-order-button flex-row flex-ja-center" :style="{'background': $mainColor}" @click="toSubmitOrder">提交订单</div>
            </div>
        </div>
        <div class="footer-block"></div>
    </div>
</template>

<script lang="ts" setup>
import { getCurrentInstance } from "vue";
import {
    mapMutations,
    mapActions,
    mapState,
    mapGetters
} from "../../../../../utils/mapVuex";
const { submitOrder } = mapActions("user", [
    "submitOrder",
]);
const { clearCart, setNoteText } =  mapMutations('user', ['clearCart', 'setNoteText'])
const {
    cartCategoryList,
    takeOutTime,
    defaultAddress,
    businessType,
    shopInfo,
    noteText
} = mapState("user", [
    "cartCategoryList",
    "takeOutTime",
    "defaultAddress",
    "businessType",
    "shopInfo",
    "noteText"
]);
const { payPrice, originOrderAmount, minusPrice,orderFoodList } = mapGetters("user", [
    "payPrice",
    "originOrderAmount",
    "minusPrice",
    "orderFoodList"
]);

const { $showLoading, $hideLoading, $myrouter } = getCurrentInstance().proxy;

async function toSubmitOrder() {
    try {
        if (!cartCategoryList.value.length) return;
        $showLoading();
        // const query = {};
        // if (businessType.value === 2) {
        //     query.takeOutTime = takeOutTime.value;
        //     query.address = JSON.stringify(defaultAddress.value);
        // }
        // console.log(111111);
        // console.log({
        //     foodList: orderFoodList.value,
        //     shopID: shopInfo.value.shopID,
        //     orderAmount: payPrice.value,
        //     businessType: businessType.value,
        //     minusPrice: minusPrice.value,
        //     originOrderAmount: originOrderAmount.value,
        //     noteText: noteText.value,
        //     ...query
        // });
        await submitOrder();
        clearCart();
        setNoteText('')
        $myrouter.reLaunchTo({
            name: "user/order/list"
        });
    } catch (e) {
        console.log(e);
    } finally {
        $hideLoading();
    }
}
</script>

<style lang="scss" scoped>
.footer-button-container {
    .footer-fixed {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 140rpx;
        background-color: #fff;
        box-sizing: border-box;
    }

    .footer-box {
        background-color: #3c3c3c;
        height: 100rpx;
        width: 100%;
        padding-right: 250rpx;
        box-sizing: border-box;
    }
    .submit-order-button {
        font-size: 32rpx;
        position: absolute;
        top: 0;
        right: 0;
        width: 250rpx;
        height: 100rpx;
        color: #fff;
        font-weight: normal;
    }
    .footer-block {
        width: 100%;
        height: 140rpx;
        margin-top: 20rpx;
    }
}
</style>
       
       
