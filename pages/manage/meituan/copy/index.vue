<template>
	<view class="meituan-copy-container flex-col flex-a-center">
		<textarea class="textarea-inbput" :value="inputData"  @input="inputChange" maxlength="-1" placeholder="请输入数据"/>
		<view class="judge-input-title">
			{{inputData ? (judgeInput ? '输入数据正确' : '输入数据错误') : '请输入数据'}}
		</view>
		<view v-if="judgeInput" class="confirm-import" :style="{'color': $mainColor, 'border': '2px solid' + $mainColor }" @click="toBulkImportFood">
			确认批量导入
		</view>
		<view  class="confirm-import" :style="{'color': $mainColor, 'border': '2px solid' + $mainColor }" @click="textImg">
			测试图片获取
		</view>
		<view class="category-list">
			<view v-for="(categoryItem,index) in categoryList" :key="index">
				<view class="category-title" @click="changeShowFoodList(categoryItem)">
					{{categoryItem.categoryName}}
				</view>
				<view v-if="categoryItem.showFoodList" class="food-list-box">
					<view class="food-item flex-row" v-if="categoryItem.showFoodList" v-for="(foodItem,index) in categoryItem.foodList" :key="index">
						<image class="food-img" :src="foodItem.originImgUrl" mode=""></image>
						<view class="food-info flex-col flex-j-between">
							<view class="food-name line1">
								{{foodItem.foodName}}
							</view>
							<view class="food-desc line1">
								{{foodItem.description}}
							</view>
							<view class="food-price">
								{{foodItem.price}}{{foodItem.unit ? '/' + foodItem : ''}}
							</view>
						</view>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				judgeInput: false,
				inputData: '',
				categoryList: []
			}
		},
		methods: {
			inputChange(e) {
				try {
					this.inputData = e.detail.value
					const data = JSON.parse(e.detail.value)
					const originCategoryList = data.data.categoryList
					this.judgeInput = true
					console.log(originCategoryList)
					const categoryList = originCategoryList.map((item) => {
						return {
							categoryName: item.categoryName,
							showFoodList: false,
							foodList: item.spuList.map((spuItem) => {
								return {
									foodName: spuItem.spuName,
									categoryName: item.categoryName,
									price: spuItem.originPrice,
									unit: spuItem.unit,
									originImgUrl: spuItem.littleImageUrl,
									description: spuItem.spuDesc,
								}
							})
						}
					})
					this.categoryList = categoryList
					console.log(categoryList)
				} catch (e) {
					console.log(e)
					this.judgeInput = false
				}
			},
			changeShowFoodList(categoryItem) {
				categoryItem.showFoodList = true
			},
			async toBulkImportFood() {
				try {
					this.$showLoading()
					if (!this.selectShopItem.shopID) {
						await this.$showModal({
							content: '缺少shopID'
						})
					}
					await this.$fetch.post('/manage/shop/bulkImportFood', {
						shopID: this.selectShopItem.shopID,
						categoryList: this.categoryList
					})
					this.$showModal({
						content: '批量导入成功'
					})
					this.$hideLoading()
				} catch(e) {
					console.log(e)
					this.$hideLoading()
				}
			},
			async textImg() {
				await this.$fetch.post('/manage/shop/img', {
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.meituan-copy-container {
	.textarea-inbput {
		box-sizing: border-box;
		padding: 20rpx;
		width: 700rpx;
		margin-top: 30rpx;
		height: 400rpx;
		background-color: #eee;
		border-radius: 20rpx;
	}
	.judge-input-title {
		margin-top: 30rpx;
	}
	.confirm-import {
		margin-top: 30rpx;
		font-size: 40rpx;
		height: 80rpx;
		width: 400rpx;
		font-weight: bold;
		line-height: 80rpx;
		border-radius: 20rpx;
		text-align: center;
	}
	.category-list {
		margin-top: 30rpx;
		width: 750rpx;
	}
	.category-title {
		font-weight: bold;
		font-size: 38rpx;
		line-height: 1.4;
	}
	.food-list-box {
		padding-left: 80rpx;
	}
	.food-item {
		height: 150rpx;
		margin-top: 20rpx;
	}
	.food-img {
		width: 150rpx;
		height: 150rpx;
		margin-right: 10rox;
	}
	.food-info {
		height: 150rpx;
	}
	.food-name, .food-desc  {
		max-width: 500rpx;
	}
	
}
</style>
