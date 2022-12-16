<template>
	<view class="com-animate-3D-container">
		<view class="list list1">
			<view class="item item1"></view>
			<view class="item item2"></view>
			<view class="item item3"></view>
			<view class="item item4"></view>
			<view class="item item5"></view>
			<view class="item item6"></view>
		</view>
		<view class="list list2">
			<view class="item item1"></view>
			<view class="item item2"></view>
			<view class="item item3"></view>
			<view class="item item4"></view>
			<view class="item item5"></view>
			<view class="item item6"></view>
		</view>

		<view class="list list3">
			<view class="item item1"></view>
			<view class="item item2"></view>
			<view class="item item3"></view>
			<view class="item item4"></view>
			<view class="item item5"></view>
			<view class="item item6"></view>
		</view>
	</view>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.com-animate-3D-container {
	position: relative;
	height: 100vh;
	width: 100%;
	.list {
		position: absolute;
		left: 50%;
		transform-style: preserve-3d;
	}
	.item {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
	}
	.list1 {
		top: 200rpx;
		margin-left: -200rpx;
		// margin-top: -200rpx;
		width: 400rpx;
		height: 400rpx;
		animation: rotate 10s linear infinite;
		@keyframes rotate {
			0% {
				transform: rotateX(0) rotateY(0deg);
			}
			25% {
				transform: rotateX(90deg) rotateY(90deg);
			}
			50% {
				transform: rotateX(180deg) rotateY(180deg);
			}
			75% {
				transform: rotateX(270deg) rotateY(270deg);
			}
			100% {
				transform: rotateX(360deg) rotateY(360deg);
			}
		}

		.item1 {
			background-color: skyblue;
			opacity: 0.8;
			transform: translateZ(200rpx);
		}
		.item2 {
			background-color: green;
			opacity: 0.8;
			transform: rotateY(90deg) translateZ(200rpx);
		}
		.item3 {
			background-color: YellowGreen ;
			opacity: 0.8;
			transform: rotateY(180deg) translateZ(200rpx);
		}
		.item4 {
			background-color: pink;
			opacity: 0.8;
			transform: rotateY(270deg) translateZ(200rpx);
		}
		.item5 {
			background-color: yellow;
			opacity: 0.8;
			transform: rotateX(90deg) translateZ(200rpx);
		}
		.item6 {
			background-color: orange;
			opacity: 0.8;
			transform: rotateX(270deg) translateZ(200rpx);
		}
	}

	.list2 {
		margin-left: -100rpx;
		// margin-top: -100rpx;
		top: 300rpx;
		width: 200rpx;
		height: 200rpx;
		animation: rotate1 10s linear infinite;
		@keyframes rotate1 {
			0% {
				transform: rotateX(0) rotateZ(0deg);
			}
			25% {
				transform: rotateX(-90deg) rotateZ(90deg);
			}
			50% {
				transform: rotateX(-180deg) rotateZ(180deg);
			}
			75% {
				transform: rotateX(-270deg) rotateZ(270deg);
			}
			100% {
				transform: rotateX(-360deg) rotateZ(360deg);
			}
		}
		.item1 {
			background-color: skyblue;
			opacity: 0.8;
			transform: translateZ(100rpx);
		}
		.item2 {
			background-color: green;
			opacity: 0.8;
			transform: rotateY(90deg) translateZ(100rpx);
		}
		.item3 {
			background-color: YellowGreen ;
			opacity: 0.8;
			transform: rotateY(180deg) translateZ(100rpx);
		}
		.item4 {
			background-color: pink;
			opacity: 0.8;
			transform: rotateY(270deg) translateZ(100rpx);
		}
		.item5 {
			background-color: yellow;
			opacity: 0.8;
			transform: rotateX(90deg) translateZ(100rpx);
		}
		.item6 {
			background-color: orange;
			opacity: 0.8;
			transform: rotateX(270deg) translateZ(100rpx);
		}
	}

	.list3 {
		margin-left: -150rpx;
		// margin-top: -100rpx;
		top: 800rpx;
		width: 300rpx;
		height: 300rpx;
		animation: rotate2 10s linear infinite;
		@keyframes rotate2 {
			0% {
				transform: rotateX(-10deg) rotateY(0deg);
			}
			100% {
				transform: rotateX(-10deg) rotateY(360deg);
			}
		}
		.item1 {
			background-color: skyblue;
			opacity: 0.8;
			transform: rotateY(60deg) translateZ(260rpx)
		}
		.item2 {
			background-color: green;
			opacity: 0.8;
			transform: rotateY(120deg) translateZ(260rpx)
		}
		.item3 {
			background-color: YellowGreen ;
			opacity: 0.8;
			transform: rotateY(180deg) translateZ(260rpx)
		}
		.item4 {
			background-color: pink;
			opacity: 0.8;
			transform: rotateY(240deg) translateZ(260rpx)
		}
		.item5 {
			background-color: yellow;
			opacity: 0.8;
			transform: rotateY(300deg) translateZ(260rpx)
		}
		.item6 {
			background-color: orange;
			opacity: 0.8;
			transform: rotateY(360deg) translateZ(260rpx)
		}
	}
}
</style>
