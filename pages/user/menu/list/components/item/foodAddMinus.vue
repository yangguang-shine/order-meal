<template>
	<view class="food-add-minus-container flex-row flex-ja-center">
		<view class="food-count-minus"   :class="showAddAnimate ? 'food-count-minus-show' : ''" :style="{ color: $mainColor, 'transition': addAnimationFlag ? 'all ease-in-out .3s' : ''}" @click.stop="minusCount()">
            <div class="add-click-area"></div>
			<view class="reduce-icon-css" :style="{ 'background-color': $mainColor }"></view>
		</view>
		<view  :class="showAddAnimate ? 'food-order-count-show' : ''" class="food-order-count">{{ foodItem.orderCount || ''}}</view>
		<view class="food-count-add" :style="{ 'background-color': $mainColor }" @click.stop="addCount()">
            <div class="add-click-area"></div>
        </view>
	</view>
</template>


<script>
	import { delaySync } from '@/utils/index.js';
export default {
    props: {
		hideAnimateFlag: {
			type: Boolean,
			default: false
		},
        foodItem: {
            type: Object,
            default: () => { }
        }
    },
	data() {
		return {
			showAddAnimate: false,
			addAnimationFlag: false
		}
	},
	async mounted() {
		if (this.foodItem.orderCount > 0) {
			// await delaySync(0)
			this.showAddAnimate = true
		} else {
			this.showAddAnimate = false
		}
		
		// 组件展示时禁止动画
		await delaySync(0)
		this.addAnimationFlag = true
	},
    methods: {
        async addCount() {
			// this.showAddAnimate = true;
			this.$emit('addCount', this.foodItem)
        },
        async minusCount() {
			this.$emit('minusCount', this.foodItem)
        },
    },
	watch: {
		foodItem: {
			 handler(newVal,oldVal){
				 console.log('watch orderCoun')
				 if (newVal.orderCount === 1) {
					this.showAddAnimate = true;
				 } else if (newVal.orderCount === 0) {
					this.showAddAnimate = false	
				 }
			},
			deep:true
		}
	}

}
</script>

<style lang="scss" scoped>
.food-add-minus-container {
	font-size: 26rpx;
	position: relative;
	min-width: 140rpx;
	height: 40rpx;
	.food-count-add {
		position: absolute;
		right: 0;
		top: 0;
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		// text-align: center;
		// line-height: 40rpx;
		// color: #fff;
	}

	.food-count-add::after {
		content: '';
		position: absolute;
		width: 24rpx;
		height: 4rpx;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #fff;
		border-radius: 2rpx;
	}

	.food-count-add::before {
		content: '';
		position: absolute;
		width: 4rpx;
		height: 24rpx;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #fff;
		border-radius: 2rpx;
	}

	.food-count-minus {
		position: absolute;
		top: 0;
		right: 0;
		width: 40rpx;
		height: 40rpx;
		border: 1px solid;
		border-radius: 50%;
		text-align: center;
		line-height: 40rpx;
		background-color: #fff;
		box-sizing: border-box;
		// transition: all ease-in-out .3s;
	}
	.food-count-minus-show {
		right: 100rpx;
		transform: rotate(-180deg);
	}

	.food-order-count {
		font-size: 30rpx;
		line-height: 36rpx;
		color: #333;
		opacity: 0;
		transition: all ease-in-out .3s;
	}
	
	.food-order-count-show {
		opacity: 1;
	}

	.reduce-icon-css {
		position: absolute;
		top: 50%;
		left: 50%;
		height: 4rpx;
		width: 24rpx;
		transform: translate(-50%, -50%);
		border-radius: 2rpx;
	}
	.add-click-area {
	    position: absolute;
	    width: 80rpx;
	    height: 80rpx;
	    top: -20rpx;
	    left: -20rpx;
	}
}
</style>
