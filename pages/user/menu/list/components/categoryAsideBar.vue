<template>
	<scroll-view scroll-y class="category-aside-bar-box">
		<view
			class="aside-category-item"
			v-for="(asideCategoryItem, index) in asideCategoryList"
			:key="index"
			:class="{ 'aside-categroy-item-active': selectCategoryTabId === asideCategoryItem.scrollTabID }"
			@click="changeSelectCategoryTab(asideCategoryItem.scrollTabID)"
		>
			{{ asideCategoryItem.categoryName }}
			<view v-if="asideCategoryItem.orderCount" class="category-order-count" :style="{ background: $mainColor }">{{ asideCategoryItem.orderCount }}</view>
		</view>
	</scroll-view>
</template>

<script>
	export default {
		props: {
			asideCategoryList: {
				type: Array,
				default: () => [],
			},
			selectCategoryTabId: {
				type: String,
				default: ''
			}
		},
		methods: {
			changeSelectCategoryTab(scrollTabID) {
				this.$emit('changeSelectCategoryTab', scrollTabID)
			}
		}
	}
</script>

<style lang="scss">
	.category-aside-bar-box {
		width: 160rpx;
		height: 100%;
		background-color: #f5f5f5;
		flex-shrink: 0;
		box-sizing: border-box;
		padding-bottom: 40rpx;
		::-webkit-scrollbar {
			display: none;
			width: 0 !important;
			height: 0 !important;
			-webkit-appearance: none;
			background: transparent;
		}
		.aside-category-item {
			position: relative;
			padding: 20rpx;
			// height: 80rpx;
			font-size: 26rpx;
			line-height: 36rpx;
			text-align: left;
			box-sizing: border-box;
			color: #666;
			// border-left: 10rpx solid transparent;
		}
		.aside-categroy-item-active {
			color: #333;
			font-weight: bold;
			background-color: #fff;
		}
		.category-order-count {
			font-weight: normal;
			position: absolute;
			padding: 0 5rpx;
			top: 4rpx;
			right: 4rpx;
			min-width: 26rpx;
			height: 26rpx;
			line-height: 26rpx;
			border-radius: 15rpx;
			font-size: 20rpx;
			color: #fff;
			text-align: center;
			box-sizing: border-box;
		}
	}
</style>
