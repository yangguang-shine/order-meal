<template>
    <div class="buttom-button-container" @click="clickButton" :style="{'color': $mainColor}">
		{{title}}
    </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
	props: {
		title: {
			type: String,
			default: ''
		}
	},
	methods: {
		clickButton() {
			this.$emit('clickButton')
		}
	}
}
</script>
<style scoped lang="scss">
.buttom-button-container {
		position: fixed;
		bottom: 20rpx;
		left: 20rpx;
		width: 710rpx;
		height: 100rpx;
		background-color: #fff;
		line-height: 100rpx;
		text-align: center;
		line-height: 100rpx;
		font-size: 38rpx;
		font-weight: bold;
		border-radius: 50rpx;
	}
</style>

