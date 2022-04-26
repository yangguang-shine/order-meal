<template>
    <div class="order-food-info-container">
        <div class="shop-info-box line1 flex-row flex-a-center" @click="toOrder">
            <div class="shop-name">{{ orderDetailShopInfo.shopName }}</div>
            <img class="arrow-right" src="/static/img/arrow-right.png" alt="" />
        </div>
        <div class="order-list-box">
            <order-food-item v-for="(orderFoodItem, index) in orderDetail.foodList" :orderFoodItem="orderFoodItem" :key="index"></order-food-item>
        </div>
        <div class="pack-deliver-price-box" v-if="orderDetail.allPackPrice || orderDetail.businessType === 2">
            <div v-if="orderDetail.allPackPrice" class="pack-price flex-row flex-a-center flex-j-between">
                <div class="left">打包费</div>
                <div class="right">¥{{ orderDetail.allPackPrice }}</div>
            </div>
            <div v-if="orderDetail.businessType === 2" class="deliver-price flex-row flex-a-center flex-j-between">
                <div class="left">配送费</div>
                <div class="right">¥{{ orderDetail.deliverPrice }}</div>
            </div>
        </div>
        <div class="minus-box flex-row flex-a-center" v-if="orderDetail.minusPrice">
            <image class="minus-icon" src="/static/img/orderMinus.svg"></image>
            <div class="flex-item flex-row flex-j-between">
                <div class="minus-title">满减优惠</div>
                <div class="minus-price" :style="{ color: orderDetailShopInfo.mainColor }">-¥{{ orderDetail.minusPrice }}</div>
            </div>
        </div>
        <div class="all-price-box flex-row flex-a-center flex-j-between">
            <div></div>
            <div class="all-price-info flex-row flex-a-center">
                <div class="origin-price">共计￥{{ orderDetail.orderOriginAmount }}</div>
                <div class="discount-price">已优惠￥{{ orderDetail.minusPrice }}</div>
                <div class="pay-price">
                    小计<span class="pay-price-color" :style="{ color: orderDetailShopInfo.mainColor }">￥{{ orderDetail.payPrice }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import OrderFoodItem from "@/components/OrderFoodItem.vue";
import { ShopItemI } from "@/interface/home";
import { OrderDetailI } from "@/interface/order";
import { ComputedActionI, ComputedMutationI, ComputedStateI } from "@/interface/vuex";
import { mapAction, mapMutation, mapState } from "@/utils/mapVuex";
import router from "@/utils/router";
interface StateF {
    orderDetail: ComputedStateI<OrderDetailI>;
    orderDetailShopInfo: ComputedStateI<ShopItemI>;
}
interface MutationF {
    setBusinessType: ComputedMutationI<number>

}
interface ActionF {
    getShopInfo: ComputedActionI<{shopID: number}>

}
const { orderDetail, orderDetailShopInfo }: StateF = mapState();
const { setBusinessType }: MutationF = mapMutation();
const { getShopInfo }: ActionF = mapAction();
async function toOrder() {
    await getShopInfo({
        shopID: orderDetail.value.shopID,
    });
    setBusinessType(orderDetail.value.businessType);
    router.navigateTo({
        name: "menu/info",
        query: {
            businessType: orderDetail.value.businessType,
            shopID: orderDetail.value.shopID,
        },
    });
}
</script>

<style lang="scss" scoped>
.order-food-info-container {
    padding: 30rpx;
    border-radius: 12rpx;
    margin-bottom: 20rpx;
    background-color: #fff;
    .shop-info-box {
        font-size: 36rpx;
        font-weight: bold;
        margin-bottom: 30rpx;
    }
    .arrow-right {
        margin-left: 30rpx;

        width: 12rpx;
        height: 22rpx;
    }
    .order-list-box {
        padding: 0 0 20rpx;
    }
    .order-item {
        margin-bottom: 30rpx;
    }
    .food-img {
        height: 80rpx;
        width: 80rpx;
        margin-right: 20rpx;
    }
    .food-info {
        height: 80rpx;
        flex: 12;
    }
    .food-count {
        flex: 2;
    }
    .food-total-price {
        flex: 3;
        text-align: right;
    }

    .pack-deliver-price-box {
        padding: 0 0 20rpx;
    }
    .pack-price,
    .deliver-price {
        padding: 20rpx 0 0;
        font-size: 28rpx;
        color: #666;
    }
    .dash-split {
        position: relative;
        width: 100%;
        height: 0;
        border-bottom: 3rpx dashed #eee;
        margin-bottom: 10rpx;
    }
    .minus-box {
        margin-top: 10rpx;
    }
    .minus-icon {
        height: 36rpx;
        width: 36rpx;
        margin-right: 20rpx;
    }
    .minus-price {
        font-size: 28rpx;
        font-weight: bold;
        color: #fb4e44;
    }
    .all-price-box {
        // padding: 0 20rpx 0;
        padding-top: 20rpx;
        height: 80rpx;
    }
    .all-price-info {
        color: #999;
        font-size: 24rpx;
        line-height: 40rpx;
    }
    .origin-price,
    .discount-price {
        padding-right: 30rpx;
    }
    .pay-price {
        font-weight: bold;
        font-size: 28rpx;
        color: #333;
    }

    .pay-price-color {
        color: #fb4e44;
    }
}
</style>
