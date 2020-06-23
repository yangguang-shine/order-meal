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
			<image class="food-img" mode="aspectFill" :src="foodInfo.imgUrl ? host + foodInfo.imgUrl :'/static/img/default-img.svg'" @click="chooseImg"></image>
		</div>
		<div class="flex-row flex-ja-center">
			<div v-if="foodID" class="food-button" @click="editFood" :style="{'background-color': $mainColor}">
				修改			
			</div>
			<div v-else class="food-button" @click="addFood" :style="{'background-color': $mainColor}">
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
				host,
				addStatus: false
			}
		},
		onLoad(options) {
			this.foodID = options.foodID
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
            	await this.$fetch.post('/manage/uploadImg/img/delete', { imgUrl: this.foodInfo.imgUrl, deleteFood: true })
			}
		},
		methods: {
			async init() {
				try {
					this.$showLoading()
					console.log(this.selectShopItem.shopID)
					const res = await this.$fetch.get('/manage/food/find', { foodID: this.foodID, shopID: this.selectShopItem.shopID })
					this.foodInfo = res.data || {}
					this.$hideLoading()
					console.log()
				} catch(e) {
					console.log(e)
					this.$hideLoading()
				}
			},
			async addFood() {
				try {
					this.$showLoading()
					const res = await this.$fetch.post('/manage/food/add', { ...this.foodInfo, categoryID: this.categoryID, categoryName: this.categoryName, shopID: this.selectShopItem.shopID })
					this.addStatus = true
					this.$hideLoading()
					await this.$showModal({
						content: '添加成功'
					})
					this.$router.back()
				} catch(e) {
					console.log(e)
					this.$hideLoading()
				}
			},
			async editFood() {
				try {
					this.$showLoading()
					const res = await this.$fetch.post('/manage/food/edit', { ...this.foodInfo, shopID: this.selectShopItem.shopID })
					this.$hideLoading()
					await this.$showModal({
						content: '修改成功'
					})
					this.$router.back()
				} catch(e) {
					console.log(e)
					this.$hideLoading()
				}
			},
			chooseImg() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						const maxSize = 1024 * 2 ** 10
						const file = res.tempFiles[0]
						const size = file.size
						if (size > maxSize) {
							uni.showModal({
								title: '提示',
								content: '选择图片要小于1M'
							})
							return;
							
						}
						uni.uploadFile({
							url: `${host}/manage/uploadImg/img/food`,
							filePath: file.path,
							name: 'image',
							formData: {
								shopID: this.selectShopItem.shopID,
								imgUrl: this.foodInfo.imgUrl,
								foodID: this.foodID || '',
							},
							success: async (res) => { //成功的回调
								const data = JSON.parse(res.data)
								console.log(data)
								this.$showLoading({
									title: '上传中'
								})
								this.foodInfo.imgUrl = (data.data || {}).imgUrl
								this.$hideLoading()
								this.$showModal({
									content: '上传成功'
								}) 
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
