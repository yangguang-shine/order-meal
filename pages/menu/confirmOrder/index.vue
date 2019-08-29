<template>
	<div class="comfirm-order-container">
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
			host
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
	padding: 30rpx;
	font-size: 28rpx;
	.food-item {
		padding: 10rpx 0;
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
