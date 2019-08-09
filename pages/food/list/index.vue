<template>
	<view class="food-list-container flex-col">
		<!-- <image class="logo" src="/static/logo.png"></image> -->
		<div v-for="(foodItem, index) in foodList" :key="index" class="food-item flex-row " @click="toEdit(foodItem.foodID)">
			<image class="food-img" :src="foodItem.imgUrl"></image>
			<div class="food-info flex-item flex-col flex-j-around">
				<div class="line1 food-name">
					{{foodItem.foodName}}/{{foodItem.unit}}
				</div>
				<div class="food-description">
					{{foodItem.description}}
				</div>
				<div class="food-price">
					{{foodItem.price}}
				</div>
			</div>
		</div>
		<div class="food-add" @click="toAddFood">
			增加food
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
			}
		},
		onLoad(options) {
			console.log(this)
			this.categoryID = options.categoryID
			this.categoryName = options.categoryName
		},
		onShow() {
			this.init()
		},
		methods: {
			async init() {
				try {
					const res = await this.$fetch.get('/api/food/list', { categoryID: this.categoryID })
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
					}
				})
			},
			toAddFood() {
				this.$myrouter.push({
					name: 'food/edit',
					query: {
						categoryID: this.categoryID,
						categoryName: this.categoryName
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
	font-size: 28rpx;
	padding: 20rpx;
	box-sizing: border-box;
	.food-item  {
		margin-bottom: 30rpx;
		position: relative;
	}
	.food-img {
		height: 100rpx;
		width: 100rpx;
		margin-right: 10rpx;
	}
	.food-info {
		height: 100rpx;
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
		height: 100rpx;
		width: 100%;
		text-align: center;
		line-height: 100rpx;
	}
}
</style>
