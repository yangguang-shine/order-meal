<template>
	<div class="shop-edit-container">
		<div class="edit-item flex-row flex-a-center">
			<div class="title">店铺名称：</div>
			<input type="text" class="flex-item input-name" v-model="shopInfo.shopName" />
		</div>
		<div class="edit-item flex-row flex-a-center" @click="chooseAddress">
			<div class="title">门店地址：</div>
			<div class="flex-item flex-item">{{ shopInfo.address || '请选择地址' }}</div>
		</div>
		<picker class="picker-box" mode="time" @change="startPickerChange" value="09:00">
			<div class="edit-item flex-row flex-a-center">
				<div class="title">开店时间：</div>
				<div class="flex-item">{{ shopInfo.startTime || '' }}</div>
			</div>
		</picker>
		<picker class="picker-box" mode="time" @change="endPickerChange" value="18:00">
			<div class="edit-item flex-row flex-a-center">
				<div class="title">闭店时间：</div>
				<div class="flex-item">{{ shopInfo.endTime || '' }}</div>
			</div>
		</picker>
		<div class="flex-row">
			<div class="title">业务类型：</div>
			<div class="business-type-list">
				<div
					v-for="(businessTypeItem, index) in businessTypeList"
					:key="index"
					class=" flex-row flex-a-center business-type-item center"
					@click="changeSelected(businessTypeItem)"
				>
					<div class="icon-box flex-row flex-ja-center" :style="{ color: businessTypeItem.selected ? $mainColor : '' }">
						<icon class="icon-img" v-if="businessTypeItem.selected" type="success_no_circle" :color="$mainColor" size="20"></icon>
					</div>
					<div class="business-type-title">{{ businessTypeItem.title }}</div>
				</div>
			</div>
		</div>
		<div class="flex-row flex-a-center">
			<div class="title">店铺图片：</div>
			<image class="food-img" mode="aspectFill" :src="shopInfo.imgUrl ? host + shopInfo.imgUrl : '/static/img/default-img.svg'" @click="chooseImg"></image>
		</div>
		<div class="edit-item-minus flex-row">
			<div class="title">满减营销：</div>
			<div class="flex-item">
				<div v-if="!minusList.length" class="no-minus minus-item center">暂无满减营销</div>
				<div v-for="(minusItem, index) in minusList" :key="minusItem.random" class="minus-item flex-row flex-j-between flex-a-center">
					<div class="flex-row flex-a-center">
						<div class="minus-item-title">第{{ index + 1 }}档:</div>
						<div class="minus-reach-title">满</div>
						<input
							type="number"
							class="center input-minus"
							v-model="minusItem.reach"
							:style="{ color: $mainColor }"
							selection-start="-1"
							selection-end="-1"
							cursor="-1"
						/>
						<div class="minus-reduce-title">减</div>
						<input
							type="number"
							class="center input-minus"
							v-model="minusItem.reduce"
							:style="{ color: $mainColor }"
							selection-start="-1"
							selection-end="-1"
							cursor="-1"
						/>
					</div>
					<image class="delete-icon" src="/static/img/shop-delete.svg" @click.stop="deleteMinusItem(index)"></image>
				</div>
				<div class="add-minus" :style="{ color: $mainColor }" @click="addMinus">添加满减</div>
			</div>
		</div>
		<div class="flex-row flex-j-center">
			<div v-if="shopID" class="button" :style="{ 'background-color': $mainColor }" @click="editShop">修改</div>
			<div v-else class="button" :style="{ 'background-color': $mainColor }" @click="addShop">新增</div>
		</div>
	</div>
</template>

<script>
import host from '@/config/host';
import getShopMinusList from '@/utils/getShopMinusList';
export default {
	data() {
		return {
			shopInfo: {
				shopName: '',
				imgUrl: '',
				address: '',
				startTime: '09:00',
				endTime: '18:00',
				minus: '',
				addState: false,
				businessTypes: ''
			},
			businessTypeList: [
				{
					title: '外卖',
					businessType: 2,
					selected: false
				},
				{
					title: '堂食',
					businessType: 3,
					selected: false
				}
			],
			minusList: [],
			shopID: '',
			host
		};
	},
	async onLoad(options) {
		if (options.shopID) {
			this.shopID = options.shopID;
		}
		try {
			this.$showLoading();
			if (this.shopID) {
				const res = await this.$fetch.get('/manage/shop/find', { shopID: this.shopID });
				this.shopInfo = res.data || {};
				this.minusList = getShopMinusList(this.shopInfo.minus || '');
				if (this.shopInfo.businessTypes) {
					const businessTypeList = this.shopInfo.businessTypes.split(',');
					this.businessTypeList.forEach(item => {
						const find = businessTypeList.find(a => Number(a) === item.businessType);
						if (find) item.selected = true;
					});
				}
			} else {
				this.shopInfo = {
					shopName: `店铺${Math.random()
						.toString(36)
						.slice(2, 4)}`,
					imgUrl: '',
					address: '西直门凯德茂地铁站',
					startTime: '09:00',
					endTime: '18:00',
					minus: '',
					addState: false,
					businessTypes: ''
				};
			}
			this.$hideLoading();
		} catch (e) {
			console.log(e);
			this.$hideLoading();
			this.$showModal({
				content: '店铺信息获取失败'
			});
		}
	},
	async onUnload() {
		console.log(!this.shopID && this.shopInfo.imgUrl && !this.addState);
		if (!this.shopID && this.shopInfo.imgUrl && !this.addState) {
			await this.$fetch.post('/manage/uploadImg/img/delete', { imgUrl: this.shopInfo.imgUrl, deleteShop: true });
		}
		this.shopID = '';
		this.addState = false;
	},
	methods: {
		startPickerChange(e) {
			const value = e.detail.value || [];
			this.shopInfo.startTime = value;
		},
		endPickerChange(e) {
			const value = e.detail.value || [];
			this.shopInfo.endTime = value;
		},
		chooseAddress() {
			uni.chooseLocation({
				success: res => {
					console.log(res);
					this.shopInfo.address = res.address;
				},
				fail: res => {
					console.log(res);
				}
			});
		},
		checkoutMinus() {
			let minusArray = [];
			let price = 0;
			const minusStatus = this.minusList.every((item, index) => {
				const reg = /^[1-9]\d*$/;
				if (Number(item.reach) <= price) {
					this.$showModal({
						content: `满减档次必须递增`
					});
					return false;
				}
				price = Number(item.reach);
				if (reg.test(item.reach) && reg.test(item.reduce) && Number(item.reach) > Number(item.reduce)) {
					minusArray.push(`${item.reach}-${item.reduce}`);
					return true;
				} else {
					this.$showModal({
						content: `第${index + 1}档输入有误`
					});
					return false;
				}
			});
			return {
				minusArray,
				minusStatus
			};
		},
		async editShop() {
			try {
				this.getShopBusinessTypes();
				const result = this.checkoutMinus();
				if (!result.minusStatus) return;
				this.shopInfo.minus = result.minusArray.join(',');
				this.$showLoading({
					title: '修改中'
				});
				await this.$fetch.post('/manage/shop/edit', { ...this.shopInfo, shopID: this.shopID });
				this.$hideLoading();
				await this.$showModal({
					content: '修改成功'
				});
				this.$router.back();
			} catch (e) {
				this.$hideLoading();
				console.log(e);
			}
		},
		async addShop() {
			try {
				this.getShopBusinessTypes();
				const result = this.checkoutMinus();
				if (!result.minusStatus) return;
				this.shopInfo.minus = result.minusArray.join(',');
				this.$showLoading({
					title: '添加中'
				});
				console.log(this.shopInfo);
				await this.$fetch.post('/manage/shop/add', { ...this.shopInfo });
				this.addState = true;
				this.$hideLoading();
				await this.$showModal({
					content: '添加成功'
				});

				this.$router.back();
			} catch (e) {
				console.log(e);
				this.$hideLoading();
			}
		},
		getShopBusinessTypes() {
			const selectBusinessType = [];
			this.businessTypeList.forEach(item => {
				if (item.selected) {
					selectBusinessType.push(item.businessType);
				}
			});
			this.shopInfo.businessTypes = selectBusinessType.join(',');
		},
		changeSelected(businessTypeItem) {
			businessTypeItem.selected = !businessTypeItem.selected;
		},
		addMinus() {
			this.minusList.push({
				reach: '',
				reduce: '',
				random: Math.random()
			});
		},
		deleteMinusItem(index) {
			this.minusList.splice(index, 1);
		},
		chooseImg() {
			uni.chooseImage({
				count: 1,
				success: res => {
					console.log(111)
					console.log(res)
					const maxSize = 1024 * 2 ** 10;
					const file = res.tempFiles[0];
					const size = file.size;
					if (size > maxSize) {
						uni.showModal({
							title: '提示',
							content: '选择图片要小于1M'
						});
						return;
					}
					
					console.log(res.tempFilePaths[0])
					uni.uploadFile({
						url: `${host}/manage/uploadImg/img/shop`,
						filePath: res.tempFilePaths[0],
						name: 'image',
						// header: {
						// 	'content-type': 'multipart/form-data'
						// },
						formData: {
							shopID: this.shopID,
							imgUrl: this.shopInfo.imgUrl
						},
						success: async res => {
							//成功的回调
							console.log(res);
							const data = JSON.parse(res.data);
							this.$showLoading({
								title: '上传中'
							});
							this.shopInfo.imgUrl = (data.data || {}).imgUrl;
							this.$hideLoading();
							this.$showModal({
								content: '上传成功'
							});
						}
					});
				}
			});
		}
	}
};
</script>
<style scoped lang="scss">
.shop-edit-container {
	font-size: 32rpx;
	padding: 30rpx;
	line-height: 1;
	input {
		outline: none;
		border: none;
		list-style: none;
	}
	.edit-item {
		height: 50rpx;
		line-height: 50rpx;
		padding-bottom: 20rpx;
	}
	.edit-item-minus {
		padding-bottom: 20rpx;
		line-height: 50rpx;
	}
	.input-name {
		height: 100%;
		line-height: 1;
	}
	.title {
		width: 180rpx;
	}
	.food-img {
		width: 100rpx;
		height: 100rpx;
	}
	.minus-item {
		margin-bottom: 20rpx;
	}
	.minus-item-title {
		margin-right: 20rpx;
	}
	.minus-reach-title,
	.minus-reduce-title {
		margin-right: 20rpx;
	}
	.no-minus {
		color: #999;
	}
	.input-minus {
		width: 80rpx;
		border-bottom: 2rpx solid;
		border-radius: 8rpx;
		box-sizing: border-box;
		margin-right: 20rpx;
		font-size: 26rpx;
	}
	.input-minus::after {
		border: none;
	}
	.delete-icon {
		height: 40rpx;
		width: 40rpx;
		padding-right: 30rpx;
	}
	.add-minus {
		margin: 0 auto;
		text-align: center;
		width: 200rpx;
		border: 2rpx solid;
		border-radius: 25rpx;
	}
	.button {
		margin-top: 40rpx;
		width: 300rpx;
		height: 80rpx;
		line-height: 80rpx;
		text-align: center;
		border-radius: 40rpx;
		color: #fff;
	}
	.delete-button {
		background-color: #999;
		color: #fff;
	}

	.business-type-item {
		margin-bottom: 20rpx;
	}
	.business-type-title {
		padding-left: 30rpx;
	}
	.icon-box {
		height: 24px;
		width: 24px;
		border: 2rpx solid;
		color: #999;
		border-radius: 10rpx;
	}
}
</style>
