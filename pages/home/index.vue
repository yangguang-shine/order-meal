<template>
	<view class="home-container">
		<swiper class="swiper-box" autoplay="true" easing-function="easeInOutCubic" circular="true">
			<swiper-item class="swiper-item" v-for="(img, index) in imgList" :key="index" @click="toShopList">
				<image class="swiper-item-img" :src="img" mode="widthFix"></image>
			</swiper-item>
		</swiper>
		<div class="business-type-box flex-row">
			<div class="type-item-box flex-item flex-col flex-ja-center">
				<div class="type-item flex-col flex-ja-center" :style="{'background': $mainColor}" @click="toShopList('')">
					<image class="type-img" src="/static/img/all-type.png"></image>
				</div>
				<div>全部</div>
			</div>
			<div class="type-item-box flex-item flex-col flex-ja-center">
				<div class="type-item flex-col flex-ja-center" @click="toShopList(2)" :style="{'background': $mainColor}">
					<image class="type-img" src="/static/img/take-out.png"></image>
				</div>
					<div>外卖</div>
			</div>			
			<div class="type-item-box flex-item flex-col flex-ja-center">
				<div class="type-item flex-col flex-ja-center" @click="toShopList(3)" :style="{'background': $mainColor}">
					<image class="type-img" src="/static/img/reserve.png"></image>
				</div>
					<div>预约</div>
			</div>
		</div>
		<div v-if="nearShopList.length" class="near-shop-box">
			<div class="near-shop-title">附近店铺推荐</div>
			<div class="shop-list">
				<shop v-for="(shopItem, index) in nearShopList" :key="index" :shopItem="shopItem" pageSign="menu"  @clickShopItem="toOrder"></shop>
			</div>
		</div>
	</view>
</template>

<script>
import host from '@/config/host';
import getShopMinusList from '@/utils/getShopMinusList';
import shop from '@/components/shop'
import { mapMutations } from 'vuex'

	export default {
		components:{
			shop
		},
		data() {
			return {
				nearShopList: [],
				imgList: [`${host}/images/static/1.jpg`, `${host}/images/static/2.jpg`, `${host}/images/static/3.jpg`, `${host}/images/static/4.jpg`, `${host}/images/static/5.jpg` ]
			}
		},
		onLoad() {
			this.init()
		},
		methods: {
			...mapMutations({
				saveOrderShopInfo:'saveOrderShopInfo',
				saveBusinessType:'saveBusinessType',
			}),
			async init() {
				try {
					const res = await this.$fetch.get('/api/shop/list')
					const nearShopList = res.data || []
					this.$showLoading()
					nearShopList.forEach((item) => {
						item.minusList = getShopMinusList(item.minus || '')
					})
					this.$hideLoading()
					this.nearShopList = nearShopList
				} catch (e) {
					console.log(e)
					this.$hideLoading()
				}
			},
			toShopList(businessType) {
				this.$myrouter.push({
					name: 'shop/list',
					query: {
						pageSign: 'menu',
						businessType
					}
				})
			},
			toOrder(shopItem) {
				this.saveOrderShopInfo(shopItem)
                this.saveBusinessType('')
 				this.$myrouter.push({
					name: 'menu',
                })
			}
		}
	}
</script>

<style lang="scss">
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
			margin-bottom: 20rpx;
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
			height: 80rpx
		}
		.near-shop-title {
			padding-left: 30rpx;
			font-weight: bold;
			margin-bottom: 20rpx;
		}
		.near-shop-box {
			padding: 30rpx;
		}
}
</style>
