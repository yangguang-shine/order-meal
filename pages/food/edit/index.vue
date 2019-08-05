<template>
	<view class="food-info-container">
		<!-- <image class="logo" src="/static/logo.png"></image> -->
		<div class="food-info-item flex-row flex-a-center">
			<div>foodName:</div>
			<input type="text" v-model="foodInfo.foodName">
		</div>
		<div class="food-info-item flex-row flex-a-center">
			<div>price:</div>
			<input type="text"  v-model="foodInfo.price">
		</div>
		<div class="food-info-item flex-row flex-a-center">
			<div>unit:</div>
			<input type="text" v-model="foodInfo.unit">
		</div>
		<div class="food-info-item flex-row flex-a-center">
			<div>description:</div>
			<input type="text" v-model="foodInfo.description">
		</div>
		<div class="food-info-item flex-row flex-a-center">
			<div>imgUrl:</div>
			<image v-if="foodID.imgUrl" class="food-img" :src="foodID.imgUrl" @click="chooseImg"></image>
			<div v-else class="food-no-img" @click="chooseImg">+</div>
		</div>
		<div v-if="foodID" class="flex-row flex-j-around">
			<div class="food-button" @click="editFood">
				修改			
			</div>
			<div class="food-button" @click="editFood">
				修改			
			</div>
		</div>
		<div v-else class="felx-row flex-ja-center">
			<div class="food-button" @click="addFood">
				增加			
			</div>
		</div>
		
	</view>
</template>
<script>
	export default {
		data() {
			return {
				foodInfo: {
					foodName: '',
					price: '',
					unit: '',
					description: '',
					imgUrl: '',
				},
				categoryID: '',
				foodID: '',
			}
		},
		onLoad(options) {
			this.foodID = options.foodID
			this.categoryID = options.categoryID
			if (!this.foodID) {
				this.foodInfo.imgUrl = ''
			}
			if (this.foodID) {
				this.init()
			}
		},
		methods: {
			async init() {
				try {
					const res = await this.$fetch.post('/api/food/find', { foodID: this.foodID})
					this.foodInfo = res.data 
				} catch(e) {
					console.log(e)
				}
			},
			async addFood() {
				try {
					const res = await this.$fetch.post('/api/food/add', { ...this.foodInfo, categoryID: this.categoryID })
				} catch(e) {
					console.log(e)
				}
			},
			async editFood() {
				try {
					const res = await this.$fetch.post('/api/food/edit', { ...foodInfo })
				} catch(e) {
					console.log(e)
				}
			},
			async deleteFood() {
				try {
					const res = await this.$fetch.post('/api/food/delete', { foodID: this.foodID })
				} catch(e) {
					console.log(e)
				}
			},
		}
	}
</script>

<style lang="scss" scoped>
page {
	height: 100%;
}
.food-info-container {
	min-height: 100%;
	font-size: 28rpx;
	box-sizing: border-box;
	padding: 20rpx;
	.food-info-item {
		padding: 16rpx;
		border-bottom: 1px solid #eee
	}
	.food-img {
		height: 100rpx;
		width: 100rpx;
	}
	.food-no-img {
		height: 100rpx;
		width: 100rpx;
		text-align: center;
		line-height: 92rpx;
		font-size: 60rpx;
	}
	.food-button {
		margin-top: 30rpx;
		line-height: 80rpx;
		text-align: center;
		height: 80rpx;
		width: 200rpx;
        border: 1px solid #eee;
	}
}
</style>
