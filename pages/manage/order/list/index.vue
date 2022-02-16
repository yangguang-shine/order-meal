<template>
	<div class="order-list-container">
		<div class="tab-list-box flex-row flex-a-center">
			<div
				class="tab-item flex-item"
				v-for="(tabItem, index) in ['全部', '待消费', '已完成', '已退款']"
				:style="{ color: index === tabIndex ? $mainColor : '#333' }"
				@click="changeTabIndex(index)"
				:key="index"
			>
				{{ tabItem }}
			</div>
			<div class="tab-bottom" :style="{ background: $mainColor, left: (tabIndex * 2 + 1) * 12.5 + '%' }"></div>
		</div>
		<view v-show="tabIndex === allOrderIndex" class="order-list-box" v-for="(orderList, allOrderIndex) in allOrderList" :key="allOrderIndex">
			<div class="order-list-item" v-for="(orderItem, index) in orderList" :key="index" @click="toOrderDetail(orderItem)">
				<div class="flex-row">
					<image class="shop-img" :src="orderItem.imgUrl ? host + orderItem.imgUrl : '/static/img/default-img.svg'" mode="scaleToFill"></image>
					<div class="flex-item flex-col flex-j-between">
						<div class="flex-row felx-a-center">
							<div class="shop-name line1">{{ orderItem.shopName }}</div>
							<div class="arrow-left">
								<div class="arrow-first"></div>
								<div class="arrow-second"></div>
							</div>
						</div>
						<div class="order-time">{{ orderItem.orderTime }}</div>
					</div>
				</div>
				<div class="price-info flex-row flex-j-between">
					<div>{{ orderItem.orderTypeTitle }}</div>
					<div class="price-box">
						<span class="price-title">总计：</span>
						<span class="moneu-unit">¥</span>
						<span>{{ orderItem.orderAmount }}</span>
					</div>
				</div>
			</div>
		</view>
<!-- 		<div v-if="showSelectShopBox" class="select-shop-mask flex-row flex-ja-center">
			<div class="select-shop-box">
				<div class="select-title">请选择查看订单的店铺</div>
				<shop v-for="(shopItem, index) in shopList" :key="index" :shopItem="shopItem" @clickShopItem="toSelectShopItem"></shop>
			</div>
		</div> -->
		<div class="select-other-shop" @click="toShowSelectShopBox">其他</div>
		<select-modal v-if="showSelectShopBox" :selectList="shopList" :selectItemKey="selectItemKey" @clickSelectItem="clickSelectItem" @toCloseSelectModal="toCloseSelectModal"></select-modal>
	</div>
</template>

<script>
import getShopMinusList from '@/utils/getShopMinusList';
import { mapMutations } from 'vuex';
import {host} from '@/config/host';
import Shop from '@/components/Shop';
import SelectModal from '@/components/SelectModal.vue';
export default {
	data() {
		return {
			tabIndex: 0,
			allOrderList: [[], [], [], []],
			host,
			shopList: [],
			showSelectShopBox: false,
			selectItemKey: 'title'
		};
	},
	components: {
		Shop,
		'select-modal': SelectModal
	},
	async onShow() {
		try {
			this.$showLoading()
			await this.getOrderList();
			this.$hideLoading()
		} catch(e) {
			console.log(e)
			this.$hideLoading()
		}
	},
	computed: {},
	methods: {
		...mapMutations({
			saveSelectShopItem: 'saveSelectShopItem'
		}),
		async getOrderList() {
			this.$set(this.allOrderList, this.tabIndex, []);
			const data = await this.$fetch('manage/order/orderList', {
				status: this.tabIndex,
				shopID: this.selectShopItem.shopID
			});
			const orderList = (data || []).map(orderItem => ({
				...orderItem,
				orderTypeTitle: this.getOrderTypeTitle(orderItem.orderStatus, orderItem.businessType)
			}));
			this.allOrderList[this.tabIndex].push(...orderList);
		},
		getOrderTypeTitle(orderStatus, businessType) {
			if (orderStatus === 10) {
				return '待接单';
			} else if (orderStatus === 20) {
				return '已接单';
			} else if (orderStatus === 30) {
				if (businessType === 2) {
					return '已送出';
				} else if (businessType === 3) {
					return '制作中';
				}
				return '';
			} else if (orderStatus === 40) {
				if (businessType === 2) {
					return '已送达';
				} else if (businessType === 3) {
					return '已完成';
				}
				return '';
			} else if (orderStatus === 50) {
				return '已取消';
			}
			return '';
		},
		async getShopList() {
			const shopList = await this.$fetch('manage/shop/list');
			this.shopList = shopList;
			this.selectItemKey = 'shopName'
			if (!this.shopList.length) {
				await this.$showModal({
					content: '该管理员无可用店铺，请添加'
				});
				this.$myrouter.reLaunchTo({
					name: 'login',
					query: {
						roleName: 'manage'
					}
				});
			}
		},
		changeTabIndex(index) {
			if (index === this.tabIndex) return;
			this.tabIndex = index;
			// if (this.allOrderList[this.tabIndex].length) return;
			this.getOrderList();
		},
		toOrderDetail(orderItem) {
			this.$myrouter.navigateTo({
				name: 'manage/order/detail',
				query: {
					orderKey: orderItem.orderKey
				}
			});
		},
		async toShowSelectShopBox() {
			try {
				this.$showLoading()
				await this.getShopList()
				this.showSelectShopBox = true;
				this.$hideLoading()
			} catch(e) {
				console.log(e)
				this.$hideLoading()
			}
		},
		toCloseSelectModal() {
			this.showSelectShopBox = false
		},
		async clickSelectItem(shopItem) {
			try {
				this.$showLoading()
				this.saveSelectShopItem(shopItem);
				this.allOrderList = [[], [], [], []];
				await this.getOrderList();
				this.toCloseSelectModal();
				this.$hideLoading()
			} catch(e) {
				console.log(e)
				this.$hideLoading()
			}
		}
	}
};
</script>

<style lang="scss">
page {
	height: 100%;
	background-color: #f5f5f5;
}
.order-list-container {
	font-size: 30rpx;
	color: #333;
	
	padding: 0 20rpx;
	.tab-list-box {
		position: fixed;
		top: 0;
		left: 0;
		height: 100rpx;
		width: 100%;
		background-color: #fff;
		z-index: 3;
	}
	.tab-item {
		transition: all 300ms ease-in-out;
		box-sizing: border-box;
		font-weight: bold;
		line-height: 100rpx;
		text-align: center;
		font-size: 34rpx;
	}
	.tab-bottom {
		transition: all 300ms ease-in-out;
		position: absolute;
		bottom: 0;
		transform: translateX(-50%);
		height: 6rpx;
		width: 100rpx;
	}
	.order-list-box {
		padding-top: 130rpx;
	}
	.order-list-item {
		padding: 40rpx 30rpx;
		background-color: #fff;
		border-radius: 16rpx;
		margin-bottom: 20rpx;
	}
	.shop-img {
		height: 80rpx;
		width: 80rpx;
		margin-right: 20rpx;
		border-radius: 8rpx;
	}
	.shop-name {
		font-size: 34rpx;
	}
	.arrow-left {
		height: 34rpx;
		width: 34rpx;
		// height: 20rpx;
		// width: 20rpx;
		// border: 6rpx solid transparent;
		// border-top: 6rpx solid #333;
		// border-right: 6rpx solid #333;
		// transform: rotate(45deg)
		position: relative;
	}
	.arrow-first {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 16rpx;
		height: 4rpx;
		transform-origin: right center;
		transform: translate(-50%, -50%) rotate(45deg);
		background-color: #333;
	}
	.arrow-second {
		position: absolute;
		top: 50%;
		left: 50%;
		width: 16rpx;
		height: 4rpx;
		transform-origin: right center;
		transform: translate(-50%, -50%) rotate(-45deg);
		background-color: #333;
	}
	.order-time {
		font-size: 24rpx;
		color: #999;
	}
	.price-info {
		margin-top: 30rpx;
	}
	.price-box {
		font-size: 34rpx;
		font-weight: bold;
	}
	.price-title {
		color: #666;
		font-weight: normal;
	}
	.moneu-unit {
		font-size: 26rpx;
		font-weight: bold;
	}
	.select-shop-mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 10;
	}
	.select-shop-box {
		width: 690rpx;
		max-height: 80%;
		box-sizing: border-box;
		padding: 30rpx;
		background-color: #fff;
		border-radius: 25rpx;
	}
	.select-title {
		font-size: 32rpx;
		font-weight: bold;
		padding-bottom: 50rpx;
		text-align: center;
	}
	.select-other-shop {
		position: fixed;
		bottom: 160rpx;
		right: 40rpx;
		width: 70rpx;
		height: 70rpx;
		line-height: 70rpx;
		text-align: center;
		background-color: rgba(0, 0, 0, 0.1);
		color: #333;
		z-index: 4;
		border-radius: 50%;
		font-size: 22rpx;
	}
}
</style>
