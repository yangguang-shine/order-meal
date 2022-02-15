<template>
	<div class="order-list-container ">
		<div class="tab-list-box flex-row flex-a-center">
			<div class="tab-item flex-item" v-for="(tabItem, index) in ['全部', '待消费', '完成', '退款']" :style="{ color: index === tabIndex ? $mainColor : '#333' }" @click="changeTabIndex(index)" :key="index">{{ tabItem }}</div>
			<div class="tab-bottom" :style="{ background: $mainColor, left: (tabIndex * 2 + 1) * 12.5 + '%' }"></div>
		</div>
		<view v-show="tabIndex === allOrderIndex" class="order-list-box" v-for="(orderList, allOrderIndex) in allOrderList" :key="allOrderIndex">
			<div class="order-list-item" v-for="(orderItem, index) in orderList" :key="index" @click="toOrderDetail(orderItem)">
				<div class="flex-row">
					<image class="shop-img" :src="orderItem.imgUrl ? host + orderItem.imgUrl : '/static/img/default-img.svg'" mode="scaleToFill"></image>
					<div class="flex-item flex-col flex-j-between">
						<div class="flex-row flex-a-center flex-j-between">
							<!-- <div class="shop-name line1">{{orderItem.shopName}}</div> -->
							<view class="flex-row flex-a-center">
								<div class="shop-name line1">洁柔</div>
								<image class="arrow-left" src="/static/img/shop/arrow-right.png" mode=""></image>
							</view>
							<div class="order-time">{{ orderItem.orderTimeDetail }}</div>
						</div>
						<view class="flex-row flex-a-center flex-j-between">
							<view class="minus-box flex-row"><minus-list :minusList="orderItem.minusList"></minus-list></view>
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
		<div v-if="showErrorList[tabIndex]" class="common-error-box flex-row flex-ja-center"><common-error ></common-error></div>
	</div>
</template>

<script>
import { host } from '@/config/host';
import getShopMinusList from '@/utils/getShopMinusList';
import { timeStampTranslate } from '@/utils/index.js';
import MinusList from '@/components/MinusList.vue';

export default {
	components: {
		MinusList
	},
	data() {
		return {
			tabIndex: 0,
			allOrderList: [[], [], [], []],
			showErrorList: [false, false, false, false],
			host
		};
	},
	async onShow() {
		try {
			this.$showLoading();
			console.log(this.$router);
			await this.getOrderList(this.tabIndex);
		} catch (e) {
			this.$set(this.showErrorList, this.tabIndex, true);
			console.log(e);
		} finally {
			this.$hideLoading();
		}
	},
	computed: {},
	methods: {
		async getOrderList(index) {
			const data = await this.$fetch('/user/order/orderList', {
				status: index
			});
			const orderList = (data || []).map(orderItem => ({
				...orderItem,
				minusList: getShopMinusList(orderItem.minus || ''),
				orderTimeDetail: timeStampTranslate(orderItem.orderTime),
				orderTypeTitle: this.getOrderTypeTitle(orderItem.orderStatus, orderItem.businessType)
			}));
			if (!orderList.length) {
				this.$set(this.showErrorList, index, true);
			} else {
				this.$set(this.showErrorList, index, false);
			}
			this.$set(this.allOrderList, index, []);
			this.allOrderList[index].push(...orderList);
		},
		getOrderTypeTitle(orderStatus, businessType) {
			if (orderStatus === 10) {
				return '待接单';
			} else if (orderStatus === 20) {
				return '已接单';
			} else if (orderStatus === 30) {
				if (businessType === 2) {
					return '已送出';
				} else if (businessType === 3) {
					return '待自提';
				}
				return '';
			} else if (orderStatus === 40) {
				if (businessType === 2) {
					return '已送达';
				} else if (businessType === 3) {
					return '已自提';
				}
				return '';
			} else if (orderStatus === 50) {
				return '已取消';
			}
			return '';
		},
		async changeTabIndex(index) {
			if (index === this.tabIndex) return;
			try {
				this.$showLoading();
				await this.getOrderList(index);
				this.tabIndex = index;
			} catch (e) {
				console.log(e);
			} finally {
				this.$hideLoading();
			}
		},
		toOrderDetail(orderItem) {
			this.$myrouter.navigateTo({
				name: 'user/order/detail',
				query: {
					orderKey: orderItem.orderKey
				}
			});
		},
		async orderAgain(orderItem) {
			try {
				this.$showLoading();
				console.log(orderItem.businessType);
				const shopInfo = await this.$fetch('/user/shop/find', { shopID: orderItem.shopID });
				this.saveShopInfo(shopInfo);
				this.saveBusinessType(orderItem.businessType);
				this.$myrouter.navigateTo({
					name: 'user/menu/list',
					query: {
						orderKey: orderItem.orderKey,
						orderAgain: 'true'
					}
				});
			} catch (e) {
				console.log(e);
			} finally {
				this.$hideLoading();
			}
		},
		saveBusinessType(businessType) {
			uni.setStorageSync('businessType', businessType);
		},
		saveShopInfo(shopItem) {
			if (!shopItem.minusList) {
				shopItem.minusList = getShopMinusList(shopItem.minus || '');
			}
			uni.setStorageSync('shopInfo', shopItem);
		}
	}
};
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
