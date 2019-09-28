<template>
	<view class="food-list-container flex-col">
		<!-- <image class="logo" src="/static/logo.png"></image> -->
		<div v-for="(foodItem, index) in foodList" :key="index" class="food-item flex-row " @click="toEdit(foodItem.foodID)">
			<image class="food-img" mode="aspectFill" :src="foodItem.imgUrl ? host + foodItem.imgUrl : '/static/img/default-img.svg'"></image>
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
import host from '@/config/host'

	export default {
		data() {
			return {
				foodList: [],
				categoryID: '',
				categoryName: '',
				shopID: '',
				host
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
					this.$showLoading()
					const res = await this.$fetch.get('/api/food/list', { categoryID: this.categoryID, shopID: this.shopID })
					console.log(res)
					this.foodList = res.data || []
					this.$hideLoading()
				} catch(e) {
					this.$hideLoading()
					this.$showModal({
						content: '菜品列表获取失败'
					})
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
					try {
						await this.$showModal({
							content: '删除该菜品信息',
							showCancel: true,
							confirmText: '确认删除'
						})
					} catch(e) {
						console.log(e)
						return
					}
					this.$showLoading()
					const res = await this.$fetch.post('/api/food/delete', { foodID, shopID: this.shopID })
					this.$hideLoading()
					this.$showModal({
						content: '删除成功'
					})
				} catch (e) {
					this.$hideLoading()
					this.$showModal({
						content: '删除失败'
					})
					console.log(e)
					return
				}
				this.init()
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
