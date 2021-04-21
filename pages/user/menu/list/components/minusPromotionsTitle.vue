<template>
	<view v-if="minusPromotionsTitleObject.show" class="promotion-title center">
		<text v-for="(contentItem, index) in minusPromotionsTitleObject.contentList" :key="index" :class="{ 'content-red': index % 2 !== 0 }">{{ contentItem }}</text>
	</view>
</template>

<script>
export default {
	props: {
		minusPromotionsTitleObject: {
			type: Object,
			default: () => {}
		}
	},
	methods: {}
};
</script>

<style lang="scss">
.promotion-title {
	position: absolute;
	left: 0;
	bottom: 140rpx;
	width: 100%;
	height: 50rpx;
	background-color: #fff1d0;
	line-height: 50rpx;
	font-size: 22rpx;
	color: #333;
	z-index: 450;
	.content-red {
		color: #e23232;
	}
}
</style>
