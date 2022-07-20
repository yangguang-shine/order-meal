<template>
	<view class="page-animate-list-container">
		<view class="animate-list">
			<view v-for="(animateItem, index) in animateList" class="animate-item flex-row flex-a-center flex-j-between" :key="index" @click="toAnimateDetail(animateItem)">
				<view class="animate-name">{{animateItem.name}}</view>
				<image class="arrow-right" src="/static/img/animate-img/arrow-right.png" mode=""></image>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				animateList: [
					{
						type: '1',
						name: '3D动画'
					},
					{
						type: '2',
						name: '太极动画'
					},
					{
						type: '3',
						name: '爱心动画'
					},
				]
			}
		},
		methods: {
			toAnimateDetail(animateItem) {
				console.log(12312);
				this.$myrouter.navigateTo({
				    name: 'animate/item',
					query: {
						name: animateItem.name,
						type: animateItem.type,
					}
				});
			}
		},
	}
</script>

<style lang="scss" scoped>
	.page-animate-list-container {
		background-color: #fff;
		.animate-item {
			width: 100%;
			box-sizing: border-box;
			padding: 0 100rpx;
			height: 100rpx;
			border: 1rpx solid #eee;
			color: #666;
			font-size: 32rpx;
			font-weight: bold;
		}
		.arrow-right {
			width: 12rpx;
			height: 22rpx;
		}
	}
</style>
