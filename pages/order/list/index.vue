<template>
    <div class="order-list-container">
        <div class="tab-list-box flex-row flex-a-center">
            <div class="tab-item flex-item" v-for="(tabItem, index) in ['全部', '待消费', '完成', '退款']" :style="{ color: index === orderTabIndex ? $mainColor : '#333' }" @click="toChangeTabIndex(index)" :key="index">{{ tabItem }}</div>
            <div class="tab-bottom" :style="{ background: $mainColor, left: (orderTabIndex * 2 + 1) * 12.5 + '%' }"></div>
        </div>
        <view v-show="orderTabIndex === allOrderIndex" class="order-list-box" v-for="(orderList, allOrderIndex) in allOrderList" :key="allOrderIndex">
            <div class="order-list-item" v-for="(orderItem, index) in orderList" :key="index" @click="toOrderDetail(orderItem)">
                <div class="flex-row">
                    <image class="shop-img" :src="orderItem.shopInfo.fullImgPath" mode="scaleToFill"></image>
                    <div class="shop-info-right flex-item flex-col flex-j-between">
                        <div class="flex-row flex-a-center flex-j-between">
                            <!-- <div class="shop-name line1">{{orderItem.shopName}}</div> -->
                            <view class="flex-row flex-a-center">
                                <div class="shop-name line1">{{ orderItem.shopInfo.shopName }}</div>
                                <image class="arrow-left" src="/static/img/shop/arrow-right.png" mode=""></image>
                            </view>
                            <div class="order-time">{{ orderItem.orderTimeDetail }}</div>
                        </div>
                        <view class="flex-row flex-a-center flex-j-between">
                            <view class="minus-box flex-row ">
                                <MinusList v-if="orderItem.shopInfo.minusList.length" class="order-shop-minus flex-item flex-shrink" :minusList="orderItem.shopInfo.minusList.length > 4 ? orderItem.shopInfo.minusList.slice(0, 4) : orderItem.shopInfo.minusList" :mainColor="$mainColor"></MinusList>
                            </view>
                            <view class="order-status-box flex-shrink">
                                <text class="order-status-title">状态：</text>
                                <text class="order-status-info" :style="{ color: $mainColor }">{{ orderItem.orderTypeTitle }}</text>
                            </view>
                        </view>
                    </div>
                </div>
                <div class="price-info flex-row flex-j-between flex-a-center">
                    <div class="order-again flex-row flex-ja-center" :style="{ color: $mainColor }" @click.stop="orderAgain(orderItem)">再来一单</div>
                    <div class="price-box flex-row flex-a-end">
                        <view class="minus-info">
                            <text>已优惠:</text>
                            <span class="minus-money-unit">¥</span>
                            <span>{{ orderItem.minusPrice }}</span>
                        </view>
                        <view class="pay-info">
                            <span class="pay-price-title">支付:</span>
                            <span class="pay-money-unit">¥</span>
                            <span>{{ orderItem.payPrice }}</span>
                        </view>
                    </div>
                </div>
                <div class="order-business-title" :style="{ background: $mainColor }">{{ orderItem.orderBusinessTitle }}</div>
            </div>
        </view>
        <div v-if="orderErrorListFlag[orderTabIndex]" class="common-error-box flex-row flex-ja-center">
            <CommonError></CommonError>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { hideLoading, showLoading, showModal, timeStampTranslate } from "@/utils/index";
import MinusList from "@/components/MinusList.vue";
import { toRefs } from "vue";
import { onShow, onLoad, onPageScroll } from "@dcloudio/uni-app";
import { OrderItemI } from "@/interface/order";
import { OrderStoreI, useOrderStore } from "@/piniaStore/order";
import router from "@/utils/router";
import { MenuStoreI, useMenuStore } from "@/piniaStore/menu";
import { OrderStateG } from "@/piniaStore/order/state";
// order store
const orderStore: OrderStoreI = useOrderStore();
// order state
const { allOrderList, orderTabIndex, orderErrorListFlag }: OrderStateG = toRefs(orderStore.orderState);
// order action
const { getOrderList , setOrderErrorListFlag, setOrderTabIndex , setOrderDetailShopInfo } = orderStore;
// menu store
const MenuStore: MenuStoreI = useMenuStore();
// menu action
const { getShopInfo, setBusinessType } = MenuStore;

// const { getOrderList, getShopInfo }: ActionF = mapAction();

// const { setOrderErrorListFlag, setOrderTabIndex, setShopInfo, setBusinessType, setOrderDetailShopInfo }: MutationF = mapMutation();
onShow(() => {
    init();
});
async function init() {
    try {
        showLoading();
        const orderList = await getOrderList();
        setOrderErrorListFlag(orderList.length === 0);
    } catch (e) {
        setOrderErrorListFlag(true);
        console.log(e);
    } finally {
        hideLoading();
    }
}
async function toChangeTabIndex(index: number) {
    try {
        if (index === orderTabIndex.value) return;
        setOrderTabIndex(index);
        showLoading();
        await init();
    } catch (e) {
        console.log(e);
    }
}
function toOrderDetail(orderItem: OrderItemI) {
    setOrderDetailShopInfo(orderItem.shopInfo);
    router.navigateTo({
        name: "order/detail",
        query: {
            orderKey: orderItem.orderKey,
            shopID: orderItem.shopInfo.shopID,
        },
    });
}
async function orderAgain(orderItem: OrderItemI) {
    try {
        showLoading();
        await getShopInfo({
            shopID: orderItem.shopID,
        });
        setBusinessType(orderItem.businessType);
        router.navigateTo({
            name: "menu/info",
            query: {
                orderKey: orderItem.orderKey,
                businessType: orderItem.businessType,
                shopID: orderItem.shopID,
            },
        });
    } catch (e) {
        console.log(e);
    } finally {
        hideLoading();
    }
}
</script>

<style lang="scss">
page {
    height: 100%;
    background-color: #f5f5f5;
}
.order-list-container {
    font-size: 28rpx;
    color: #333;

    padding: 0 20rpx 80rpx;
    .tab-list-box {
        position: fixed;
        top: 0;
        left: 0;
        height: 100rpx;
        width: 100%;
        background-color: #fff;
        z-index: 99;
    }
    .tab-item {
        transition: all 300ms ease-in-out;
        box-sizing: border-box;
        font-weight: bold;
        line-height: 100rpx;
        text-align: center;
        font-size: 34rpx;
    }
    .tab-bottom {
        transition: all 300ms ease-in-out;
        position: absolute;
        bottom: 0;
        transform: translateX(-50%);
        height: 6rpx;
        width: 100rpx;
    }
    .order-list-box {
        padding-top: 120rpx;
        padding-bottom: 40rpx;
    }
    .order-list-item {
        position: relative;
        padding: 30rpx;
        background-color: #fff;
        border-radius: 16rpx;
        margin-bottom: 20rpx;
    }
    .shop-img {
        height: 120rpx;
        width: 120rpx;
        margin-right: 20rpx;
        border-radius: 8rpx;
    }
    .shop-info-right {
        width: 530rpx;
    }
    .shop-name {
        font-size: 32rpx;
        max-width: 230rpx;
    }
    .arrow-left {
        padding-left: 20rpx;
        width: 12rpx;
        height: 22rpx;
    }
    .arrow-first {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 16rpx;
        height: 4rpx;
        transform-origin: right center;
        transform: translate(-50%, -50%) rotate(45deg);
        background-color: #333;
    }
    .arrow-second {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 16rpx;
        height: 4rpx;
        transform-origin: right center;
        transform: translate(-50%, -50%) rotate(-45deg);
        background-color: #333;
    }
    .order-time {
        font-size: 26rpx;
        color: #999;
    }
    .order-status-title {
        color: #999;
    }
    .order-status-info {
        color: #666;
    }
    .price-info {
        margin-top: 20rpx;
    }
    .minus-info {
        margin-right: 30rpx;
        font-size: 28rpx;
        color: #999;
    }
    .pay-info {
        font-size: 34rpx;
        font-weight: bold;
    }
    .price-title {
        color: #666;
        font-weight: normal;
    }
    .money-unit {
        font-size: 26rpx;
        font-weight: bold;
    }
    .order-again {
        height: 50rpx;
        width: 150rpx;
        border: 1rpx solid;
        border-radius: 8rpx;
    }
    .order-business-title {
        position: absolute;
        top: 0;
        right: 0;
        padding: 4rpx 8rpx;
        font-size: 22rpx;
        line-height: 24rpx;
        // background-color: red;
        color: #fff;
    }
    .common-error-box {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
}
</style>
