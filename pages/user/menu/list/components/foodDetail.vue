<template>
	<view class="food-detail-container flex-row flex-ja-center" @click.stop="closeFoodDetail" >
		<view class="food-detail-box" @click.stop  :class="showComponents ? 'show-food-detail-container' : 'hide-food-detail-container'">
			<view class="food-img"></view>
			<view class="food-info">
				<view class="food-name">{{foodItem.foodName}}</view>
				<view class="food-description">{{foodItem.foodName}}</view>
				<view class="food-price-order flex-row flex-a-between">
					<div class="food-price-order">¥{{foodItem.price}}</div>
					<food-add-minus :foodItem="foodItem"  @addCount="addCount" @minusCount="minusCount"></food-add-minus>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import foodAddMinus from './item/foodAddMinus.vue';
	import { delaySync } from '@/utils/index.js'
export default {
	components: {
		foodAddMinus
	},
	props: {
		foodItem: {
			type: Object,
			default: () => {}
		}
	},
	data() {
		return {
			showComponents: false
		}
	},
	mounted() {
		console.log(this.foodItem)
		setTimeout(() => {
			this.showComponents = true
		}, 0);
	},
	methods: {
		
		addCount(foodItem) {
		    this.$emit('addCount', foodItem);
		},
		minusCount(foodItem) {
		    this.$emit('minusCount', foodItem);
		},
		async closeFoodDetail() {
			this.showComponents = false
			await delaySync(200)
			this.$emit('closeFoodDetail')
		}
	},
};

</script>

<style lang="scss" scoped>

.food-detail-container {
	position: fixed;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	-webkit-backdrop-filter: blur(20px) brightness(100%);
	backdrop-filter: blur(20px) brightness(100%);
	z-index: 700;
	.food-detail-box {
		width: 600rpx;
		margin-bottom: 120rpx;
		transform: scale(0);
		transition: all .2s
	}
	.food-img {
		width: 100%;
		height: 600rpx;
		background-color: red;
	}
	.show-food-detail-container {
		transform: scale(1)
	}
	.hide-food-detail-container {
		transform: scale(0)
	}
}

</style>
