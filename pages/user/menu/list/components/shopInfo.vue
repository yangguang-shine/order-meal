<template>
	<view class="shop-info-container" :class="showComponents ? 'show-shop-info-container' : 'hide-shop-info-container'">
	</view>
</template>

<script>
export default {
	data() {
		return {
			showComponents: false
		}
	},
	mounted() {
		setTimeout(() => {
			this.showComponents = true
		}, 0);
	},
	methods: {

	},
};
</script>

<style lang="scss" scoped>
.shop-info-container {
	position: absolute;
	top: 0;
	left: 750rpx;
	width: 100%;
	height: 100%;
	padding-top: 80rpx;
	box-sizing: border-box;
	transition: all ease-in-out 0.3s;
	background-color: red;
}
.show-shop-info-container {
	left: 0;
}
.hide-shop-info-container {
	left: 750rpx;
}
</style>
