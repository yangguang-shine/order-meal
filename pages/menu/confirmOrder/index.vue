<template>
	<div class="comfirm-order-container">
		<div v-if="!businessType" class="order-type-box">
			<div class="order-type flex-row flex-a-center">
				<div class="order-take" :style="{'color': selectBusinessType === 2 ? $mainColor : ''}" @click="changeOrderType(2)">外卖</div>
				<div class="order-self" :style="{'color': selectBusinessType === 3 ? $mainColor : ''}" @click="changeOrderType(3)">自提</div>
				<div class="orer-type-bgc" :style="{'left': selectBusinessType === 2 ? '0' : '200rpx'}"></div>
			</div>
		</div>
		<div v-if="businessType === 2 || selectBusinessType === 2" class="take-out-box">
			<div class="address-box" @click="toSelectAddress">
				<div class="address-title line1">{{defaultAddress.address1 || ''}} {{defaultAddress.address2 || ''}}</div>
				<div class="address-user-info flex-row flex-a-center">
					<div class="user-name">{{defaultAddress.name || ''}}</div>
					<div>{{defaultAddress.mobile || ''}}</div>
				</div>
				<image class="arrow-right" src="/static/img/right-arrow.png"></image>
			</div>
			<picker mode="time" :value="takeOutTime" start="09:00" end="23:00" @change="takeOutTimeChange">
				<div class="delivery-box flex-row flex-a-center">
					<div class="delivery-title">
						送达时间:
					</div>
					<div class="deliver-time" :style="{'color': $mainColor}">
						{{takeOutTime}}
					</div>
					<image class="arrow-right" src="/static/img/right-arrow.png"></image>
				</div>
			</picker>
		</div>
		<div v-if="businessType === 3 || selectBusinessType === 3" class="self-take-box">
			<div class="shop-address">{{shopInfo.shopName}}</div>
			<div class="time-phone-box flex-row flex-a-center">
				<picker mode="time" :value="selfTakeTime" start="09:00" end="23:00" @change="selfTakeTimeChange" class="self-time-picker flex-col flex-j-between">
					<div class="self-time-box flex-col flex-j-between">
						<div class="self-take-title">取餐时间</div>
						<div class="self-take-time">{{selfTakeTime}}</div>
						<image class="arrow-right" src="/static/img/right-arrow.png"></image>
					</div>
				</picker>
				<div class="self-phone-box  flex-col flex-j-between">
					<div class="self-take-title">预留电话</div>
					<input type="number" class="reserve-phone-input" value="1235462215" placeholder="请输入手机号" maxlength="20">
					<image class="arrow-right" src="/static/img/right-arrow.png"></image>
				</div>
			</div>
		</div>
		<div class="order-detail-info">
			<div class="order-title-box flex-row flex-j-between">
				<div class="order-info">
					订单信息
				</div>
				<div class="continue-order center" :style="{'color': $mainColor}" @click="continueOrder">
					继续点单
				</div>
			</div>
			<div class="food-category-item" v-for="(foodCategoryItem, index) in cartFoodList" :key="index">
				<div class="food-item flex-row flex-a-center" v-for="(foodItem, foodIndex) in foodCategoryItem.foodList" :key="foodIndex">
					<image class="food-img flex-shrink" :src="foodItem.imgUrl ? host + foodItem.imgUrl : '/static/img/default-img.svg'" mode="aspectFill" ></image>
					<div class="food-info flex-col flex-j-between">
						<div class="food-name line1">{{foodItem.foodName}}</div>
						<div class="food-price"><span class="money-unit">¥</span>{{foodItem.price}}</div>
					</div>
					<div class="food-count">×{{foodItem.orderCount}}</div>
					<div class="food-count-price"><span class="money-unit">¥</span>{{foodItem.price * foodItem.orderCount}}</div>
				</div>
			</div>
			<div class="minus-info-box flex-row flex-a-center" v-if="minusPrice">
				<image class="minus-icon" src="/static/img/orderMinus.svg"></image>
				<div class="flex-item flex-row flex-j-between flex-a-center" :style="{color: $mainColor}">
					<div class="minus-title">
						满减优惠
					</div>
					<div class="minus-price">-¥{{minusPrice}}</div>
				</div>
			</div>
			<div class="total-info-info flex-row flex-j-between">
				<div>
				</div>
				<div class="flex-row flex-a-center">
					<div v-if="minusPrice">已优惠</div>
					<div class="order-minus-price" v-if="minusPrice" :style="{color: $mainColor}" ><span class="money-unit">¥</span>{{minusPrice}}</div>
					<div class="order-due-amount-title">总计</div>
					<div class="order-due-amount"><span class="money-unit">¥</span>{{dueAmount}}</div>
				</div>
			</div>
		</div>
		<div class="submit-order com-button" @click="submitOrder" :style="{'background-color': $mainColor}">提交</div>
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import host from '@/config/host'

export default {
	data() {
		return {
			originOrderAmount: '',
			host,
			selectBusinessType: 2,
			takeOutTime: '12:00',
			selfTakeTime: '12:00',
			reservePhone: ''
		}
	},
	onLoad() {
		this.selectBusinessType = this.businessType || 2
		this.init()
		this.originOrderAmount = Number((this.cartFoodList.reduce((amount, item) => {
				const categoryItemSum = item.foodList.reduce((all, foodItem) => {
					const price = foodItem.price * foodItem.orderCount
					all += price 
					return all
				}, 0)
				amount += categoryItemSum
				return amount
			}, 0)).toFixed(2))
	},
	computed: {
		...mapState({
			cartFoodList: state => state.cartFoodList,
			shopInfo: state => state.shopInfo,
			defaultAddress: state => state.defaultAddress,
			shopInfo: state => state.shopInfo,
			businessType: state => state.businessType,
		}),
		dueAmount() {
			return Number((this.originOrderAmount - this.minusPrice).toFixed(2))
		},
		minusPrice() {
			if (!this.shopInfo.minusList.length) {
				return 0
			} else {
				const length = this.shopInfo.minusList.length
				const findMinusItem = this.shopInfo.minusList.find((item, index, arr) => {
					if (index === length - 1) {
						if (Number(item.reach) <= Number(this.originOrderAmount)) {
							return true
						} 
						return false
					} else {
						if (Number(item.reach) <= Number(this.originOrderAmount) && Number(this.originOrderAmount) < Number(arr[index + 1].reach)) {
							return true
						}
						return false
					}
				})
				if (findMinusItem) {
					return findMinusItem.reduce
				} else return 0
			}
		}
	},
	methods: {
		...mapMutations({
			changeAllOrderListUpdate: 'changeAllOrderListUpdate',
			saveDefaultAddress: 'saveDefaultAddress',
			clearCart: 'clearCart',
		}),
		changeOrderType(index) {
			this.selectBusinessType = index
		},
		async init() {
			const res = await this.$fetch.get('/api/address/list', {  })
			const addressList = res.data || []
			if (addressList.length) {
				this.saveDefaultAddress(addressList[0])
			}
		},
		async getAddressList() {
			const res = await this.$fetch.get('/api/address/list', {  });
			const addressList = res.data || []
			if (addressList.length) {
				this.saveDefaultAddress(addressList[0])
			}
		},
		async submitOrder() {
			if (!this.cartFoodList.length) return;
			const foodList = [];
			this.cartFoodList.forEach((item) => {
				foodList.push(...item.foodList)
			})
			console.log(foodList)
			const query = {}
			if (this.selectBusinessType === 2) {
				query.takeOutTime = this.takeOutTime
				query.address = JSON.stringify(this.defaultAddress)
			}else if (this.selectBusinessType === 3) {
				query.selfTakeTime = this.selfTakeTime
				query.reservePhone = this.reservePhone
			}
			const res = await this.$fetch.post('/api/order/submit', { foodList, shopID: this.shopInfo.shopID, orderAmount: this.dueAmount, businessType: this.selectBusinessType, ...query, minusPrice: this.minusPrice })
			this.clearCart()
			this.changeAllOrderListUpdate()
			this.$myrouter.switchTab({
				name: 'orderList'
			})
		},
		toSelectAddress() {
			this.$myrouter.push({
				name: 'address/list',
				query: {
					fromPage: 'confirmOrder'
				}
			})
		},
		takeOutTimeChange(e) {
			this.takeOutTime = e.detail.value
		},
		selfTakeTimeChange(e) {
			this.selfTakeTime = e.detail.value
		},
		continueOrder() {
			this.$myrouter.back()
		},
	}
}
</script>

<style lang="scss">
page {
	background-color: #f5f5f5;
	height: 100%;
}
.comfirm-order-container {
	padding: 20rpx 20rpx 150rpx;
	font-size: 28rpx;
	color: #333;
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
		margin-bottom: 34rpx;
	}
	.address-title {
		font-size: 30rpx;
		font-weight: bold;
		max-width: 500rpx;
		margin-bottom: 14rpx;
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
		width: 18rpx;
		height: 27rpx;
		transform: translateY(-50%);
		// background-color: red;
	}
	.delivery-box {
		position: relative;
		// padding-top: 20rpx; 
	}
	.delivery-title {
		font-weight: bold;
		margin-right: 24rpx;
	}
	.time-phone-box {
		height: 90rpx;
	}
	.shop-address {
		font-weight: bold;
		padding-bottom: 30rpx;
	}
	.self-time-box, .self-phone-box {
		position: relative;
		height: 90rpx;;
	}
	.self-time-picker {
		flex: 1;
		height: 100%;
	}
	.self-take-title {
		font-size: 24rpx;
		color: #999;
		line-height: 1
	}
	.reserve-phone-input {
		padding-top: 10rpx;
	}
	.self-take-time {
		padding-top: 10rpx;
		font-weight: bold;
		font-size: 28rpx;
		height: 1.4rem;
		min-height: 1.4rem;
		line-height: 1.4rem;
	}
	.self-phone-box {
		flex: 1.1;
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
		flex: 10;
		height: 90rpx;
		line-height: 1;
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
		text-align: right;
	}
	.minus-info-box {
		margin-top: 30rpx;
	}
	.minus-icon {
		width: 32rpx;
		height: 32rpx;
		margin-right: 20rpx;
	}
	.order-minus-price {
		margin-left: 8rpx;
	}
	.total-info-info {
		margin-top: 30rpx;
	}
	.money-unit {
		font-size: 24rpx;
	}
	.order-due-amount-title {
		margin-left: 10rpx;
	}
	.order-due-amount {
		margin-left: 8rpx;
		font-weight: bold;
		font-size: 32rpx;
	}
	.submit-order {
		position: fixed;
		bottom: 10rpx;
		left: 0;
		width: 100%;
	} 
}
</style>
