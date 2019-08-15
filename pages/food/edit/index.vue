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
			<image v-if="foodInfo.imgUrl" class="food-img" :src="foodInfo.imgUrl" @click="chooseImg"></image>
			<div v-else class="food-no-img" @click="chooseImg">+</div>
		</div>
		<div v-if="foodID" class="flex-row flex-j-around">
			<div class="food-button" @click="editFood">
				修改			
			</div>
			<div class="food-button" @click="deleteFood">
				删除		
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
				categoryName: '',
				foodID: '',
				shopID: ''
			}
		},
		onLoad(options) {
			this.foodID = options.foodID
			this.shopID = options.shopID
			this.categoryID = options.categoryID
			this.categoryName = options.categoryName
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
					const res = await this.$fetch.get('/api/food/find', { foodID: this.foodID, shopID: this.shopID })
					this.foodInfo = res.data || {}
					console.log()
				} catch(e) {
					console.log(this.foodInfo)
				}
			},
			async addFood() {
				try {
					const res = await this.$fetch.post('/api/food/add', { ...this.foodInfo, categoryID: this.categoryID, categoryName: this.categoryName, shopID: this.shopID })
					this.$myrouter.back()
				} catch(e) {
					console.log(e)
				}
			},
			async editFood() {
				try {
					const res = await this.$fetch.post('/api/food/edit', { ...this.foodInfo, shopID: this.shopID })
					this.$myrouter.back()
				} catch(e) {
					console.log(e)
				}
			},
			async deleteFood() {
				try {
					const res = await this.$fetch.post('/api/food/delete', { foodID: this.foodID, shopID: this.shopID })
					this.$myrouter.back()
				} catch(e) {
					console.log(e)
				}
			},
			chooseImg() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						const maxSize = 100 * 2 ** 10
						console.log(res)
						const file = res.tempFiles[0]
						const size = file.size
						if (size > maxSize) {
							uni.showModal({
								title: '提示',
								content: '选择图片要小于100KB'
							})
							return;
						}
						let imgUrl = ''
						if (this.foodInfo.imgUrl) {
							var reg = /.+\/(\d+\.)/
							var a = 'http://localhost:8090/images/upload/1565681342882.png'
							imgUrl = this.foodInfo.imgUrl.replace(reg, '$1')
						}
						// http://localhost:8090/images/upload/1565681342882.png
						uni.uploadFile({
							url: 'http://localhost:8090/api/img/uploadImg',
							filePath: file.path,
							name: 'img',
							formData: {
								foodID: this.foodID,
								imgUrl
							},
							success: (res) => {
								const data = JSON.parse(res.data)
								console.log(data)
								this.foodInfo.imgUrl = (data.data || {}).imgUrl
								console.log(this.foodInfo)
							}
						})
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
