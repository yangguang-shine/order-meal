<template>
	<div class="order-header-container">
		<div class="flex-row flex-j-between flex-a-center">
			<div class="order-status flex-row flex-a-center">
				<div class="title">订单</div>
				<div class="detail" :style="{ color: $mainColor }">{{ orderDetail.orderTypeTitle }}</div>
			</div>
			<div class="order-time">{{ orderDetail.orderTimeDetail }}</div>
		</div>
		<div class="order-tip-title">感谢您的支持</div>
		<div class="order-button-box flex-row flex-a-center flex-j-between">
			<div v-if="orderDetail.orderStatus === 10 || orderDetail.orderStatus === 20" class="button-item flex-row flex-ja-center" :style="{ color: $mainColor }" @click="cancellOrder">取消订单</div>
			<div v-else></div>
			<div class="button-item flex-row flex-ja-center" :style="{ color: $mainColor }" @click="orderAgain()">再来一单</div>
		</div>
	</div>
</template>

<script>

export default {
	props: {
		orderDetail: {
			type: Object,
			default: () => {}
		}
	},
	data() {
		return {
		};
	},
	methods: {
		async cancellOrder() {
			try {
				await this.$showModal({
					content: '确认取消订单',
					showCancel: true,
				})
				this.$emit('cancellOrder')
			} catch(e) {
				console.log(e)
			}
		},
		orderAgain() {
			this.$emit('orderAgain')
		},
	}
};
</script>

<style lang="scss" scoped>
.order-header-container {
	font-size: 28rpx;
	color: #333;
	padding: 40rpx 30rpx;
	border-radius: 12rpx;
	margin-bottom: 20rpx;
	background-color: #fff;
	.order-status {
		font-size: 36rpx;
		font-weight: bold;
		.title {
			padding-right: 6rpx;
		}
	}
	.order-time {
		color: #999;
	}
	
	.order-tip-title {
		margin-top: 30rpx;
	}
	.order-button-box {
		margin-top: 30rpx;
	}
	.button-item {
		font-size: 28rpx;
		height: 50rpx;
		width: 150rpx;
		border-radius: 30rpx;
		border: 1rpx solid;
	}
}
</style>
