<template>
	<div class="center-container">
		<div class="list" >
			<div class="item center" @click="toMyAddress">我的地址</div>
		</div>
	</div>
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
			toMyAddress() {
				this.$router.navigateTo({
					name: 'address/list'
				})
			}
		}
	}
</script>

<style lang="scss">
page {
	height: 100%;
}
.center-container  {
	height: 100%;
	font-size: 30rpx;
	.list {
		padding-top: 60rpx;
	}
	.item {
		padding: 30rpx;
	} 
}
</style>
