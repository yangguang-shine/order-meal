<template>
	<div class="comfirm-order-container">
		<div class="order-type-box">
			<div class="order-type flex-row flex-a-center">
				<div class="order-take" :style="{'color': selectType === 1 ? $mainColor : ''}" @click="changeOrderType(1)">外卖</div>
				<div class="order-self" :style="{'color': selectType === 2 ? $mainColor : ''}" @click="changeOrderType(2)">自提</div>
				<div class="orer-type-bgc" :style="{'left': selectType === 1 ? '0' : '200rpx'}"></div>
			</div>
		</div>
		<div v-if="selectType === 1" class="take-out-box">
			<div class="address-box">
				<div class="address-title line1">哈哈哈哈哈哈哈哈哈哈哈哈或或</div>
				<div class="address-user-info flex-row flex-a-center">
					<div class="user-name">哈哈哈</div>
					<div>1111</div>
				</div>
				<image class="arrow-right"></image>
			</div>
			<div class="delivery-box flex-row flex-a-center">
				<div class="delivery-title">
					送达时间
				</div>
				<div class="deliver-time" :style="{'color': $mainColor}">
					18：00
				</div>
				<image class="arrow-right"></image>
			</div>
		</div>
		<div v-if="selectType === 2" class="self-take-box">
			<div class="shop-address">哈哈哈哈哈哈哈</div>
			<div class="time-phone-box flex-row flex-a-center">
				<div class="self-time-box flex-item">
					<div class="self-take-title">取餐时间</div>
					<div class="self-take-time">05:00</div>
					<image class="arrow-right"></image>
				</div>
				<div class="self-phone-box flex-item">
					<div class="self-take-title">预留电话</div>
					<input type="text" value="1235462215">
					<image class="arrow-right"></image>
				</div>
			</div>
		</div>
		<div class="order-detail-info">
			<div class="order-title-box flex-row flex-j-between">
				<div class="order-info">
					订单信息
				</div>
				<div class="continue-order center" :style="{'color': $mainColor}">
					继续点单
				</div>
			</div>
			<div class="food-category-item" v-for="(foodCategoryItem, index) in cartFoodList" :key="index">
				<div class="food-item flex-row flex-a-center" v-for="(foodItem, foodIndex) in foodCategoryItem.foodList" :key="foodIndex">
					<image class="food-img flex-shrink" :src="foodItem.imgUrl ? host + foodItem.imgUrl : '/static/img/default-img.svg'"></image>
					<div class="food-info">
						<div class="food-name line1">{{foodItem.foodName}}</div>
						<div class="food-price">¥{{foodItem.price}}</div>
					</div>
					<div class="food-count">×{{foodItem.orderCount}}</div>
					<div class="food-count-price">¥{{foodItem.price * foodItem.orderCount}}</div>
				</div>
			</div>
		</div>

		<!-- <div class="center" @click="orderKeyDelete">
			清除
		</div> -->
		<div class="submit-order com-button" @click="submitOrder" :style="{'background-color': $mainColor}">提交</div>
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import host from '@/config/host'

export default {
	data() {
		return {
			orderAmount: '',
			host,
			selectType: 1
		}
	},
	onLoad() {
		this.orderAmount = (this.cartFoodList.reduce((amount, item) => {
				const categoryItemSum = item.foodList.reduce((all, foodItem) => {
					const price = foodItem.price * foodItem.orderCount
					all += price 
					return all
				}, 0)
				amount += categoryItemSum
				return amount
			}, 0)).toFixed(2)
	},
	computed: {
		...mapState({
			cartFoodList: state => state.cartFoodList,
			shopInfo: state => state.shopInfo,
		})
	},
	methods: {
		...mapMutations({
			changeAllOrderListUpdate: 'changeAllOrderListUpdate'
		}),
		// async orderKeyDelete() {
		// 	try {
		// 		const res = await this.$fetch.get('/api/order/deleteOrderKey', {  })
		// 	} catch (e) {
		// 		console.log(e)
		// 	}
		// },
		changeOrderType(index) {
			this.selectType = index
		},
		async submitOrder() {
			if (!this.cartFoodList.length) return;
			const foodList = [];
			this.cartFoodList.forEach((item) => {
				foodList.push(...item.foodList)
			})
			console.log(foodList)
			const res = await this.$fetch.post('/api/order/submit', { foodList, shopID: this.shopInfo.shopID, orderAmount: this.orderAmount })
			this.changeAllOrderListUpdate()
			this.$myrouter.switchTab({
				name: 'orderList'
			})
		},
	}
}
</script>

<style lang="scss">
.comfirm-order-container {
	padding: 30rpx 30rpx 150rpx;
	font-size: 28rpx;
	color: #333;
	background-color: #f5f5f5;
	.order-type-box {
		padding: 30rpx;
		background-color: #fff;
		border-radius: 20rpx;
		margin-bottom: 20rpx;
	}
	.order-type {
		position: relative;
		width: 400rpx;
		border-radius: 40rpx;
		background-color: #888;
	}
	.orer-type-bgc {
		position: absolute;
		top: 0;
		left: 0;
		width: 200rpx;
		height: 80rpx;
		background-color: #eee;
		transition: all 300ms;
		border-radius: 40rpx;
	}
	.order-take, .order-self {
		position: relative;
		width: 200rpx;
		height: 80rpx;
		border-radius: 40rpx;
		line-height: 80rpx;
		text-align: center;
		transition: all 300ms;
		z-index: 1;
	}
	.take-out-box, .self-take-box {
		padding: 30rpx;
		background-color: #f5f5f5;
		border-radius: 20rpx;
		background-color: #fff;
		margin-bottom: 20rpx;
	}
	.address-box {
		position: relative;
		padding-bottom: 20rpx;
	}
	.address-title {
		font-size: 30rpx;
		font-weight: bold;
		max-width: 500rpx;
		margin-bottom: 8rpx;
	}
	.address-user-info {
		font-size: 24rpx;
		color: #999;
	}
	.user-name {
		margin-right: 10rpx;
	}
	.arrow-right {
		position: absolute;
		top: 50%;
		right: 10rpx;
		width: 10rpx;
		height: 10rpx;
		transform: translateY(-50%);
		background-color: red;
	}
	.delivery-box {
		position: relative;
		padding-top: 20rpx; 
	}
	.delivery-title {
		font-weight: bold;
		margin-right: 16rpx;
	}
	.shop-address {
		font-weight: bold;
		padding-bottom: 30rpx;
	}
	.self-time-box, .self-phone-box {
		position: relative;
	}
	.self-take-title {
		font-size: 24rpx;
		color: #999;
		margin-bottom: 6rpx;
	}
	.self-take-time {
		font-weight: bold;
		font-size: 26rpx;
	}
	.self-phone-box {
		padding-left: 40rpx; 
	}
	.deliver-time {
		font-size: 24rpx;
	}
	.order-detail-info {
		padding: 30rpx;
		background-color: #fff;
		border-radius: 20rpx;
	}
	.food-item {
		padding: 10rpx 0;
	}
	.order-title-box {
		margin-bottom: 20rpx;
	}
	.order-info {
		font-weight: bold;
		height: 44rpx;
		line-height: 44rpx;
	}
	.continue-order {
		width: 140rpx;
		height: 44rpx;
		line-height: 40rpx;
		border: 2rpx solid;
		border-radius: 20rpx;
	}
	.food-img {
		height: 90rpx;
		width: 90rpx;
		border-radius: 8rpx;
		margin-right: 12rpx;
	}
	.food-info {
		flex: 10
	}
	.food-name {
		max-width: 450rpx;
	}
	.font-price {
		font-size: 24rpx;
		color: #666;
	}
	.food-count {
		flex: 2;
		font-size: 26rpx;
		text-align: center;
		color: #666;
	}
	.food-count-price {
		flex: 3;
		font-size: 26rpx;
		text-align: center;
	}
	.submit-order {
		position: fixed;
		bottom: 10rpx;
		left: 0;
		width: 100%;
	} 
}
</style>
