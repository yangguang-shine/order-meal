<template>
	<div class="order-detail-container">
		<order-detail-header :orderDetail="orderDetail" @cancelOrder="cancelOrder" @orderAgain="orderAgain"></order-detail-header>
		<order-food-info :orderDetail="orderDetail"></order-food-info>
		<order-ext-info :orderDetail="orderDetail"></order-ext-info>
		<common-loading v-if="showLoadingFlag"></common-loading>
	</div>
</template>

<script>
import getShopMinusList from '@/utils/getShopMinusList';
import { timeStampTranslate } from '@/utils/index.js'
import OrderDetailHeader from './components/OrderDetailHeader.vue'
import OrderFoodInfo from './components/OrderFoodInfo.vue'
import OrderExtInfo from './components/OrderExtInfo.vue'

export default {
	components: {
		OrderDetailHeader,
		OrderFoodInfo,
		OrderExtInfo,
	},
	data() {
		return {
			orderKey: '',
			orderDetail: {
				address: {}
			},
			showLoadingFlag: true
		};
	},
	async onLoad(query) {
		try {
			this.showLoadingFlag = true
			this.orderKey = query.orderKey || '';
			await this.init();
		} catch(e) {
			console.log(e)
		} finally {
			this.showLoadingFlag = false
		}
	},
	computed: {},
	methods: {
		async init() {
			try {
				const orderDetail = await this.$fetch('user/order/orderDetail', { orderKey: this.orderKey });
				(orderDetail.foodList || []).forEach(foodItem => {
					foodItem.foodItemAmount = (foodItem.price * foodItem.orderCount).toFixed(2);
				});
				orderDetail.orderTypeTitle = this.getOrderTypeTitle(orderDetail.orderStatus, orderDetail.businessType);
				orderDetail.orderTimeDetail = timeStampTranslate(orderDetail.orderTime)
				orderDetail.address = JSON.parse(orderDetail.address)
				this.orderDetail = orderDetail;
			} catch (e) {
				console.log(e);
			}
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
		copyOrderKey() {
			wx.setClipboardData({
				data: `${this.orderDetail.orderKey}`,
				success: () => {
					wx.showToast({
						title: '订单号已复制',
						icon: 'none',
						duration: 2000
					});
				}
			});
		},
		async cancelOrder() {
			try {
				this.$showLoading();
				await this.$fetch('user/order/cancel', { orderKey: this.orderKey, shopID: this.orderDetail.shopID });
				this.$showModal({
					content: '取消订单成功'
				});
				this.init();
			} catch (e) {
				console.log(e);
			} finally {
				this.$hideLoading();
			}
		},
		async orderAgain() {
			try {
				const shopInfo = await this.$fetch('user/shop/find', { shopID: this.orderDetail.shopID });
				this.saveShopInfo(shopInfo);
				this.saveBusinessType(this.orderDetail.businessType);
				this.$myrouter.navigateTo({
					name: 'user/menu/info',
					query: {
						orderKey: this.orderDetail.orderKey,
						orderAgain: 'true'
					}
				});
			} catch (e) {
				console.log(e);
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
