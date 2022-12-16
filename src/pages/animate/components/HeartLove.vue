<template>
	<view class="com-animate-heart-love-container flex-row flex-ja-center">
		<view class="heart-love-box">
			
		</view>
	</view>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.com-animate-heart-love-container {
	height: 100vh;
	width: 100%;
	background-color: #F5F5F5;
	.heart-love-box {
		position: relative;
		width: 400rpx;
		height: 400rpx;
		animation: heartLove 1s linear infinite;
		@keyframes heartLove {
			0% {
				transform: scale(1);
			}
			30% {
				transform: scale(1.05);
			}
			50% {
				transform: scale(1.1);
			}
			70% {
				transform: scale(1.05);
			}
			100% {
				transform: scale(1);
			}
		}
		// background-color: #ff3e3e;
	}
	.heart-love-box::after {
		position: absolute;
		top: 0;
		left: 0%;
		// transform: translateX(-50%);
		content: '';
		width: 200rpx;
		height: 300rpx;
		background-color: #ff3e3e;
		transform-origin: bottom right;
		border-top-right-radius: 100rpx;
		border-top-left-radius: 100rpx;
		border-bottom-right-radius: 6rpx;
		transform: rotate(45deg);
	}
	.heart-love-box::before {
		position: absolute;
		top: 0;
		right: 0%;
		// transform: translateX(-50%);
		content: '';
		width: 200rpx;
		height: 300rpx;
		background-color: #ff3e3e;
		transform-origin: bottom left;
		border-top-right-radius: 100rpx;
		border-top-left-radius: 100rpx;
		border-bottom-left-radius: 6rpx;
		transform: rotate(-45deg);
	}
}
</style>
