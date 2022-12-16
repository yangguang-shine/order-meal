<template>
	<view class="com-animate-tai-ji-container flex-row flex-ja-center">
		<view class="tai-ji-box">
			
		</view>
	</view>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.com-animate-tai-ji-container {
	height: 100vh;
	width: 100%;
	background-color: #F5F5F5;
	.tai-ji-box {
		position: relative;
		width: 300rpx;
		height: 600rpx;
		border-left: 300rpx solid #000;
		background-color: #fff;
		border-radius: 50%;
		animation: TaiJiRotate 10s linear infinite;
		@keyframes TaiJiRotate {
			0% {
				transform: rotate(0);
			}
			100% {
				transform: rotate(360deg);
			}
		}
	}
	.tai-ji-box::after {
		content: '';
		position: absolute;
		top: 0;
		left: -150rpx;
		// transform: translateX(-50%);
		width: 100rpx;
		height: 100rpx;
		background-color: #fff;
		border: 100rpx solid #000;
		border-radius: 50%;
		}
	.tai-ji-box::before {
		content: '';
		position: absolute;
		bottom: 0rpx;
		left: -150rpx;
		width: 100rpx;
		height: 100rpx;
		background-color: #000;
		border: 100rpx solid #fff;
		border-radius: 50%;
	}
}
</style>
