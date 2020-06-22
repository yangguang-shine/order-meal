<template>
	<view class="select-modal-container flex-row flex-ja-center" @click="toCloseSelectModal">
		<view class="select-modal-box flex-col flex-a-center" @click.stop>
			<view class="select-title">请选择</view>
			<view v-for="(selectItem, index) in selectList" :key="index" @click="clickSelectItem(selectItem, index)">
				{{selectItem.title}}
			</view>
			<icon class="close-icon" type="cancel" size="26" color="#eee" @click="toCloseSelectModal" />
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {}
	},
	props: {
		selectList: {
			type: Array,
			default() {
				return []
			}
		}
	},
	methods: {
		clickSelectItem(selectItem, index) {
			this.$emit('clickSelectItem', selectItem)
		},
		toCloseSelectModal() {
			this.$emit('toCloseSelectModal')
		}
	}
};
</script>

<style scoped lang="less">
.select-modal-container {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.6);
}
.select-modal-box {
	position: relative;
	width: 600rpx;
	padding: 60rpx 0;
	box-sizing: border-box;
	background-color: #fff;
	border-radius: 24rpx;
}
.select-title {
	font-weight: bold;
	font-size: 44rpx;
	padding-bottom: 20rpx;
}
.select-item {
	font-size: 32rpx;
	margin-top: 50rpx;
	width: 80%;
	height: 120rpx;
	line-height: 120rpx;
	border: 1.5rpx solid #eee;
	border-radius: 12rpx;
	text-align: center;
}
.close-icon {
	position: absolute;
	padding: 10rpx;
	top: -100rpx;
	right: 0;
}
</style>
