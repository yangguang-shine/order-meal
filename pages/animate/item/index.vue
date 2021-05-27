<template>
	<view class="page-animate-item-container">
		<three-d-animate v-if="animateItemInfo.type === '1'"></three-d-animate>
		<tai-ji v-if="animateItemInfo.type === '2'"></tai-ji>
		<heart-love v-if="animateItemInfo.type === '3'"></heart-love>
	</view>
</template>


<script>
	import ThreeDAnimate from '../components/ThreeDAnimate.vue'
	import TaiJi from '../components/TaiJi.vue'
	import HeartLove from '../components/HeartLove.vue'
	export default {
		data() {
			return {
				animateItemInfo: {
					type: '0',
					name: '',
				}
			}
		},
		mounted() {
			this.animateItemInfo.type = this.$root.options.type
			this.animateItemInfo.name = this.$root.options.name
			console.log(this.animateItemInfo);
			console.log(this.animateItemInfo.type);
			console.log(this.animateItemInfo.type === '1');
		},
		components: {
			'three-d-animate': ThreeDAnimate,
			'tai-ji': TaiJi,
			'heart-love': HeartLove
		}
	}
</script>

<style lang="scss" scoped>
	
</style>
