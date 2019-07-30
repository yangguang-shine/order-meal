<template>
	<view class="home-container">
		<!-- <div class="flex-row">
			<div>name</div>
			<input type="text" v-model="foodName">
		</div>
		<div class="flex-row">
			<div>name</div>
			<input type="text" v-model="price">
		</div>
		<div class="flex-row">
			<div>name</div>
			<input type="text" v-model="unit">
		</div>

		<div class="flex-row">
			<div>name</div>
			<input type="text" v-model="description">
		</div> -->
		<div class="flex-row">
			<div>name</div>
			<div @click="chooseImg">上传图片</div>
		</div>
		<div @click="submit">提交</div>
		<!-- <image class="logo" src="/static/logo.png"></image> -->
		<!-- <div class="banner1" @click="toMenu">点我去点餐页面</div>
		<div class="banner2" @click="toOrderList">点我去订单列表</div>
		<div class="banner3" @click="toCenter">点我去个人中心</div> -->
	</view>
</template>

<script>
	export default {
		
		data() {
			return {
				description: '',
				imgUrl: '',
				unit: '',
				price: '',
				foodName: '',
			}
		},
		onLoad() {

		},
		methods: {
			submit() {
				this.$fetch.post('/api/foodInfo/add', {
					description: this.description,
					imgUrl: this.imgUrl,
					unit: this.unit,
					price: this.price,
					foodName: this.foodName,
					orderCount: this.orderCount
				})
			},
			chooseImg() {
				uni.chooseImage({
					count: 1,
					success: (res) => {
						console.log(res.tempFiles)
						const file = res.tempFiles[0]
						uni.uploadFile({
							url: 'http://localhost:8090/api/img/uploadImg',
							filePath: file.path,
							name: 'img',
							success: (res) => {
								console.log(res.data)
							}
						})
					}
				})
			},
			toMenu() {
				this.$myrouter.push({
					name: 'menu',
					query: {
						name: 'jjj'
					}
				})
			},
			toOrderList() {
				this.$myrouter.switchTab({
					name: 'orderList',
					query: {
						name: 'jjj'
					}
				})
			},
			toCenter() {
				this.$myrouter.switchTab({
					name: 'center',
					query: {
						name: 'jjj'
					}
				})
			},
		}
	}
</script>

<style>
	.home-container {
		text-align: center;
	}
	.banner1 {
		width: 100%;
		height: 150upx;
		line-height: 150upx;
		background-color: #732184;
	}
	.banner2 {
		width: 100%;
		height: 150upx;
		line-height: 150upx;
		background-color: #543615;
	}
	.banner3 {
		width: 100%;
		height: 150upx;
		line-height: 150upx;
		background-color: #124576;
	}
	.title {
		text-align: center;
		font-size: 36upx;
		color: #8f8f94;
	}
</style>
