<template>
	<view class="food-info-container">
		<div class="edit-item flex-row flex-a-center">
            <div class="title">菜品名称：</div>
            <input type="text" class="flex-item input-name" v-model="foodInfo.foodName">
        </div>
		<div class="edit-item flex-row flex-a-center">
            <div class="title">菜品价格：</div>
            <input type="text" class="flex-item input-name" v-model="foodInfo.price">
        </div>
		<div class="edit-item flex-row flex-a-center">
            <div class="title">菜品单位：</div>
            <input type="text" class="flex-item input-name" v-model="foodInfo.unit">
        </div>
		<div class="edit-item flex-row flex-a-center">
            <div class="title">菜品描述：</div>
            <input type="text" class="flex-item input-name" v-model="foodInfo.description">
        </div>
		<div class="flex-row flex-a-center">
			<div class="title">店铺图片：</div>
			<image class="food-img" :src="foodInfo.imgUrl ? host + foodInfo.imgUrl :'/static/img/default-img.svg'" @click="chooseImg"></image>
		</div>
		<div v-if="foodID" class="flex-row flex-j-around">
			<div class="food-button" @click="editFood" :style="{'background-color': $mainColor}">
				修改			
			</div>
			<div class="food-button delete-button" @click="deleteFood">
				删除		
			</div>
		</div>
		<div v-else class="flex-row flex-ja-center">
			<div class="food-button" @click="addFood" :style="{'background-color': $mainColor}">
				增加			
			</div>
		</div>
		
	</view>
</template>
<script>
import host from '@/config/host'

	export default {
		data() {
			return {
				foodInfo: {
					foodName: '菜品',
					price: '7.3',
					unit: '份',
					description: '哈哈哈',
					imgUrl: '',
				},
				categoryID: '',
				categoryName: '',
				foodID: '',
				shopID: '',
				addStatus: false,
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
			} else {
				this.foodInfo.foodName = `${this.foodInfo.foodName}${Math.random().toString(36).slice(2, 4)}`
			}
		},
		async onUnload() {
			if (!this.foodID && this.foodInfo.imgUrl && !this.addStatus) {
				await this.$fetch.post('/api/img/delete', { imgUrl: this.foodInfo.imgUrl })
			}
			this.addStatus = false
			this.shopID = ''
			this.shopInfo = {
					shopName: '',
					imgUrl: '',
					address: '',
					startTime: '',
					endTime: '',
				};
			this.foodInfo = {
				foodName: '',
				price: '',
				unit: '',
				description: '',
				imgUrl: '',
			},
			this.categoryID = ''
			this.categoryName = ''
			this.foodID = ''
			this.shopID = ''
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
					this.addStatus = true
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
							imgUrl = this.foodInfo.imgUrl.replace(reg, '$1')
						}
						// http://localhost:8090/images/upload/1565681342882.png
						console.log(this.foodID)
						console.log(imgUrl)
						console.log(file.path)
						uni.uploadFile({
							url: `${host}/api/img/uploadImg`,
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
	font-size: 32rpx;
    padding: 30rpx;
    line-height: 1;
    .edit-item {
        height: 50rpx;
        line-height: 50rpx;
        padding-bottom: 20rpx; 
    }
    .input-name {
        height: 100%;
        line-height: 1;
    }
    .title {
        width: 180rpx;
    }
	.food-img {
		height: 100rpx;
		width: 100rpx;
	}
	.food-button {
		margin-top: 50rpx;
		line-height: 80rpx;
		text-align: center;
		height: 80rpx;
		width: 300rpx;
		color: #fff;
	}
	.delete-button {
		background-color: #999;
	}
}
</style>
