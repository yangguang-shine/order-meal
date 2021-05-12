<template>
	<view class="recommand-shop-list-container">
		<view class="recommand-shop-title flex-row flex-ja-center">推荐商家</view>
		<view class="tab-list-block">
			<view id="tab-list-fixed-id" class="tab-list flex-row flex-a-center" :class="{ 'tab-list-fixed': tabListFixed }" :style="{ top: tabListFixed ? topAddressSearchHeight + 'px' : '' }">
				<view v-for="(tabItem, index) in tabList" :key="index" class="tab-item flex-item flex-row flex-ja-center" :class="selectTabItem.type === tabItem.type ? 'select-tab-item' : ''" @click="changeTabItem(tabItem)">{{ tabItem.title }}</view>
			</view>
		</view>
		<div v-if="recommandShopList.length" class="shop-list">
			<!-- <div class="near-shop-title">附近外卖店铺推荐</div> -->
			<shop v-for="(shopItem, index) in recommandShopList" :key="index" :shopItem="shopItem" @clickShopItem="toOrder" showArrowRight></shop>
		</div>
	</view>
</template>

<script>
	
import shop from '@/components/shop';
	
export default {
	components:{
		shop
	},
	props: {
		recommandShopList: {
			type: Array,
			default: () => []
		},
		tabListFixed: {
			type: Boolean,
			default: false
		},
		selectTabItem: {
			type: Object,
			default: () => {}
		},
		topAddressSearchHeight: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			tabList: [
				{
					title: '综合排序',
					type: 'comprehensive'
				},
				{
					title: '销量最高',
					type: 'sale'
				},
				{
					title: '距离最近',
					type: 'distance'
				}
			]
		};
	},
	mounted() {
		setTimeout(() => {
			const query = uni.createSelectorQuery().in(this);
			query
				.select('#tab-list-fixed-id')
				.boundingClientRect(res => {
					console.log(res);
					this.$emit('setTabListTopHeight', res.top, res.height);
				})
				.exec();
		}, 100);
	},
	methods: {
		changeTabItem(tabItem) {
			if (tabItem.type === this.selectTabItem.type) return;
			this.$emit('changeTabItem', tabItem);
		},
		toOrder(shopItem) {
			this.$emit('toOrder', shopItem)
		}
	}
};
</script>

<style lang="scss" scoped>
.recommand-shop-list-container {
	margin: 20rpx 20rpx 0;
	padding-bottom: 20rpx;
	background-color: #fff;
	border-top-left-radius: 12rpx;
	border-top-right-radius: 12rpx;
	.recommand-shop-title {
		padding-top: 20rpx;
		position: relative;
		height: 72rpx;
		width: 100%;
		color: #000;
		font-size: 30rpx;
		// margin-bottom: 10rpx;
	}
	.recommand-shop-title::before {
		content: '';
		height: 2rpx;
		width: 40rpx;
		background-color: #999;
		margin-right: 26rpx;
	}
	.recommand-shop-title::after {
		content: '';
		height: 2rpx;
		width: 40rpx;
		background-color: #999;
		margin-left: 26rpx;
	}
	.tab-list-block {
		position: relative;
		width: 100%;
		height: 80rpx;
		.tab-list {
			position: absolute;
			top: 0;
			left: -20rpx;
			width: 750rpx;
			height: 80rpx;
			box-sizing: border-box;
			// border-top: 1rpx solid #e4e4e4;
			// border-bottom: 1rpx solid #e4e4e4;
		}
		.tab-list-fixed {
			position: fixed;
			left: 0;
			border-top: none;
			background-color: #fff;
			z-index: 100;
		}
		.tab-item {
			color: #666;
			height: 100%;
		}
		.select-tab-item {
			font-weight: bold;
			color: #333;
		}
	}
	.shop-list {
		// margin-top: 30rpx;
		// height: 2000rpx;
		padding: 0 20rpx;
		.com-shop-container {
			border-bottom: 1rpx solid #eee;
			padding: 30rpx 0;

		}
		.com-shop-container:last-child {
			border-bottom: none;
		}
	}

}
</style>
