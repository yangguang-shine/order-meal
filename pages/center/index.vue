<template>
	<view class="content flex-col">
		<!-- <image class="logo" src="/static/logo.png"></image> -->
		<view class="add flex-item" @click="addFoodInfo">
			1
		</view>
		<view class="delete flex-item" @click="deleteFoodInfo">
			2
		</view>
		<view class="update flex-item" @click="updateFoodInfo">
			3
		</view>
		<view class="find flex-item" @click="findFoodInfo">
			4
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: ''
			}
		},
		onLoad() {

		},
		methods: {
			addFoodInfo() {
				this.$fetch.post('/api/foodInfo/add', {
							foodName: '鱼香肉丝14',
							unit: '盘',
							price: 24,
							description: '哦哦哦',
							orderCount: 0,
							imgUrl: 'http://res.hualala.com/group3/M03/3D/7C/wKgVbVzQALiMc1TJAAG4mjhZiPs692.png',
							categoryName: '水果',
							categoryID: 1000
						})
			},
			deleteFoodInfo() {
				this.$fetch.post('/api/foodInfo/delete', {
							foodName: '鱼香肉丝14',
							foodID: 10006
						})
			},
			updateFoodInfo() {
				this.$fetch.post('/api/foodInfo/update', {
							foodName: '鱼香肉丝14',
							description: '嘻嘻嘻',
						})
			},
			findFoodInfo() {
				this.$fetch.get('/api/foodInfo/find', {
							foodName: '鱼香肉丝14',
						})
			},
		}
	}
</script>

<style lang="scss">
page {
	height: 100%;
}
.content {
	height: 100%;
	.add {
		background-color: fff;
	}
}
</style>
