<template>
    <div class="order-list-container ">
        <div class="tab-list-box flex-row flex-a-center">
            <div class="tab-item flex-item" v-for="(tabItem, index) in ['全部', '待消费', '完成', '退款']" :style="{ color: index === orderTabIndex ? $mainColor : '#333' }" @click="toChangeTabIndex(index)" :key="index">{{ tabItem }}</div>
            <div class="tab-bottom" :style="{ background: $mainColor, left: (orderTabIndex * 2 + 1) * 12.5 + '%' }"></div>
        </div>
        <view v-show="orderTabIndex === allOrderIndex" class="order-list-box" v-for="(orderList, allOrderIndex) in allOrderList" :key="allOrderIndex">
            <div class="order-list-item" v-for="(orderItem, index) in orderList" :key="index" @click="toOrderDetail(orderItem)">
                <div class="flex-row">
                    <image class="shop-img" :src="orderItem.shopInfo.fullImgPath" mode="scaleToFill"></image>
                    <div class="flex-item flex-col flex-j-between">
                        <div class="flex-row flex-a-center flex-j-between">
                            <!-- <div class="shop-name line1">{{orderItem.shopName}}</div> -->
                            <view class="flex-row flex-a-center">
                                <div class="shop-name line1">{{orderItem.shopInfo.shopName}}</div>
                                <image class="arrow-left" src="/static/img/shop/arrow-right.png" mode=""></image>
                            </view>
                            <div class="order-time">{{ orderItem.orderTimeDetail }}</div>
                        </div>
                        <view class="flex-row flex-a-center flex-j-between">
                            <view class="minus-box flex-row">
                                <MinusList :minusList="orderItem.shopInfo.minusList"></MinusList>
                            </view>
                            <view class="order-status-box">
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
                            <text>已优惠：</text>
                            <span class="minus-money-unit">¥</span>
                            <span>{{ orderItem.minusPrice }}</span>
                        </view>
                        <view class="pay-info">
                            <span class="pay-price-title">支付：</span>
                            <span class="pay-money-unit">¥</span>
                            <span>{{ orderItem.orderAmount }}</span>
                        </view>
                    </div>
                </div>
            </div>
        </view>
        <div v-if="orderErrorListFlag[orderTabIndex]" class="common-error-box flex-row flex-ja-center">
            <CommonError></CommonError>
        </div>
    </div>
</template>

<script lang="ts" setup>
import getShopMinusList from "@/utils/getShopMinusList";
import { timeStampTranslate } from "@/utils/index.js";
import MinusList from "@/components/MinusList.vue";
import { getCurrentInstance } from "vue";
import { mapState, mapAction, mapMutation } from "../../../../utils/mapVuex";
import { onShow, onLoad, onPageScroll } from "@dcloudio/uni-app";
import { ComputedState,  } from "@/interface/vuex";
import { OrderInfoI } from  "@/interface/order"

interface StateF {
    allOrderList: ComputedState<OrderInfoI[][]>, orderTabIndex, orderErrorListFlag
}

const { $showLoading, $hideLoading, $myrouter } = getCurrentInstance().proxy;
const { allOrderList, orderTabIndex, orderErrorListFlag } = mapState([
    "allOrderList",
    "orderTabIndex",
    "orderErrorListFlag",
]);
const { getOrderList, getShopInfo } = mapAction(["getOrderList", 'getShopInfo']);
const {
    setOrderErrorListFlag,
    setOrderTabIndex,
    saveShopInfo,
    saveBusinessType,
    setOrderDetailShopInfo
} = mapMutation(["setOrderErrorListFlag", 'setOrderTabIndex', 'saveShopInfo', 'saveBusinessType', 'setOrderDetailShopInfo']);
onLoad(() => {
    init();
});
async function init() {
    try {
        $showLoading();
		const orderList = await getOrderList();
		console.log(orderList.length === 0)
        setOrderErrorListFlag(orderList.length === 0);
        if (orderList.length) {
        } else {
        }
    } catch (e) {
        setOrderErrorListFlag(true);
        console.log(e);
    } finally {
        $hideLoading();
    }
}
async function toChangeTabIndex(index) {
    try {
        if (index === orderTabIndex) return;
        setOrderTabIndex(index);
        $showLoading();
        await init();
    } catch (e) {
        console.log(e);
    }
}
function toOrderDetail(orderItem) {
    setOrderDetailShopInfo({
        shopName: orderItem.shopName,
        fullImgPath: orderItem.fullImgPath,
    })
    $myrouter.navigateTo({
        name: "user/order/detail",
        query: {
            orderKey: orderItem.orderKey
        }
    });
}
async function orderAgain(orderItem) {
    try {
        $showLoading();
        const shopInfo = await getShopInfo({
            shopID: orderItem.shopID
        });
        saveShopInfo(shopInfo);
        saveBusinessType(orderItem.businessType);
        $myrouter.navigateTo({
            name: "user/menu/info",
            query: {
                orderKey: orderItem.orderKey,
                orderAgain: "true"
            }
        });
    } catch (e) {
        console.log(e);
    } finally {
        $hideLoading();
    }
}

// export default {
//     components: {
//         MinusList
//     },
//     async onShow() {
//         try {
//             this.$showLoading();
//             console.log(this.$router);
//             await this.getOrderList(this.orderTabIndex);
//         } catch (e) {
//             this.$set(this.showErrorList, this.orderTabIndex, true);
//             console.log(e);
//         } finally {
//             this.$hideLoading();
//         }
//     },
//     methods: {
//         async getOrderList(index) {
//             const data = await this.$fetch('user/order/orderList', {
//                 status: index
//             });
//             const orderList = (data || []).map(orderItem => ({
//                 ...orderItem,
//                 minusList: getShopMinusList(orderItem.minus || ''),
//                 orderTimeDetail: timeStampTranslate(orderItem.orderTime),
//                 orderTypeTitle: this.getOrderTypeTitle(orderItem.orderStatus, orderItem.businessType)
//             }));
//             if (!orderList.length) {
//                 this.$set(this.showErrorList, index, true);
//             } else {
//                 this.$set(this.showErrorList, index, false);
//             }
//             this.$set(this.allOrderList, index, []);
//             this.allOrderList[index].push(...orderList);
//         },

//         toOrderDetail(orderItem) {
//             this.$myrouter.navigateTo({
//                 name: 'user/order/detail',
//                 query: {
//                     orderKey: orderItem.orderKey
//                 }
//             });
//         },

//     }
// };
</script>

<style lang="scss">
page {
    height: 100%;
    background-color: #f5f5f5;
}
.order-list-container {
    font-size: 28rpx;
    color: #333;

    padding: 0 20rpx;
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
    .shop-name {
        font-size: 34rpx;
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
    .common-error-box {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
}
</style>
