<template>
	<view class="content">
		<!-- <image class="logo" src="/static/logo.png"></image> -->
		<view>
			<div class="title" @click="toMenu">{{title}}</div>
		</view>
	</view>
</template>

<script>
	export default {
		
		data() {
			return {
				title: '首页'
			}
		},
		onLoad() {

		},
		methods: {
			toMenu() {
				this.$myrouter.push({
					name: 'menu',
					query: {
						name: 'jjj'
					}
				})
			}
		}
	}
</script>

<style>
	.content {
		text-align: center;
		height: 400upx;
	}

	.logo {
		height: 200upx;
		width: 200upx;
		margin-top: 200upx;
	}

	.title {
		text-align: center;
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
