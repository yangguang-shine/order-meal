<template>
	<view class="com-loading-contaienr flex-row flex-ja-center" @touchmove.prevent.stop><div class="loading-box"></div></view>
</template>

<script>
export default {
	name: 'Loading',
	data() {
		return {};
	}
};
</script>

<style lang="scss" scoped>
.com-loading-contaienr {
	width: 100%;
	height: 100%;
	position: fixed;
	left: 0;
	top: 0;
	z-index: 999;
	background-color: #fff;

	.loading-box {
		position: relative;
		width: 108rpx;
		height: 108rpx;
		background: rgba(0, 0, 0, 0.6);
		text-align: center;
		border-radius: 16rpx;
	}

	.loading-box:before {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 72rpx;
		height: 72rpx;
		z-index: 10;
		content: '';
		background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzgiIGhlaWdodD0iMzgiIHZpZXdCb3g9IjAgMCAzOCAzOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBzdHJva2U9IiNmZmYiPgogICAgPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxIDEpIiBzdHJva2Utd2lkdGg9IjIiPgogICAgICAgICAgICA8Y2lyY2xlIHN0cm9rZS1vcGFjaXR5PSIuNSIgY3g9IjE4IiBjeT0iMTgiIHI9IjE4Ii8+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOCI+CiAgICAgICAgICAgICAgICA8YW5pbWF0ZVRyYW5zZm9ybSBhdHRyaWJ1dGVOYW1lPSJ0cmFuc2Zvcm0iIHR5cGU9InJvdGF0ZSIgZnJvbT0iMCAxOCAxOCIgdG89IjM2MCAxOCAxOCIgZHVyPSIxcyIgcmVwZWF0Q291bnQ9ImluZGVmaW5pdGUiLz4KICAgICAgICAgICAgPC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+');
		background-position: 0 0;
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
}
</style>
