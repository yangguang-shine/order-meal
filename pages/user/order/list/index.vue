<template>
    <div class="order-list-container">
        <div class="tab-list-box flex-row flex-a-center">
            <div class="tab-item flex-item" v-for="(tabItem, index) in ['全部', '待消费', '完成', '退款']" :style="{'color': index === tabIndex ? $mainColor : '#333'}" @click="changeTabIndex(index)" :key="index">{{tabItem}}</div>
            <div class="tab-bottom" :style="{'background': $mainColor, 'left': ((tabIndex * 2 + 1) * 12.5) + '%'}"></div>
        </div>
        <view v-show="tabIndex === allOrderIndex" class="order-list-box" v-for="(orderList, allOrderIndex) in allOrderList" :key="allOrderIndex">
            <div class="order-list-item" v-for="(orderItem, index) in orderList" :key="index" @click="toOrderDetail(orderItem)">
                <div class="flex-row">
                    <image class="shop-img" :src="orderItem.imgUrl ? host + orderItem.imgUrl : '/static/img/default-img.svg'" mode="scaleToFill"></image>
                    <div class="flex-item flex-col flex-j-between">
                        <div class="flex-row felx-a-center">
                            <div class="shop-name line1">{{orderItem.shopName}}</div>
                            <div class="arrow-left">
                                <div class="arrow-first"></div>
                                <div class="arrow-second"></div>
                            </div>
                        </div>
                        <div class="order-time">{{orderItem.orderTime}}</div>
                    </div>
                </div>
                <div class="price-info flex-row flex-j-between">
                    <div class="order-again" :style="{'color': $mainColor}" @click.stop="orderAgain(orderItem)">再来一单</div>
                    <div class="price-box"><span class="price-title">总计：</span><span class="moneu-unit">¥</span><span>{{orderItem.orderAmount}}</span></div>
                </div>
            </div>
        </view>
    </div>
</template>

<script>
import { host } from '@/config/host'
import getShopMinusList from '@/utils/getShopMinusList';

export default {
    data() {
        return {
            tabIndex: 0,
            allOrderList: [[], [], [], []],
            host
        }
    },
    onShow() {
        console.log(this.$router)
        this.getOrderList()
    },
    computed: {
    },
    methods: {
        async getOrderList() {
            try {
                this.$showLoading()
                this.$set(this.allOrderList, this.tabIndex, [])
                const res = await this.$fetch.get('/user/order/orderList', {
                    status: this.tabIndex
                })
                const orderList = (res.data || []).map((orderItem) => ({
                    ...orderItem,
                    orderTypeTitle: this.getOrderTypeTitle(orderItem.orderStatus, orderItem.businessType)
                }))
                this.allOrderList[this.tabIndex].push(...orderList)
            } catch (e) {
                console.log(e)
            } finally {
                this.$hideLoading()
            }
        },
        getOrderTypeTitle(orderStatus, businessType) {
            if (orderStatus === 10) {
                return '待接单'
            } else if (orderStatus === 20) {
                return '已接单'
            } else if (orderStatus === 30) {
                if (businessType === 2) {
                    return '已送出'
                } else if (businessType === 3) {
                    return '待自提'
                }
                return ''
            } else if (orderStatus === 40) {
                if (businessType === 2) {
                    return '已送达'
                } else if (businessType === 3) {
                    return '已自提'
                }
                return ''
            } else if (orderStatus === 50) {
                return '已取消'
            }
            return ''
        },
        changeTabIndex(index) {
            if (index === this.tabIndex) return;
            this.tabIndex = index;
            // if (this.allOrderList[this.tabIndex].length) return;
            this.getOrderList()
        },
        toOrderDetail(orderItem) {
            this.$myrouter.navigateTo({
                name: 'user/order/detail',
                query: {
                    orderKey: orderItem.orderKey
                }
            })
        },
        async orderAgain(orderItem) {
            try {
                this.$showLoading()
                console.log(orderItem.businessType)
                const res = await this.$fetch.get('/user/shop/find', { shopID: orderItem.shopID })
                const shopInfo = res.data || {}
                this.saveShopInfo(shopInfo)
                this.saveBusinessType(orderItem.businessType)
                this.$myrouter.navigateTo({
                    name: 'user/menu/list',
                    query: {
                        orderKey: orderItem.orderKey,
                        orderAgain: 'true'
                    }
                })
            } catch (e) {
                console.log(e)
            } finally {
                this.$hideLoading()
            }
        },
        saveBusinessType(businessType) {
            uni.setStorageSync('businessType', businessType)
        },
        saveShopInfo(shopItem) {
            if (!shopItem.minusList) {
                shopItem.minusList = getShopMinusList(shopItem.minus || '')
            }
            uni.setStorageSync('shopInfo',shopItem)
        },
    }
}
</script>

<style lang='scss'>
page {
    height: 100%;
    background-color: #f5f5f5;
}
.order-list-container {
    font-size: 30rpx;
    color: #333;
    line-height: 1;
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
        padding-top: 110rpx;
    }
    .order-list-item {
        padding: 30rpx;
        background-color: #fff;
        border-radius: 16rpx;
        margin-bottom: 10rpx;
    }
    .shop-img {
        height: 80rpx;
        width: 80rpx;
        margin-right: 20rpx;
        border-radius: 8rpx;
    }
    .shop-name {
        font-size: 34rpx;
    }
    .arrow-left {
        height: 34rpx;
        width: 34rpx;
        // height: 20rpx;
        // width: 20rpx;
        // border: 6rpx solid transparent;
        // border-top: 6rpx solid #333;
        // border-right: 6rpx solid #333;
        // transform: rotate(45deg)
        position: relative;
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
        font-size: 24rpx;
        color: #999;
    }
    .price-info {
        margin-top: 30rpx;
    }
    .price-box {
        font-size: 34rpx;
        font-weight: bold;
    }
    .price-title {
        color: #666;
        font-weight: normal;
    }
    .moneu-unit {
        font-size: 26rpx;
        font-weight: bold;
    }
    .order-again {
        height: 60rpx;
        padding: 0 20rpx;
        line-height: 60rpx;
        text-align: center;
        border: 2rpx solid;
        border-radius: 10rpx;
    }
}
</style>
