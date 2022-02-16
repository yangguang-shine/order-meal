<template>
	<div class="comfirm-order-container">
		<address-deliver :defaultAddress="defaultAddress" :takeOutTime="takeOutTime" @takeOutTimeChange="takeOutTimeChange"></address-deliver>
		<order-info :shopInfo="shopInfo" :cartFoodList="cartFoodList" :originOrderAmount="originOrderAmount" :minusPrice="minusPrice" :payPrice="payPrice" @continueOrder="continueOrder"></order-info>
		<other-info :noteText="noteText" @showNoteInput="showNoteInput"></other-info>
		<footer-button @submitOrder="submitOrder"></footer-button>
		<note-input :noteText="noteText" v-if="noteInputFlag" @hideNoteInput="hideNoteInput" @confirmNoteInput="confirmNoteInput"></note-input>
		<common-loading v-if="showLoadingFlag"></common-loading>
	</div>
</template>

<script>
import AddressDeliver from './components/AddressDeliver.vue';
import OrderInfo from './components/OrderInfo.vue';
import OtherInfo from './components/OtherInfo.vue';
import FooterButton from './components/FooterButton.vue';
import NoteInput from './components/NoteInput.vue';
import { host } from '@/config/host';

export default {
	components: {
		AddressDeliver,
		OrderInfo,
		OtherInfo,
		FooterButton,
		NoteInput
	},
	data() {
		return {
			originOrderAmount: '',
			host,
			takeOutTime: '12:00',
			reservePhone: '',
			defaultAddress: {},
			shopInfo: {
				minusList: []
			},
			cartFoodList: [],
			businessType: {},
			noteText: '',
			noteInputFlag: false,
			showLoadingFlag: true
		};
	},
	async onShow() {
		try {
			this.showLoadingFlag = true
			this.getTakeOutTime();
			this.shopInfo = uni.getStorageSync('shopInfo');
			this.businessType = uni.getStorageSync('businessType');
			this.cartFoodList = uni.getStorageSync(`storageFoodList_${this.shopInfo.shopID}`);
			this.originOrderAmount = Number(
				this.cartFoodList
					.reduce((amount, item) => {
						const categoryItemSum = item.foodList.reduce((all, foodItem) => {
							const price = foodItem.price * foodItem.orderCount;
							all += price;
							return all;
						}, 0);
						amount += categoryItemSum;
						return amount;
					}, 0)
					.toFixed(2)
			);
			await this.init();
		} catch (e) {
			console.log(e);
		} finally {
			this.showLoadingFlag = false
		}
	},
	computed: {
		payPrice() {
			return Number((this.originOrderAmount - this.minusPrice).toFixed(2));
		},
		minusPrice() {
			if (!this.shopInfo.minusList.length) {
				return 0;
			} else {
				const length = this.shopInfo.minusList.length;
				const findMinusItem = this.shopInfo.minusList.find((item, index, arr) => {
					if (index === length - 1) {
						if (Number(item.reach) <= Number(this.originOrderAmount)) {
							return true;
						}
						return false;
					} else {
						if (Number(item.reach) <= Number(this.originOrderAmount) && Number(this.originOrderAmount) < Number(arr[index + 1].reach)) {
							return true;
						}
						return false;
					}
				});
				if (findMinusItem) {
					return +findMinusItem.reduce;
				} else return 0;
			}
		}
	},
	methods: {
		async init() {
			try {
				const addressList = await this.$fetch('user/address/list', {});
				if (addressList.length) {
					this.defaultAddress = addressList[0];
				}
			} catch (e) {
				console.log(e);
			}
		},
		getTakeOutTime() {
			const current = +new Date();
			const deliverStamp = current + 1000 * 60 * 60;
			console.log(deliverStamp);
			const deliverTime = new Date(deliverStamp);
			const hours = `${deliverTime.getHours()}`.length === 1 ? `0${deliverTime.getHours()}` : `${deliverTime.getHours()}`;
			const minute = `${deliverTime.getMinutes()}`.length === 1 ? `0${deliverTime.getMinutes()}` : `${deliverTime.getMinutes()}`;
			this.takeOutTime = `${hours}:${minute}`;
		},
		showNoteInput() {
			this.noteInputFlag = true;
		},
		hideNoteInput() {
			this.noteInputFlag = false;
		},
		confirmNoteInput(noteText) {
			this.noteText = noteText;
			this.noteInputFlag = false;
		},
		async submitOrder() {
			try {
				this.$showLoading();
				if (!this.cartFoodList.length) return;
				const foodList = [];
				this.cartFoodList.forEach(item => {
					foodList.push(...item.foodList);
				});
				const query = {};
				if (this.businessType === 2) {
					query.takeOutTime = this.takeOutTime;
					query.address = JSON.stringify(this.defaultAddress);
				}
				await this.$fetch('user/order/submit', {
					foodList,
					shopID: this.shopInfo.shopID,
					orderAmount: this.payPrice,
					businessType: this.businessType,
					...query,
					minusPrice: this.minusPrice,
					originOrderAmount: this.originOrderAmount,
					noteText: this.noteText
				});
				this.clearCart();
				this.$myrouter.reLaunchTo({
					name: 'user/order/list'
				});
			} catch (e) {
				console.log(e);
			} finally {
				this.$hideLoading();
			}
		},
		clearCart() {
			this.cartFoodList = [];
			uni.removeStorageSync(`storageFoodList_${this.shopInfo.shopID}`);
		},
		toSelectAddress() {
			this.$myrouter.navigateTo({
				name: 'user/address/list',
				query: {
					fromPage: 'confirmOrder'
				}
			});
		},
		takeOutTimeChange(e) {
			this.takeOutTime = e.detail.value;
		},
		continueOrder() {
			this.$myrouter.back();
		}
	}
};
</script>

<style lang="scss">
// page {
// 	height: 100%;
// 	width: 100%;
// }
.comfirm-order-container {
	min-height: 100vh;
	width: 100%;
	background-color: #f4f4f4;
	padding: 20rpx 20rpx 50rpx;
	box-sizing: border-box;
	font-size: 28rpx;
	color: #333;
	// overflow: hidden;
	// .top-box {
	//     background-color: #fff;
	//     padding: 0 20rpx;

	//     .address-detail-box {
	//         padding: 30rpx 0;
	//         border-bottom: 1rpx solid #d7d7d7;
	//     }
	//     .address-detail {
	//         width: 600rpx;
	//     }
	//     .address-info {
	//         font-size: 30rpx;
	//         font-weight: bold;
	//         line-height: 42rpx;
	//         color: #333;
	//     }
	//     .user-info {
	//         margin-top: 3rpx;
	//         font-size: 28rpx;
	//         line-height: 40rpx;
	//         color: #777;
	//     }
	//     .address-icon,
	//     .deliver-icon {
	//         width: 40rpx;
	//         height: 40rpx;
	//         padding-right: 20rpx;
	//     }
	//     .deliver-box {
	//         padding: 30rpx 0;
	//         font-size: 30rpx;
	//         line-height: 42rpx;
	//     }

	//     .send-time {
	//         font-weight: bold;
	//         color: #333;
	//         padding-right: 10rpx;
	//     }
	// }
	// .center-box {
	//     margin-top: 20rpx;
	//     background-color: #fff;

	//     .shop-info {
	//         height: 100rpx;
	//         padding: 0 20rpx;
	//         color: #666;
	//     }
	//     .shop-img {
	//         width: 40rpx;
	//         height: 40rpx;
	//         padding-right: 20rpx;
	//     }

	//     .food-list {
	//         padding-bottom: 20rpx;
	//         padding: 20rpx;
	//     }
	//     .food-item {
	//         padding: 20rpx;
	//         margin-bottom: 10rpx;
	//         background-color: #f8f8f8;
	//     }

	//     .food-img {
	//         height: 110rpx;
	//         width: 110rpx;
	//         // border-radius: 8rpx;
	//         margin-right: 20rpx;
	//         background-color: red;
	//     }
	//     .food-info {
	//         flex: 10;
	//         font-size: 28rpx;
	//         height: 110rpx;

	//         // height: 90rpx;
	//     }
	//     .food-name {
	//         max-width: 320rpx;
	//         font-size: 28rpx;
	//         line-height: 40rpx;
	//         color: #333;
	//     }
	//     .food-price {
	//         font-size: 24rpx;
	//         color: #999;
	//     }
	//     .food-count {
	//         flex: 2;
	//         font-size: 28rpx;
	//         line-height: 34rpx;
	//         text-align: center;
	//         color: #666;
	//     }
	//     .food-count-price {
	//         flex: 3;
	//         font-size: 28rpx;
	//         text-align: right;
	//         color: #333;
	//     }
	//     .dash-split {
	//         position: relative;
	//         width: 100%;
	//         height: 0;
	//         border-bottom: 3rpx dashed #eee;
	//         margin-bottom: 10rpx;
	//     }
	//     .left-circle,
	//     .right-circle {
	//         position: absolute;
	//         top: -12rpx;
	//         width: 24rpx;
	//         height: 24rpx;
	//         background-color: #f4f4f4;
	//         border-radius: 12rpx;
	//     }
	//     .left-circle {
	//         left: -12rpx;
	//     }
	//     .right-circle {
	//         right: -12rpx;
	//     }
	//     .minus-info {
	//         padding: 20rpx 20rpx 30rpx;
	//     }
	//     .minus-icon {
	//         width: 30rpx;
	//         height: 30rpx;
	//         margin-right: 10rpx;
	//         color: #fff;
	//         text-align: center;
	//         font-size: 20rpx;
	//         line-height: 30rpx;
	//         background-color: #fb4e44;
	//     }
	//     .minus-title {
	//         font-size: 28rpx;
	//         line-height: 40rpx;
	//         color: #333;
	//     }
	//     .minus-price {
	//         font-size: 28rpx;
	//         font-weight: bold;
	//         color: #fb4e44;
	//     }
	//     .all-price-box {
	//         padding: 0 20rpx 10rpx;
	//         height: 80rpx;
	//     }
	//     .all-price-info {
	//         color: #999;
	//         font-size: 24rpx;
	//         line-height: 40rpx;
	//     }
	//     .origin-price,
	//     .discount-price {
	//         padding-right: 30rpx;
	//     }
	//     .pay-price {
	//         font-weight: bold;
	//         font-size: 28rpx;
	//         color: #333;
	//     }

	//     .pay-price-color {
	//         color: #fb4e44;
	//     }
	// }
	// .other-info-box {
	//     padding: 0 20rpx;
	//     background-color: #fff;
	//     font-size: 28rpx;
	//     margin-top: 20rpx;
	//     .other-info-item {
	//         position: relative;
	//         height: 88rpx;
	//         border-bottom: 1rpx solid #e4e4e4;
	//         padding-right: 34rpx;
	//     }
	//     .other-info-invoice {
	//         padding-right: 0;
	//     }
	//     .arrow-right-icon {
	//         position: absolute;
	//         top: 50%;
	//         right: 6rpx;
	//         width: 12rpx;
	//         height: 22rpx;
	//         transform: translateY(-50%)
	//     }
	//     .other-info-item:last-child {
	//         border-bottom: none;
	//     }
	//     .note-tip {
	//         color: #999;
	//     }
	//     .note-text {
	//     }
	//     .invoice-info {
	//         color: #ccc;
	//     }
	// }

	// .footer-block {
	//     width: 100%;
	//     height: 140rpx;
	//     margin-top: 20rpx;
	//     background-color: #fff;
	//     .footer-box {
	//         position: fixed;
	//         bottom: 0;
	//         left: 0;
	//         width: 100%;
	//         height: 140rpx;
	//         background-color: #3c3c3c;
	//         box-sizing: border-box;
	//         padding-right: 250rpx;

	//     }
	// }
}
</style>
