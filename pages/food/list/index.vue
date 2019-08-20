<template>
	<view class="food-list-container flex-col">
		<!-- <image class="logo" src="/static/logo.png"></image> -->
		<div v-for="(foodItem, index) in foodList" :key="index" class="food-item flex-row " @click="toEdit(foodItem.foodID)">
			<image class="food-img" :src="foodItem.imgUrl || '/static/img/default-img.svg'"></image>
			<div class="food-info flex-item flex-col flex-j-between">
				<div>
					<div class="line1 food-name">
						{{foodItem.foodName}}<span class="food-unit">/{{foodItem.unit}}</span>
					</div>
					<div class="food-description">
						{{foodItem.description}}
					</div>
				</div>
				<div class="food-price">
					{{foodItem.price}}
				</div>
			</div>
			<image class="delete-food" src="/static/img/shop-delete.svg" @click.stop="deleteFood(foodItem.foodID)"></image>
		</div>
		<div class="food-add" :style="{color: $mainColor}" @click.stop="toAddFood">
			添加
		</div>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				foodList: [],
				categoryID: '',
				categoryName: '',
				shopID: ''
			}
		},
		onLoad(options) {
			console.log(this)
			this.categoryID = options.categoryID
			this.categoryName = options.categoryName
			this.shopID = options.shopID
		},
		onShow() {
			this.init()
		},
		methods: {
			async init() {
				try {
					const res = await this.$fetch.get('/api/food/list', { categoryID: this.categoryID, shopID: this.shopID })
					console.log(res)
					this.foodList = res.data || []
				} catch(e) {
					console.log(e)
				}
			}, 
			toEdit(foodID) {
				this.$myrouter.push({
					name: 'food/edit',
					query: {
						foodID: foodID,
						shopID: this.shopID
					}
				})
			},
			async deleteFood(foodID) {
				try {
					const res = await this.$fetch.post('/api/food/delete', { foodID, shopID: this.shopID })
					this.init()
				} catch (e) {
					console.log(e)
				}
			},
			toAddFood() {
				this.$myrouter.push({
					name: 'food/edit',
					query: {
						categoryID: this.categoryID,
						categoryName: this.categoryName,
						shopID: this.shopID
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
page {
	height: 100%;
}
.food-list-container  {
	min-height: 100%;
	font-size: 30rpx;
	padding: 30rpx;
	padding-bottom: 70rpx;
	box-sizing: border-box;  
	.food-item  {
		margin-bottom: 30rpx;
		position: relative;
	}
	.delete-food {
		position: absolute;
		top: 0;
		right: 0;
		width: 30rpx;
		height: 30rpx;
		padding: 30rpx;
	}
	.food-img {
		height: 120rpx;
		width: 120rpx;
		margin-right: 20rpx;
	}
	.food-info {
		height: 100rpx;
	}
	.food-name {
		font-size: 32rpx;
	}
	.food-unit {
		font-size: 24rpx;
		color: #999;
	}
	.food-description {
		font-size: 24rpx;
		color: #666;
	}
	.food-delete {
		position: absolute;
		right: 10rpx;
		top: 10rpx;
		font-size: 40rpx;
	}
	.food-add {
		position: fixed;
		bottom: 0;
		left: 0;
		height: 80rpx;
		width: 100%;
		text-align: center;
		line-height: 80rpx;
		font-weight: bold;
		background-color: #fff;
	}
}
</style>
