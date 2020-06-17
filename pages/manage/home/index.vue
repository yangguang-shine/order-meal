<template>
	<div class="shop-list-container">
		<div class="shop-list">
			<shop
				v-for="(shopItem, index) in shopList"
				:key="index"
				:shopItem="shopItem"
				:showDeleteShop="true"
				:showEditShop="true"
				@clickShopItem="toShowSelectMoadl(shopItem)"
				@toDeleteShop="toDeleteShop(shopItem)"
			></shop>
		</div>
		<div class="add-box flex-row flex-ja-center" @click="toAddShop"><image class="add-icon" src="/static/img/shop-add.svg"></image></div>
		<view v-if="showSelectModal" class="select-modal-container flex-row flex-ja-center" @click="toCloseSelectModal">
			<view class="select-modal-box flex-col flex-a-center" @click.stop>
				<view class="select-title">
					请选择
				</view>
				<view class="select-item" @click="toShopFoodInfo">去店铺菜品信息列表</view>
				<view class="select-item" @click="toShopOrderInfo">去店铺订单信息列表</view>
				<icon class="close-icon" type="cancel" size="26" color="#eee" @click="toCloseSelectModal"/>
			</view>
		</view>
	</div>
</template>

<script>
import shop from '@/components/shop';
import getShopMinusList from '@/utils/getShopMinusList';

export default {
	components: {
		shop
	},
	data() {
		return {
			shopList: [],
			showSelectModal: false,
			selectShopItem: {},
		};
	},
	onShow() {
		this.init();
	},
	methods: {
		async init() {
			try {
				this.$showLoading();
				const res = await this.$fetch.get('/manage/shop/list');
				const { data = {} } = res;
				const shopList = data.shopList;
				shopList.forEach(item => {
					item.minusList = getShopMinusList(item.minus || '');
				});
				this.shopList = shopList;
				this.$hideLoading();
			} catch (e) {
				console.log(e);
				this.$hideLoading();
			}
		},
		toShowSelectMoadl(shopItem) {
			this.selectShopItem = shopItem
			this.showSelectModal = true;
		},
		toShopOrderInfo() {
			this.toCloseSelectModal()
			this.$router.navigateTo({
				name: 'manage/order/list',
				query: {
					shopID: this.selectShopItem.shopID
				}
			});
		},
		toShopFoodInfo() {
			this.toCloseSelectModal()
			this.$router.navigateTo({
				name: 'manage/category/list',
				query: {
					shopID: this.selectShopItem.shopID
				}
			});
		},
		toCloseSelectModal() {
			this.showSelectModal = false
		},
		pickerChange(e) {
			console.log(e);
		},
		async toDeleteShop(shopItem) {
			try {
				try {
					await this.$showModal({
						content: '删除店铺将一并删除该店铺的菜品分类、菜品详情、订单列表，操作不可逆',
						showCancel: true,
						confirmText: '确认删除'
					});
				} catch (e) {
					return;
				}
				this.$showLoading({
					title: '删除中'
				});
				await this.$fetch.post('/manage/shop/delete', { shopID: shopItem.shopID });
				this.$hideLoading();
				await this.$showModal({
					content: '删除成功'
				});
			} catch (e) {
				console.log(e);
				this.$hideLoading();
				await this.$showModal({
					content: '删除失败'
				});
				return;
			}
			try {
				this.$showLoading({
					title: '加载中'
				});
				await this.init();
				this.$hideLoading();
			} catch (e) {
				console.log(e);
				this.$hideLoading();
			}
		},
		toEditShop(shopItem = {}) {
			this.$router.navigateTo({
				name: 'manage/shop/edit',
				query: {
					shopID: shopItem.shopID,
					canOperation: 'true'
				}
			});
		},
		toAddShop() {
			this.$router.navigateTo({
				name: 'manage/shop/edit'
			});
		}
	}
};
</script>
<style scoped lang="scss">
.shop-list-container {
	font-size: 28rpx;
	color: #333;
	line-height: 1;
	padding-bottom: 70rpx;
	.shop-list {
		padding: 30rpx;
	}
	.shop-item {
		margin-bottom: 30rpx;
		position: relative;
	}
	.shop-img {
		width: 120rpx;
		height: 120rpx;
		margin-right: 20rpx;
	}
	.shop-info-box {
		height: 120rpx;
		line-height: 1.3;
	}
	.shop-name {
		font-size: 32rpx;
		font-weight: bold;
		max-width: 500rpx;
	}
	.shop-open-time {
		font-size: 24rpx;
		margin-top: 10rpx;
		color: #999;
	}
	.shop-address {
		max-width: 500rpx;
		color: #666;
	}
	.delete-icon {
		position: absolute;
		top: 0rpx;
		right: 0rpx;
		padding: 10rpx 20rpx;
		width: 30rpx;
		height: 30rpx;
	}
	.edit-icon {
		position: absolute;
		bottom: 0;
		right: 0;
		padding: 10rpx 20rpx;
		width: 30rpx;
		height: 30rpx;
	}
	.add-box {
		position: fixed;
		bottom: var(--window-bottom);
		left: 0;
		width: 100%;
		height: 100rpx;
		background-color: #fff;
		line-height: 100rpx;
		text-align: center;
	}
	.add-icon {
		width: 50rpx;
		height: 50rpx;
	}
	.edit {
		position: absolute;
		padding: 30rpx;
		right: 80rpx;
		top: 50%;
		transform: translateY(-50%);
	}
	.add {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		text-align: center;
	}
	.select-modal-container {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		// background-color: rgba(0, 0, 0, 0.6);
		background-color: rgba($color: #000000, $alpha: 0.6);
	}
	.select-modal-box {
		position: relative;
		width: 600rpx;
		padding: 60rpx 0;
		box-sizing: border-box;
		background-color: #fff;
		border-radius: 24rpx;
	}
	.select-title {
		font-weight: bold;
		font-size: 44rpx;
		padding-bottom: 20rpx;
	}
	.select-item {
		font-size: 32rpx;
		margin-top: 50rpx;
		width: 80%;
		height: 120rpx;
		line-height: 120rpx;
		border: 1.5rpx solid #eee;
		border-radius: 12rpx;
		text-align: center;
	}
	.close-icon {
		position: absolute;
		padding: 10rpx;
		top: -100rpx;
		right: 0;
	}
}
</style>
