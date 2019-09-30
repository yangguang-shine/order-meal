<template>
	<div class="menu-container flex-col">
		<!-- <div class="menu-header"></div> -->
		<div class="order-main flex-item flex-row">
			<scroll-view scroll-y class="category-aside-box" :style="{'padding-bottom': minusPromotionsTitle ? '50rpx' : ''}">
				<div class="aside-category-item flex-row flex-a-center" v-for="(asideCategoryItem, index) in asideCategoryList" :key="index" :style="{'border-left': selectCategoryTabId === asideCategoryItem.scrollID ? '10rpx solid ' + $mainColor : '', 'background-color': selectCategoryTabId === asideCategoryItem.scrollID ? '#fff' : ''}" @click="changeSelectCategoryTab(asideCategoryItem.scrollID)">
					{{asideCategoryItem.categoryName}}
					<div v-if="asideCategoryItem.orderCount" class="category-order-count" :style="{'background': $mainColor}">{{asideCategoryItem.orderCount}}</div>
				</div>
			</scroll-view>
			<scroll-view scroll-y :scroll-into-view="scrollCategoryID" class="food-main-box flex-item" :style="{'padding-bottom': minusPromotionsTitle ? '50rpx' : ''}">
				<div class="food-category-list-item" :data-food-category-item="JSON.stringify(foodCategoryItem)" v-for="(foodCategoryItem, index) in foodCategoryList" :key="index">
					<div :id="foodCategoryItem.scrollID" class="food-category-name">{{foodCategoryItem.categoryName}}</div>
					<div class="food-item flex-item flex-row" v-for="(foodItem, foodIndex) in foodCategoryItem.foodList" :key="foodIndex">
						<image class="food-img  flex-shrink" :src="foodItem.imgUrl ? host + foodItem.imgUrl : '/static/img/default-img.svg'" mode="aspectFill"></image>
						<div class="food-info-box flex-item flex-col flex-j-between">
							<div class="food-name-description">
								<div class="food-name">
									{{foodItem.foodName}}
								</div>
								<div class="food-description">
									{{foodItem.description}}
								</div>
							</div>
							<div class="food-price-button flex-row flex-j-between flex-a-center">
								<div class="food-price">¥{{foodItem.price}}</div>
								<div v-if="foodItem.orderCount < 1" class="food-count-add" :style="{'background-color': $mainColor}" @click="addCount(foodCategoryItem.categoryID, foodItem)">+</div>
								<div v-else class="flex-row flex-a-center">
									<div class="food-count-minus" :style="{'color': $mainColor}" @click="minusCount(foodCategoryItem.categoryID, foodItem)">
										<div class="reduce-icon-css" :style="{'background-color': $mainColor}"></div>
									</div>
									<div class="food-order-count">{{foodItem.orderCount}}</div>
									<div class="food-count-add" :style="{'background-color': $mainColor}" @click="addCount(foodCategoryItem.categoryID, foodItem)"></div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</scroll-view>
		</div>
		<div v-if="minusPromotionsTitle" class="promotion-title center">
			{{minusPromotionsTitle}}
		</div>
		<div class="footer-cart flex-row flex-j-between flex-a-center" >
			<div class="cart-img-box">
					<image class="cart-img" @click="changeShowCartDetail" src="/static/img/cart-icon.png" mode="aspectFill" ></image>
					<div v-if="allCartFoodCount" class="cart-all-count" :style="{'background': $mainColor}">
						{{allCartFoodCount}}
					</div>
			</div>
			<div class="flex-item cart-all-amount">
				<span v-if="cartFoodList.length" class="cart-all-discount-price">{{cartPriceInfo.cartAlldiscountPrice}}</span>
				<span v-if="cartPriceInfo.discountPrice" class="cart-all-origin-price">{{cartPriceInfo.cartAllOriginPrice}}</span>
			</div>
			<div class="com-button confirm-order" :style="{'background-color': cartFoodListMainColor }" @click="toComfirmOrder">去下单</div>
		</div>
		<div v-if="showCartDetail"  class="cart-detail-mask" @click.stop="showCartDetail = false">
			<div class="cart-detail-box" :style="{'padding-bottom': minusPromotionsTitle ? '60rpx' : ''}" @touchmove.stop>
				<div class="cart-select-box flex-row flex-j-between flex-a-center" @click.stop>
					<div class="select-goods-title">
						已选商品
					</div>
					<image class="delete-all-icon" src="/static/img/shop-delete.svg" @click="cartClearCart"></image>
				</div>
				<scroll-view scroll-y class="cart-detail-list-box" @click.stop>
					<div class="food-category-item" v-for="(foodCategoryItem, index) in cartFoodList" :key="index">
						<div class="cart-food-item flex-row" v-for="(cartFoodItem, cartFoodIndex) in foodCategoryItem.foodList" :key="cartFoodIndex">
							<image v-if="cartFoodItem.orderCount" class="cart-food-img flex-shrink" :src="cartFoodItem.imgUrl ? host + cartFoodItem.imgUrl : '/static/img/default-img.svg'" mode="aspectFill" ></image>
							<div v-if="cartFoodItem.orderCount" class="cart-food-info-box flex-item flex-col flex-j-between">
								<div class="cart-food-name-description">
									<div class="cart-food-name">
										{{cartFoodItem.foodName}}
									</div>
									<div class="cart-food-description">
										{{cartFoodItem.description}}
									</div>
								</div>
								<div class="cart-food-price-button flex-row flex-j-between flex-a-center">
									<div class="cart-food-price">¥{{cartFoodItem.price}}</div>
									<div v-if="cartFoodItem.orderCount < 1" class="food-count-add" :style="{'background-color': $mainColor}" @click="addCount(foodCategoryItem.categoryID, cartFoodItem)">+</div>
									<div v-else class="flex-row flex-a-center">
										<div class="food-count-minus" :style="{'color': $mainColor}" @click="minusCount(foodCategoryItem.categoryID, cartFoodItem)">
											<div class="reduce-icon-css" :style="{'background-color': $mainColor}"></div>
										</div>
										<div class="food-order-count">{{cartFoodItem.orderCount}}</div>
										<div class="food-count-add" :style="{'background-color': $mainColor}" @click="addCount(foodCategoryItem.categoryID, cartFoodItem)"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</scroll-view>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import host from '@/config/host'
let observer = null
export default {
	data() {
		return {
			addCountState: true,
			minusCountState: true,
			selectCategoryTabId: '',
			scrollCategoryID: '',
			showCartDetail: false,
			foodCategoryList: [],
			host
		}
	},
	computed: {
		...mapState({
			cartFoodList: state => state.cartFoodList,
			shopInfo: state => state.shopInfo,
			businessType: state => state.businessType
		}),
		cartFoodListMainColor() {
			return this.cartFoodList.length ? this.$mainColor: ''
		},
		minusPromotionsTitle() {
			if (!this.shopInfo.minusList.length) return '';
			if (!this.cartPriceInfo.minusIndex) {
				return '';
			}else {
				if (this.shopInfo.minusList.length === this.cartPriceInfo.minusIndex) {
					return `已减${this.shopInfo.minusList[this.cartPriceInfo.minusIndex - 1].reduce}`
				} else {
					console.log(this.cartPriceInfo.cartAllOriginPrice)
					console.log(this.shopInfo.minusList[this.cartPriceInfo.minusIndex].reach)
					console.log(this.shopInfo.minusList[this.cartPriceInfo.minusIndex].reach - this.cartPriceInfo.cartAllOriginPrice)
					console.log((this.shopInfo.minusList[this.cartPriceInfo.minusIndex].reach - this.cartPriceInfo.cartAllOriginPrice).toFixed(2))
					// const hasReduce = `已减${this.shopInfo.minusList[this.cartPriceInfo.minusIndex - 1].reduce}`;
					// const secondMinus = `再买${this.shopInfo.minusList[this.cartPriceInfo.minusIndex].reach - this.cartPriceInfo.cartAllOriginPrice}`
					return `已减${this.shopInfo.minusList[this.cartPriceInfo.minusIndex - 1].reduce}元,再买${Number((this.shopInfo.minusList[this.cartPriceInfo.minusIndex].reach - this.cartPriceInfo.cartAllOriginPrice).toFixed(2))}元减${this.shopInfo.minusList[this.cartPriceInfo.minusIndex].reduce}元`
				}
			}
		},
		cartPriceInfo() {
			const cartAllOriginPrice = (this.cartFoodList.reduce((amount, item) => {
				const categoryItemSum = item.foodList.reduce((all, foodItem) => {
					const price = foodItem.price * foodItem.orderCount
					all += price
					return all
				}, 0)
				amount += categoryItemSum
				return amount
			}, 0)).toFixed(2)
			let discountPrice = 0
			let minusIndex = null
			const discountItem = this.shopInfo.minusList.find((item, index) => {
				if (index === (this.shopInfo.minusList.length - 1)) {
					if (Number(cartAllOriginPrice) >= Number(item.reach)) {
						minusIndex = index + 1
						return true
					} else {
						return false
					}
				} else {
					if (Number(cartAllOriginPrice) >= Number(item.reach) && Number(cartAllOriginPrice) < Number(this.shopInfo.minusList[index + 1].reach)) {
						minusIndex = index + 1
						return true
					} else {
						return false
					}
				}
			});
			if (discountItem) {
				discountPrice = discountItem.reduce
			}
			const cartAlldiscountPrice = (cartAllOriginPrice - discountPrice).toFixed(2)
			return {
				cartAllOriginPrice,
				cartAlldiscountPrice,
				discountPrice,
				minusIndex
			}
		},
		allCartFoodCount() {
			return this.cartFoodList.reduce((all, item) => {
				const itemFoodAll = item.foodList.reduce((all, item) => {
						all += item.orderCount
						return all
					}, 0)
				all += itemFoodAll
				return all
			}, 0)
		},
		asideCategoryList() {
			const asideCategoryList = this.foodCategoryList.map(foodCategoryItem => {
				const cartFind = this.cartFoodList.find(cartFoodItem => cartFoodItem.categoryID === foodCategoryItem.categoryID)
				if (cartFind) {
					const orderCount = cartFind.foodList.reduce((all, item) => {
						all += item.orderCount
						return all
					}, 0)
					return {
						categoryName: foodCategoryItem.categoryName,
						categoryID: foodCategoryItem.categoryID,
						orderCount,
						scrollID: foodCategoryItem.scrollID
					}
				} else {
					return {
						categoryName: foodCategoryItem.categoryName,
						categoryID: foodCategoryItem.categoryID,
						orderCount: 0,
						scrollID: foodCategoryItem.scrollID
					}
				}
			})
			return asideCategoryList
		}
	},
	onReady() {
		setTimeout(() => {
			this.creatObserve()
		}, 2000)
	},
	onUnload() {
		if (observer) {
			observer.disconnect()
		}
	},
	onLoad(query) {
		this.init()
	},
	methods: {
		...mapMutations({
			cartCountChange: 'cartCountChange',
			initCart: 'initCart',
			clearCart: 'clearCart',
		}),
		cartClearCart() {
			
			this.clearCart()
			this.showCartDetail = false
		},
		creatObserve() {
			observer = uni.createIntersectionObserver(this, {
					observeAll: true
				});
			observer.relativeTo('.food-main-box').observe('.food-category-list-item', (res) => {
				// console.log(res)
						const foodCategoryItem = JSON.parse(res.dataset.foodCategoryItem)
					if (res.intersectionRatio === 0 && res.boundingClientRect.bottom <= res.relativeRect.top) {
						this.selectCategoryTabId = foodCategoryItem.nextscrollID
					} else if ((0 < res.intersectionRatio && res.intersectionRatio <= 1 && res.boundingClientRect.top <= res.relativeRect.top)) {
						this.selectCategoryTabId = foodCategoryItem.scrollID
					}
			})
		},
		async init() {
			const res = await this.$fetch.get('/api/order/menuList', { shopID: this.shopInfo.shopID })
			this.foodCategoryList = res.data || []
			this.foodCategoryList.forEach((item, index) => {
				item.scrollID = 'c' + item.categoryID
				if (index >= this.foodCategoryList.length - 1) {
					item.nextscrollID = 'c' + item.categoryID
				} else {
					item.nextscrollID = 'c' + this.foodCategoryList[index + 1].categoryID
				}
			})
			if (this.foodCategoryList.length) {
				this.selectCategoryTabId = this.foodCategoryList[0].scrollID
				this.scrollCategoryID = this.foodCategoryList[0].scrollID
			}
			this.getStorageCart()
		},
		getStorageCart() {
			const storageFoodList =  uni.getStorageSync(`storageFoodList_${this.shopInfo.shopID}`)
			if (!storageFoodList || !storageFoodList.length) return;
			this.initCart({ foodCategoryList: this.foodCategoryList, storageFoodList })
		},
		changeShowCartDetail() {
			if (!this.cartFoodList.length){
				this.showCartDetail = false
				return
			} 
			this.showCartDetail = !this.showCartDetail
		},
		changeSelectCategoryTab(scrollID) {
			this.selectCategoryTabId = scrollID
			this.scrollCategoryID = scrollID
		},
		addCount(categoryID, foodItem) {
			if (!this.addCountState) return
			this.addCountState = false
			foodItem.orderCount += 1
			this.cartCountChange({ categoryID, foodItem })
			this.addCountState = true
			if (!this.cartFoodList.length) this.showCartDetail = false
		},
		minusCount(categoryID, foodItem) {
			if (!this.minusCountState) return
			this.minusCountState = false
			foodItem.orderCount -= 1
			this.cartCountChange({ categoryID, foodItem })
			this.minusCountState = true
			if (!this.cartFoodList.length) this.showCartDetail = false
		},
		async toComfirmOrder() {
			// if (!this.cartFoodList.length) return;
			// const foodList = [];
			// this.cartFoodList.forEach((item) => {
			// 	foodList.push(...item.foodList)
			// })
			// console.log(foodList)
			// const res = await this.$fetch.post('/api/order/submit', { foodList })
			this.$myrouter.push({
				name: 'confirmOrder'
			})
		}
	}
}
</script>

<style lang="scss">
page {
	height: 100%;
}
.menu-container {
	font-size: 30rpx;
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	padding-bottom: 100rpx;
	color:#333;
	.food-count-minus {
		position: relative;
		width: 50rpx;
		height: 50rpx;
		border: 1px solid;
		border-radius: 50%;
		text-align: center;
		line-height: 40rpx;
		background-color: #fff;
		box-sizing: border-box;
	}
	.food-order-count {
		width: 70rpx;
		text-align: center;
	}
	.reduce-icon-css {
		position: absolute;
		top: 50%;
		left:50%;
		height: 6rpx;
		width: 30rpx;
		transform: translate(-50%, -50%);
	}
	.food-count-add {
		position: relative;
		width: 50rpx;
		height: 50rpx;
		border-radius: 50%;
		text-align: center;
		line-height: 40rpx;
		color: #fff;
	}
	.food-count-add::after {
		content: '';
		position: absolute;
		width: 30rpx;
		height: 6rpx;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #fff;
	}
	.food-count-add::before {
		content: '';
		position: absolute;
		width: 6rpx;
		height: 30rpx;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #fff;
	}
	.add-icon-css {
		position: relative;
	}
	.menu-header {
		background-color: red;
		height: 300rpx;
	}
	.order-main {
		.category-aside-box {
			width: 200rpx;
			height: 100%;
			background-color: #f5f5f5;
			flex-shrink: 0;
			box-sizing: border-box;
			padding-bottom: 40rpx;
			.aside-category-item {
				position: relative;
				padding: 0 20rpx;
				height: 80rpx;
				font-size: 26rpx;
				line-height: 32rpx;
				text-align: center;
				box-sizing: border-box;
				border-left: 10rpx solid transparent;
			}
			.category-order-count {
				position: absolute;
				top: 10rpx;
				right: 10rpx;
				width: 32rpx;
				height: 32rpx;
				line-height: 32rpx;
				border-radius: 50%;
				font-size: 22rpx;
				color: #fff;
				text-align: center;
			}
		}
		.food-main-box {
			// background-color: blue;
			height: 100%;
			flex-shrink: 0;
			box-sizing: border-box;
			.food-category-list-item {
				padding: 0 30rpx;
				margin-bottom: 20rpx;
			}
			.food-category-name {
				font-size: 24rpx;
				color: #666;
				margin: 0 0 20rpx;
			}
			.food-item {
				padding: 10rpx 0;
			}
			.food-img {
				height: 170rpx;
				width: 170rpx;
			}
			.food-info-box {
				padding-left: 20rpx;
			}
			.food-name {
				font-weight: bold;
				font-size: 34rpx;
			}
			.food-description {
				font-size: 26rpx;
				color: #999;
				margin-top: 10rpx;
			}
			
		}
	}
	.footer-cart {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100rpx;
		background-color: #434346;
		border-radius: 50rpx;
		color: #fff;
		z-index: 8;
	}
	.promotion-title {
		position: fixed;
		left: 0;
		bottom: 100rpx;
		width: 100%;
		height: 50rpx;
		background-color: rgb(247, 255, 142);
		z-index: 3;
		line-height: 50rpx;
		font-size: 24rpx;
	}
	.cart-all-amount {
		padding-left: 200rpx;
	}
	.cart-all-discount-price {
		font-size: 36rpx;
	}
	.cart-all-origin-price {
		margin-left: 20rpx;
		font-size: 26rpx;
		color: #888;
		text-decoration:line-through
	}
	.cart-img-box {
		position: fixed;
		bottom: 20rpx;
		left: 40rpx;
		height: 140rpx;
		width: 140rpx;
		z-index: 10
	}
	.cart-img {
		height: 140rpx;
		width: 140rpx;
	}

	.cart-all-count {
		position: absolute;
		right: -20rpx;
		top: 10rpx;
		height: 40rpx;
		width: 40rpx;
		font-size: 22rpx;
		line-height: 40rpx;
		border-radius: 50%;
		text-align: center;
	}
	.confirm-order {
		margin-right: 10rpx;
		width: 250rpx;
		background-color: #666;
	}
	.cart-detail-mask {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 100rpx;
		width: 100%;
		background-color: rgba(0, 0, 0, .5);
		font-size: 28rpx;
		-webkit-overflow-scrolling: touch;
		z-index: 2;
	}
	.cart-detail-box {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		max-height: 800rpx;
		box-sizing: border-box;
		padding: 0 30rpx 40rpx;;
		background-color: #fff;
		overflow-y: auto;
	}
	.cart-select-box {
		font-size: 28rpx;
		color: #999;
	}
	.delete-all-icon {
		padding: 20rpx;
		height: 36rpx;
		width: 36rpx;
	}
	.cart-detail-list-box {
		max-height: 650rpx;
	}
	.cart-food-item {
		padding: 10rpx 0;
	}
	.cart-food-img {
		height: 130rpx;
		width: 130rpx;
	}
	.cart-food-name {
		font-weight: bold;
		max-width: 400rpx;
	}
	.cart-food-description {
		font-size: 24rpx;
	}
	.cart-food-info-box {
		padding-left: 20rpx;
	}
}

</style>
