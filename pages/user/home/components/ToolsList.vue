<template>
	<view class="tools-list-container flex-row flex-wrap">
		<view class="tool-item flex-col flex-a-center" v-for="(toolItem, index) in toolsList" :key="index" @click="toToolDetail(toolItem)">
			<image class="tool-icon"></image>
			<view class="tool-title line1 text-center">
				{{toolItem.title}}
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {

	},
	data() {
		return {
			toolsList: [
				{
					icon: '',
					title: '嘻嘻嘻1'
				},
				{
					icon: '',
					title: '嘻嘻嘻2'
				},
				{
					icon: '',
					title: '嘻嘻嘻3'
				},
				{
					icon: '',
					title: '嘻嘻嘻4'
				},
				{
					icon: '',
					title: '嘻嘻嘻5'
				},
				{
					icon: '',
					title: '嘻嘻嘻6'
				},
				{
					icon: '',
					title: '嘻嘻嘻7'
				},
				{
					icon: '',
					title: '嘻嘻嘻8'
				},
			]
		}
	},
	onShow() {
	},
	methods: {
		toToolDetail() {
			console.log('toToolDetail');
		}
	}
}
</script>

<style lang="scss" scoped>
	.tools-list-container {
		// width: 100%;
		width: 710rpx;
		margin: 20rpx auto 0;
		background-color: #fff;
		border-radius: 20rpx;
		padding-bottom: 40rpx;
		.tool-item {
			padding-top: 40rpx;
			width: 177rpx;
			color: #666666;
			font-size: 28rpx;
		}
		.tool-icon {
			width: 90rpx;
			height: 90rpx;
			background-color: red;
		}
		.tool-title {
			padding-top: 12rpx;
			width: 100%;
		}
	}
</style>
