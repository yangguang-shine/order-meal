<template>
	<div class="order-list-container">
		<div class="tab-list-box flex-row flex-a-center">
			<div class="tab-item flex-item" v-for="(tabItem, index) in ['全部', '待消费', '完成', '退款']" :style="{'color': index === tabIndex ? $mainColor : '#333'}" @click="changeTabIndex(index)" :key="index">{{tabItem}}</div>
			<div class="tab-bottom" :style="{'background': $mainColor, 'left': ((tabIndex * 2 + 1) * 12.5) + '%'}"></div>
		</div>
		<view v-show="tabIndex === allOrderIndex" class="order-list-box" v-for="(orderList, allOrderIndex) in allOrderList" :key="allOrderIndex">
			<div class="order-list-item" v-for="(orderItem, index) in orderList" :key="index">
				<div class="flex-row">
					<image class="shop-img" :src="orderItem.imgUrl"></image>
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
					<div></div>
					<div class="price-box"><span class="price-title">总计：</span><span class="moneu-unit">¥</span><span>{{orderItem.orderAmount}}</span></div>
				</div>
			</div>
		</view>
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

	export default {
		data() {
			return {
				tabIndex: 0,
				allOrderList: [[], [], [], []]
			}
		},
		onShow() {
			this.getOrderList()
		},
		computed: {
			...mapState({
				orderListUpdate: state => state.orderListUpdate
			})
		},
		methods: {
			...mapMutations({
				changeOrderListUpdate: 'changeOrderListUpdate'
			}),
			async getOrderList() {
				try {
					if (!this.orderListUpdate[this.tabIndex]) return;
					this.$set(this.allOrderList, this.tabIndex, [])
					const res = await this.$fetch.get('/api/order/orderList', {
						status: this.tabIndex
					})
					const orderList = (res.data || []).map((orderItem) => ({
						...orderItem,
						orderTime: `${new Date(orderItem.orderTime).toLocaleDateString().replace(/\//g, '-')} ${new Date(orderItem.orderTime).toTimeString().slice(0, 8)}`
					}))
					this.changeOrderListUpdate({ index: this.tabIndex, status: false})
					this.allOrderList[this.tabIndex].push(...orderList)
					console.log(this.allOrderList[this.tabIndex])
				} catch (e) {
					console.log(e)
				}
			},
			changeTabIndex(index) {
				if (index === this.tabIndex) return;
				this.tabIndex = index;
				if (this.allOrderList[this.tabIndex].length) return;
				this.getOrderList()
			}
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
	padding: 0 30rpx;
	.tab-list-box {
		position: fixed;
		top: 0;
		left: 0;
		height: 100rpx;
		width: 100%;
		background-color: #fff;
		z-index: 99
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
		margin-top: 130rpx;
	}
	.order-list-item {
		padding: 40rpx 30rpx;
		background-color: #fff;
		border-radius: 16rpx;
		margin-bottom: 20rpx;
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
}
</style>
