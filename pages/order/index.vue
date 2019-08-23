<template>
	<div class="order-list-container">
		<div class="tab-list-box flex-row flex-a-center">
			<div class="tab-item flex-item" v-for="(tabItem, index) in ['全部', '待消费', '完成', '退款']" :style="{'color': index === selectIndex ? $mainColor : '#333'}" @click="changeTabIndex(index)" :key="index">{{tabItem}}</div>
			<div class="tab-bottom" :style="{'background': $mainColor, 'left': ((selectIndex * 2 + 1) * 12.5) + '%'}"></div>
		</div>
		<view class="order-list-box">
			<div class="order-list-item" ></div>
		</view>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				selectIndex: 0,
				orderList: []
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			async init() {
				try {
					const res = await this.$fetch.get('/api/order/orderList')
					const orderList = res.data || []
					this.orderList = orderList
				} catch (e) {
					console.log(e)
				}
			},
			changeTabIndex(index) {
				this.selectIndex = index
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
	.tab-list-box {
		position: fixed;
		top: 0;
		left: 0;
		height: 100rpx;
		width: 100%;
		background-color: #fff;
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
}
</style>
