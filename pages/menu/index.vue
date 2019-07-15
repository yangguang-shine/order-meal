<template>
	<div class="menu-container flex-col">
		<div class="menu-header"></div>
		<div class="order-main flex-item flex-row">
			<div class="category-aside-box">
				<div class="aside-cateGory-item flex-row flex-a-center" v-for="(asideCategoryItem, index) in asideCategoryList" :key="index">{{asideCategoryItem.categoryName}}+{{asideCategoryItem.orderCount}}</div>
			</div>
			<scroll-view scroll-y class="food-main-box flex-item">
				<div class="food-category-list-item" v-for="(foodCateGoryItem, index) in foodCategoryList" :key="index">
					<div class="food-category-name">{{foodCateGoryItem.categoryName}}</div>
					<div class="food-item flex-item flex-row" v-for="(foodItem, foodIndex) in foodCateGoryItem.foodList" :key="foodIndex">
						<image class="food-img  flex-shrink" :src="foodItem.imgUrl" :mode="aspectFill"></image>
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
								<div v-if="foodItem.orderCount < 1" class="food-count-add" :style="{'background-color': mainColor}" @click="addCount(foodCateGoryItem.categoryName, foodItem)">+</div>
								<div v-else class="flex-row ">
									<div class="food-count-minus" :style="{'color': mainColor}" @click="minusCount(foodCateGoryItem.categoryName, foodItem)">-</div>
									<div class="food-order-count">{{foodItem.orderCount}}</div>
									<div class="food-count-add" :style="{'background-color': mainColor}" @click="addCount(foodCateGoryItem.categoryName, foodItem)">+</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</scroll-view>
		</div>
		<div class="footer-cart" :style="{'background-color': mainColor}"></div>
	</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
	data() {
		return {
					// categoryName: '热菜',
					// foodList: [
					// 	{
					// 		foodName: '鱼香肉丝',
					// 		unit: '盘',
					// 		price: 24,
					// 		description: '嘻嘻嘻',
					// 		imgUrl: 'http://res.hualala.com/group3/M02/3D/4E/wKgVe1zQAKiNzqqYAAH3cyQfIuE214.png'
					// 	},
					// ]
			addCountState: true,
			minusCountState: true,
			foodCategoryList: [
				{
					categoryName: '凉菜',
					foodList: [
						{
							foodName: '鱼香肉丝22',
							unit: '盘',
							price: 12,
							orderCount: 0,
							description: '哈哈哈',
							imgUrl: 'http://res.hualala.com/group3/M02/3D/4E/wKgVe1zQAKiNzqqYAAH3cyQfIuE214.png'
						},
						{
							foodName: '鱼香肉丝33',
							unit: '盘',
							price: 12,
							orderCount: 0,
							description: '哈哈哈',
							imgUrl: 'http://res.hualala.com/group3/M02/3D/4E/wKgVe1zQAKiNzqqYAAH3cyQfIuE214.png'
						},
					]
				},
				{
					categoryName: '热菜',
					foodList: [
						{
							foodName: '鱼香肉丝1',
							unit: '盘',
							price: 24,
							description: '嘻嘻嘻',
							imgUrl: 'http://res.hualala.com/group3/M02/3D/4E/wKgVe1zQAKiNzqqYAAH3cyQfIuE214.png',
							orderCount: 0
						},
						{
							foodName: '鱼香肉丝2',
							unit: '盘',
							price: 24,
							description: '嘻嘻嘻',
							imgUrl: 'http://res.hualala.com/group3/M02/3D/4E/wKgVe1zQAKiNzqqYAAH3cyQfIuE214.png',
							orderCount: 0,
						},
					]
				},
				{
					categoryName: '冒菜',
					foodList: [
						{
							foodName: '鱼香肉丝3',
							unit: '盘',
							price: 24,
							orderCount: 0,
							description: '哦哦哦',
							imgUrl: 'http://res.hualala.com/group3/M03/3D/7C/wKgVbVzQALiMc1TJAAG4mjhZiPs692.png',
						},
						{
							foodName: '鱼香肉丝4',
							unit: '盘',
							price: 24,
							description: '哦哦哦',
							orderCount: 0,
							imgUrl: 'http://res.hualala.com/group3/M03/3D/7C/wKgVbVzQALiMc1TJAAG4mjhZiPs692.png'
						},
					]
				},
				{
					categoryName: '套餐',
					foodList: [
						{
							foodName: '鱼香肉丝5',
							unit: '盘',
							price: 24,
							description: '哦哦哦',
							orderCount: 0,
							imgUrl: 'http://res.hualala.com/group3/M03/3D/7C/wKgVbVzQALiMc1TJAAG4mjhZiPs692.png'
						},
						{
							foodName: '鱼香肉丝6',
							unit: '盘',
							price: 24,
							description: '哦哦哦',
							orderCount: 0,
							imgUrl: 'http://res.hualala.com/group3/M03/3D/7C/wKgVbVzQALiMc1TJAAG4mjhZiPs692.png'
						},
					]
				},
				{
					categoryName: '菜名1',
					foodList: [
						{
							foodName: '鱼香肉丝7',
							unit: '盘',
							price: 24,
							description: '哦哦哦',
							orderCount: 0,
							imgUrl: 'http://res.hualala.com/group3/M03/3D/7C/wKgVbVzQALiMc1TJAAG4mjhZiPs692.png'
						},
						{
							foodName: '鱼香肉丝8',
							unit: '盘',
							price: 24,
							description: '哦哦哦',
							orderCount: 0,
							imgUrl: 'http://res.hualala.com/group3/M03/3D/7C/wKgVbVzQALiMc1TJAAG4mjhZiPs692.png'
						},
					]
				},
				{
					categoryName: '菜名2',
					foodList: [
						{
							foodName: '鱼香肉丝9',
							unit: '盘',
							price: 24,
							description: '哦哦哦',
							orderCount: 0,
							imgUrl: 'http://res.hualala.com/group3/M03/3D/7C/wKgVbVzQALiMc1TJAAG4mjhZiPs692.png'
						},
						{
							foodName: '鱼香肉丝10',
							unit: '盘',
							price: 24,
							description: '哦哦哦',
							orderCount: 0,
							imgUrl: 'http://res.hualala.com/group3/M03/3D/7C/wKgVbVzQALiMc1TJAAG4mjhZiPs692.png'
						},
					]
				},
				{
					categoryName: '菜名3',
					foodList: [
						{
							foodName: '鱼香肉丝11',
							unit: '盘',
							price: 24,
							description: '哦哦哦',
							orderCount: 0,
							imgUrl: 'http://res.hualala.com/group3/M03/3D/7C/wKgVbVzQALiMc1TJAAG4mjhZiPs692.png'
						},
						{
							foodName: '鱼香肉丝12',
							unit: '盘',
							price: 24,
							description: '哦哦哦',
							orderCount: 0,
							imgUrl: 'http://res.hualala.com/group3/M03/3D/7C/wKgVbVzQALiMc1TJAAG4mjhZiPs692.png'
						},
					]
				},
				{
					categoryName: '菜名4',
					foodList: [
						{
							foodName: '鱼香肉丝13',
							unit: '盘',
							price: 24,
							description: '哦哦哦',
							orderCount: 0,
							imgUrl: 'http://res.hualala.com/group3/M03/3D/7C/wKgVbVzQALiMc1TJAAG4mjhZiPs692.png'
						},
						{
							foodName: '鱼香肉丝14',
							unit: '盘',
							price: 24,
							description: '哦哦哦',
							orderCount: 0,
							imgUrl: 'http://res.hualala.com/group3/M03/3D/7C/wKgVbVzQALiMc1TJAAG4mjhZiPs692.png'
						},
					]
				},
			]
		}
	},
	computed: {
		...mapState({
			mainColor: state => state.mainColor,
			cartFoodList: state => state.cartFoodList,
		}),
		asideCategoryList() {
			const asideCategoryList = this.foodCategoryList.map(foodCategoryItem => {
				const cartFind = this.cartFoodList.find(cartFoodItem => cartFoodItem.categoryName === foodCategoryItem.categoryName)
				if (cartFind) {
					const orderCount = cartFind.foodList.reduce((all, item) => {
						console.log(item)
						all += item.orderCount
						console.log(all)
						return all
					}, 0)
					return {
						categoryName: foodCategoryItem.categoryName,
						orderCount
					}
				} else {
					return {
						categoryName: foodCategoryItem.categoryName,
						orderCount: 0
					}
				}
			})
			console.log(asideCategoryList)
			console.log(this.cartFoodList)
			return asideCategoryList
		}
	},
	onLoad() {
		console.log(this.mainColor)
	},
	methods: {
		...mapMutations({
			cartCountChange: 'cartCountChange',
		}),
		addCount(categoryName, foodItem) {
			if (!this.addCountState) return
			this.addCountState = false
			foodItem.orderCount += 1
			this.cartCountChange({ categoryName, foodItem })
			this.addCountState = true
		},
		minusCount(categoryName, foodItem) {
			if (!this.minusCountState) return
			this.minusCountState = false
			foodItem.orderCount -= 1
			this.cartCountChange({ categoryName, foodItem })
			this.minusCountState = true
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
			padding: 0 30rpx
		}
		.food-category-name {
			font-size: 24rpx;
			color: #666;
			margin: 20rpx 0 10rpx;
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
	background-color: #ccc;
}
</style>
