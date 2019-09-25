<template>
	<div class="order-detail-container">
		<div class="order-detail-header">
			<div class="flex-row flex-j-between">
				<div class="order-status">订单{{orderDetail.orderTypeTitle}}</div>
				<div v-if="orerDetail.businessType === 2" class="order-type">外卖</div>
				<div v-else-if="orerDetail.businessType === 3" class="order-type">自提</div>
			</div>
			<div class="order-tip-title">感谢</div>
			<div class="order-button-box flex-row" v-if="orderDetail.orderStatus === 10 || orderDetail.orderStatus === 20 ">
				<div class="button-item" :style="{'color': $mainColor}" @click="cancellOrder">取消订单</div>
			</div>
		</div>
		<div class="order-info-box">
			<div class="shop-info-box line1">
				新微信餐厅正餐店
			</div>
			<div class="order-list-box">
				<div class="order-item" v-for="(foodItem, index) in orderDetail.foodList" :key="index">
					<div class="order-item flex-row">
						<image class="food-img" :src="foodItem.imgUrl ? host + foodItem.imgUrl :'/static/img/default-img.svg'"></image>
						<div class="flex-item flex-row flex-a-center">
							<div class="food-info flex-col flex-j-between">
								<div class="food-name">
									{{foodItem.foodName}}
								</div>
								<div class="food-price">
									¥{{foodItem.price}}
								</div>
							</div>
							<div class="food-count">×{{foodItem.orderCount}}</div>
							<div class="food-total-price">¥{{foodItem.totalPrice}}</div>
						</div>
					</div>
				</div>
			</div>
			<div class="minus-box flex-row" v-if="orderDetail.minusPrice">
				<image class="minus-icon" src="/static/img/orderMinus.svg"></image>
				<div class="flex-row flex-j-between">
					<div class="minus-title">满减优惠</div>
					<div class="minus-price">-¥{{orderDetail.minusPrice}}</div>
				</div>
			</div>
			<div class="food-amount-info flex-row flex-j-between">
				<div>
				</div>
				<div class="flex-row">
					<div v-if="orderDetail.minusPrice">
						已优惠
					</div>
					<div v-if="orderDetail.minusPrice">
						¥{{orderDetail.minusPrice}}
					</div>
					<div>
						总价
					</div>
					<div>
						¥{{orderDetail.orderAmount}}
					</div>
				</div>
			</div>
		</div>
		<div class="order-ext-box">
			<div class="order-ext-title">订单信息</div>
			<div class="order-ext-item flex-row flex-j-between">
				<div>订单号</div>
				<div class="flex-row ">
					<div class="order-key">{{this.orderKey}}</div>
					<div class="order-key-copy" @click="copyOrderKey" :style="{'color': $mainColor}">复制</div>
				</div>
			</div>
			<div class="order-ext-item flex-row flex-j-between">
				<div>下单时间</div>
				<div>
					{{orderDetail.orderTime}}
				</div>
			</div>
			<div v-if="orderDetail.selfTakeTime" class="order-ext-item flex-row flex-j-between">
				<div>自提时间</div>
				<div>
					{{orderDetail.selfTakeTime}}
				</div>
			</div>
			<div v-if="orderDetail.takeOutTime" class="order-ext-item flex-row flex-j-between">
				<div>送达时间</div>
				<div>
					{{orderDetail.takeOutTime}}
				</div>
			</div>
			<div class="order-ext-item flex-row flex-j-between">
				<div>联系信息</div>
				<div>
					杨光
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import host from '@/config/host'

	export default {
		data() {
			return {
				host,
				orderKey: '',
				orderDetail: {}
			}
		},
		onLoad(query) {
			this.orderKey = query.orderKey;
			this.init()
		},
		onShow() {

		},
		computed: {
		},
		methods: {
			async init() {
				const res = await this.$fetch.get('/api/order/orderDetail', { orderKey: this.orderKey })
				console.log(res)
				const orderDetail = res.data || {};
				(orderDetail.foodList || []).forEach((foodItem) => {
					foodItem.totalPrice = (foodItem.price * foodItem.orderCount).toFixed(2)
				})
				orderDetail.orderTypeTitle = this.getOrderTypeTitle(orderDetail.orderStatus, orderDetail.businessType)
				this.orderDetail = res.data || {}
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
			copyOrderKey() {
				wx.setClipboardData({
					data: this.orderDetail.orderKey,
					success: () => {
						wx.getClipboardData({
							success: () => {
								wx.showToast({
									title: '订单号已复制',
									icon: 'none',
									duration: 2000
								})
							}
						})
					}
				})
			},
			async cancellOrder() {
				try {
					this.$showLoading()
					await this.$fetch.post('/api/order/cancell', { orderKey: this.orderKey, shopID: this.orderDetail.shopID })
					this.$hideLoading()
					await this.$showModal({
						content: '取消订单成功'
					})
					this.init()
				} catch(e) {
					this.$hideLoading()
					console.log(e)
				}
			}
		}
	}
</script>

<style lang='scss'>
page {
	height: 100%;
	background-color: #f4f4f4;
}
.order-detail-container {
	padding: 20rpx;
	font-size: 28rpx;
	color: #333;
	.order-detail-header {
		padding: 40rpx 30rpx 30rpx;
		border-radius: 12rpx;
		margin-bottom: 20rpx;
		background-color: #fff;
	}
	.order-status {
		font-size: 36rpx;
		font-weight: bold;
	}
	.order-tip-title {
		margin-top: 30rpx;
	}
	.order-button-box {
		margin-top: 30rpx;
	}
	.button-item {
		height: 60rpx;
		width: 160rpx;
		border-radius: 30rpx;
		line-height: 60rpx;
		text-align: center;
		border: 2rpx solid;
	}
	.order-info-box {
		padding: 30rpx;
		border-radius: 12rpx;
		margin-bottom: 20rpx;
		background-color: #fff;
	}
	.shop-info-box {
		font-size: 36rpx;
		font-weight: bold;
		margin-bottom: 30rpx;
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
		flex: 12
	}
	.food-name {
	}
	.food-count {
		flex: 2
	}
	.food-total-price {
		flex: 3
	}
	.minus-box {
		margin-bottom: 30rpx;
	}
	.minus-icon {
		height: 36rpx;
		width: 36rpx;
		margin-right: 20rpx;
	}
	.order-ext-box {
		padding: 30rpx;
		border-radius: 12rpx;
		margin-bottom: 20rpx;
		background-color: #fff;
	}
	.order-ext-title {
		font-size: 34rpx;
		margin-bottom: 30rpx;
	}
	.order-ext-item {
		margin-bottom: 30rpx;
	}
	.order-key-copy {
		padding-left: 30rpx;
	}
}
</style>
