<template>
	<div class="menu-container flex-col">
		<!-- <div class="menu-header"></div> -->
		<div class="order-main flex-item flex-row">
			<div class="category-aside-box">
				<div class="aside-cateGory-item flex-row flex-a-center" v-for="(asideCategoryItem, index) in asideCategoryList" :key="index" :style="{'border-left': selectCategoryTabId === asideCategoryItem.scrollID ? '10rpx solid ' + $mainColor : '', 'background-color': selectCategoryTabId === asideCategoryItem.scrollID ? '#fff' : ''}" @click="changeSelectCategoryTab(asideCategoryItem.scrollID)">{{asideCategoryItem.scrollID}}+{{asideCategoryItem.orderCount}}</div>
			</div>
			<scroll-view scroll-y :scroll-into-view="scrollCategoryID" class="food-main-box flex-item" @scroll="listScroll">
				<div class="food-category-list-item" :data-food-category-item="JSON.stringify(foodCategoryItem)" v-for="(foodCategoryItem, index) in foodCategoryList" :key="index">
					<div :id="foodCategoryItem.scrollID" class="food-category-name">{{foodCategoryItem.categoryID}}</div>
					<div class="food-item flex-item flex-row" v-for="(foodItem, foodIndex) in foodCategoryItem.foodList" :key="foodIndex">
						<image class="food-img  flex-shrink" :src="foodItem.imgUrl || '/static/img/default-img.svg'" mode="aspectFill"></image>
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
									<div class="food-count-minus" :style="{'color': $mainColor}" @click="minusCount(foodCategoryItem.categoryID, foodItem)">-</div>
									<div class="food-order-count">{{foodItem.orderCount}}</div>
									<div class="food-count-add" :style="{'background-color': $mainColor}" @click="addCount(foodCategoryItem.categoryID, foodItem)">+</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</scroll-view>
		</div>
		<div class="footer-cart flex-row flex-j-between flex-a-center" >
			<image class="cart-img" @click="changeShowCartDetail"></image>
			<div class="flex-item cart-all-amount">
				{{cartFoodList.length}}
			</div>
			<div class="com-button confirm-order" :style="{'background-color': cartFoodListMainColor }" @click="toComfirmOrder">去下单</div>
		</div>
		<div v-if="showCartDetail"  class="cart-detail-mask" @click.stop="showCartDetail = false">
			<div class="cart-detail-box"  @touchmove.stop>
				<scroll-view scroll-y class="cart-detail-list-box" @click.stop >
					<div class="food-category-item" v-for="(foodCategoryItem, index) in cartFoodList" :key="index">
						<div class="cart-food-item flex-row" v-for="(cartFoodItem, cartFoodIndex) in foodCategoryItem.foodList" :key="cartFoodIndex">
							<image v-if="cartFoodItem.orderCount" class="food-img flex-shrink" :src="cartFoodItem.imgUrl"></image>
							<div v-if="cartFoodItem.orderCount" class="food-info-box flex-item flex-col flex-j-between">
								<div class="food-name-description">
									<div class="food-name">
										{{cartFoodItem.foodName}}111{{foodCategoryItem.categoryID}}
									</div>
									<div class="food-description">
										{{cartFoodItem.description}}
									</div>
								</div>
								<div class="food-price-button flex-row flex-j-between flex-a-center">
									<div class="food-price">¥{{cartFoodItem.price}}</div>
									<div v-if="cartFoodItem.orderCount < 1" class="food-count-add" :style="{'background-color': $mainColor}" @click="addCount(foodCategoryItem.categoryID, cartFoodItem)">+</div>
									<div v-else class="flex-row flex-a-center">
										<div class="food-count-minus" :style="{'color': $mainColor}" @click="minusCount(foodCategoryItem.categoryID, cartFoodItem)">-</div>
										<div class="food-order-count">{{cartFoodItem.orderCount}}</div>
										<div class="food-count-add" :style="{'background-color': $mainColor}" @click="addCount(foodCategoryItem.categoryID, cartFoodItem)">+</div>
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
			shopID: ''
		}
	},
	computed: {
		...mapState({
			cartFoodList: state => state.cartFoodList,
		}),
		cartFoodListMainColor() {
			return this.cartFoodList.length ? this.$mainColor: ''
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
		this.shopID = query.shopID
		this.init()
		// observer = uni.createIntersectionObserver(this, {
        //         observeAll: true
        //     });
		// observer.relativeTo('.food-main-box').observe('.food-category-list-item', (res) => {
		// 		console.log(res)
		// })
	},
	methods: {
		...mapMutations({
			cartCountChange: 'cartCountChange',
			initCart: 'initCart',
		}),
		listScroll(e) {
			// console.log(e)
		},
		creatObserve() {
			observer = uni.createIntersectionObserver(this, {
					observeAll: true
				});
			observer.relativeTo('.food-main-box').observe('.food-category-list-item', (res) => {
				// console.log(res)
						console.log(res)
						const foodCategoryItem = JSON.parse(res.dataset.foodCategoryItem)
					if (res.intersectionRatio === 0 && res.boundingClientRect.bottom <= res.relativeRect.top) {
						this.selectCategoryTabId = foodCategoryItem.nextscrollID
						console.log(111)
					} else if ((0 < res.intersectionRatio && res.intersectionRatio <= 1 && res.boundingClientRect.top < res.relativeRect.top)) {
						this.selectCategoryTabId = foodCategoryItem.scrollID
						console.log(333)
					}
			})
		},
		async init() {
			const res = await this.$fetch.get('/api/order/menuList', { shopID: this.shopID })
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
			const storageFoodList =  uni.getStorageSync('storageFoodList')
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
			console.log(this.cartFoodList.length)
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
	width: 100%;
	height: 100%;
	box-sizing: border-box;
	padding-bottom: 100rpx;
	color:#333
}
.menu-header {
	background-color: red;
	height: 300rpx;
}
.order-main {
	.category-aside-box {
		width: 200rpx;
		height: 100%;
		overflow-y: auto;
		background-color: #f5f5f5;
		.aside-cateGory-item {
			padding: 0 30rpx;
			height: 80rpx;
			font-size: 26rpx;
			line-height: 32rpx;
			text-align: center;
			box-sizing: border-box;
			border-left: 10rpx solid transparent;
		}
	}
	.food-main-box {
		// background-color: blue;
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
		}
		.food-description {
			font-size: 24rpx;
			color: #999
		}
		.food-count-minus {
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
		.food-count-add {
			width: 50rpx;
			height: 50rpx;
			border-radius: 50%;
			text-align: center;
			line-height: 40rpx;
			color: #fff;
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
	.cart-all-amount {
		padding-left: 160rpx
	}
	.cart-img {
		position: fixed;
		bottom: 0;
		left: 30rpx;
		height: 100rpx;
		width: 100rpx;
		background-color: red;
	}
	.confirm-order {
		margin-right: 10rpx;
		width: 250rpx;
		background-color: #666;
	}
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
	.cart-detail-box {
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		max-height: 800rpx;
		box-sizing: border-box;
		padding: 30rpx;
		background-color: #fff;
		overflow-y: auto;
		z-index: 5;
	}
	.cart-detail-list-box {
		max-height: 700rpx;
	}
	.cart-food-item {
		padding: 10rpx 0;
	}
	.food-img {
		height: 130rpx;
		width: 130rpx;
	}
	.food-name {
		max-width: 400rpx;
	}
	.food-description {
		font-size: 24rpx;
	}
		.food-count-minus {
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
		.food-count-add {
			width: 50rpx;
			height: 50rpx;
			border-radius: 50%;
			text-align: center;
			line-height: 40rpx;
			color: #fff;
		}
}
</style>
