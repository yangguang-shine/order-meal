<template>
	<view class="home-container">
		<!-- 		<swiper class="swiper-box" autoplay="true" easing-function="easeInOutCubic" circular="true">
			<swiper-item class="swiper-item" v-for="(img, index) in imgList" :key="index" @click="toShopList">
				<image class="swiper-item-img" :src="img" mode="widthFix"></image>
			</swiper-item>
		</swiper> -->
		<div class="business-type-box flex-row">
			<div class="type-item-box flex-item flex-col flex-ja-center">
				<div class="type-item flex-col flex-ja-center" @click="toShopList(2)" :style="{ background: $mainColor }">
					<image class="type-img" src="/static/img/take-out.png"></image>
				</div>
				<div>外卖</div>
			</div>
			<div class="type-item-box flex-item flex-col flex-ja-center">
				<div class="type-item flex-col flex-ja-center" @click="toShopList(3)" :style="{ background: $mainColor }">
					<image class="type-img" src="/static/img/reserve.png"></image>
				</div>
				<div>堂食</div>
			</div>
		</div>
		<div v-if="nearShopList.length" class="near-shop-box">
			<div class="near-shop-title">附近外卖店铺推荐</div>
			<div class="shop-list"><shop v-for="(shopItem, index) in nearShopList" :key="index" :shopItem="shopItem" @clickShopItem="toOrder(shopItem)" showArrowRight="true"></shop></div>
		</div>
	</view>
</template>

<script>
import {host} from '@/config/host';
import getShopMinusList from '@/utils/getShopMinusList';
import shop from '@/components/shop';
import SelectModal from '@/components/SelectModal.vue';
import { mapMutations } from 'vuex';

export default {
	components: {
		shop,
		'select-modal': SelectModal
	},
	data() {
		return {
			nearShopList: [],
			showSelectBusinessTypeModal: false,
			selectShop: {},
			imgList: [`${host}/images/static/1.png`, `${host}/images/static/2.png`, `${host}/images/static/3.png`]
			// imgList: [`${host}/images/static/1.jpg`, `${host}/images/static/2.jpg`, `${host}/images/static/3.jpg`, `${host}/images/static/4.jpg`, `${host}/images/static/5.jpg` ],
		};
	},
	onLoad() {
		this.init();
	},
	methods: {
		...mapMutations({
			saveShopInfo: 'saveShopInfo',
			saveBusinessType: 'saveBusinessType'
		}),
		async init() {
			try {
				const res = await this.$fetch.get('/user/shop/list', { businessType: 2 });
				const nearShopList = res.data || [];
				this.$showLoading();
				nearShopList.forEach(item => {
					item.minusList = getShopMinusList(item.minus || '');
				});
				this.$hideLoading();
				this.nearShopList = nearShopList;
			} catch (e) {
				console.log(e);
				this.$hideLoading();
			}
		},
		toShopList(businessType) {
			this.saveBusinessType(businessType)
			this.$myrouter.navigateTo({
				name: 'user/shop/list',
				query: {
					businessType
				}
			});
		},
		toOrder(shopItem) {
			this.saveShopInfo(shopItem);
			this.saveBusinessType(2)
			this.$myrouter.navigateTo({
				name: 'user/menu/list',
				query: {
					businessType: 2
				}
			});
		}
	}
};
</script>

<style lang="scss">
	page {
		height: 100%;
		background-color: $color-bg-f5;

	}
.home-container {
	font-size: 28rpx;
	color: #333;
	.swiper-box {
		height: 280rpx;
		width: 100%;
	}
	.swiper-item-box {
		width: 100%;
		height: 100%;
	}
	.swiper-item-img {
		padding: 30rpx;
		width: 100%;
		height: 300rpx;
		box-sizing: border-box;
	}
	.business-type-box {
		padding: 20rpx 0;
		background-color: #fff;
		margin: 20rpx;
		border-radius: 20rpx;
	}
	.type-item-box {
	}
	.type-item {
		width: 150rpx;
		height: 150rpx;
		border-radius: 50%;
	}
	.type-img {
		width: 80rpx;
		height: 80rpx;
	}
	.near-shop-title {
		padding: 10rpx 30rpx;
		font-size: 32rpx;
		font-weight: bold;
		// margin-bottom: 20rpx;
	}
	.shop-list {
		background-color: $color-bg-f5;
		padding: 20rpx 20rpx 0;
	}
	// .near-shop-box {
	// 	// padding: 30rpx;
	// }
}
</style>
