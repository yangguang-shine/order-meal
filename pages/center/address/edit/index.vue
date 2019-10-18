<template>
	<view class="address-edit-container">
		<div class="item flex-row flex-a-center">
			<div class="title center">姓名</div>
			<input class="flex-item" type="text" v-model="addressInfo.name">
		</div>
		<div class="item flex-row flex-a-center">
			<div class="title center"></div>
			<div class="flex-row flex-a-center">
				<div class="sex-item" :style="{'color': addressInfo.sex === 1 ? $mainColor : ''}" @click="changeSex(1)">男</div>
				<div class="sex-item" :style="{'color': addressInfo.sex === 2 ? $mainColor : ''}" @click="changeSex(2)">女</div>
			</div>
		</div>
		<div class="item flex-row flex-a-center">
			<div class="title center">手机号</div>
			<input class="flex-item" type="text" v-model="addressInfo.mobile">
		</div>
		<div class="item flex-row flex-a-center">
			<div class="title center">地址</div>
			<div class="flex-item" @click="chooseAddress" :style="{color: addressInfo.address1 ? '' : '#999'}">{{addressInfo.address1 || '请选择地址'}}</div>
		</div>
		<div class="item flex-row flex-a-center">
			<div class="title center">门牌号</div>
			<input type="text" v-model="addressInfo.address2">
		</div>
		<div class="flex-row flex-j-center">
            <div v-if="addressID" class="button" :style="{'background-color': $mainColor}" @click="editAddress">修改</div>
            <div v-else class="button" :style="{'background-color': $mainColor}" @click="addAddress">新增</div>
        </div>
	</view>
</template>
<script>

	import { getSetting, authorize } from '@/utils'

	export default {
		data() {
			return {
				addressInfo: {
					name: '',
					sex: 1,
					mobile: '',
					address1: '',
					address2: ''
				},
				addressID: ''
			}
		},
		onLoad(options) {
			this.addressID = options.addressID || '';
			if (this.addressID) {
				this.init()
			}
		},
		methods: {
			async init() {
				try {
					this.$showLoading()
					const res = await this.$fetch.get('/api/address/find', { addressID: this.addressID })
					this.addressInfo = res.data || {}
					this.$hideLoading()
				} catch (e) {
					console.log(e)
				}
			},
			async addAddress() {
				try {
					this.$showLoading()
					await this.$fetch.post('/api/address/add', { ...this.addressInfo })
					this.$hideLoading()
					await this.$showModal({
						content: '添加成功'
					})
					this.$myrouter.back(1)
				} catch (e) {
					this.$hideLoading()
					console.log(e)
				}
			},
			async editAddress() {
				try {
					this.$showLoading()
					await this.$fetch.post('/api/address/edit', { ...this.addressInfo, addressID: this.addressID })
					this.$hideLoading()
					await this.$showModal({
						content: '修改成功'
					})
					this.$myrouter.back(1)
				} catch (e) {
					console.log(e)
				}
			},
        	async chooseAddress() {
				// #ifdef MP-WEIXIN 
				console.log(111111)
				try {
					await getSetting('scope.userLocation')
				} catch (e) {
					console.log(e)
					try {
						await authorize('scope.userLocation')
					} catch (e) {
						console.log(1111)
						console.log(e)
						return
					}
				}
				// #endif
				uni.chooseLocation({
					success: (res) => {
						console.log(res)
						this.addressInfo.address1 = res.address
					},
				})
			},
			changeSex(index) {
				this.addressInfo.sex = index
			}
		}
	}
</script>

<style lang="scss">
page {
	height: 100%;
}
.address-edit-container {
	height: 100%;
	font-size: 30rpx;
	.item {
		padding: 20rpx 0;
		height: 60rpx;
		line-height: 1.2rpx;
		// border-bottom: 2rpx solid #eee;
	}
	input {
		height: 60rpx;
		line-height: 1.2;
	}
	.title {
		width: 180rpx;
		margin-right: 16rpx;
	}
	.sex-item {
		color: #aaa;
		border: 2rpx solid;
		height: 60rpx;
		width: 120rpx;
		line-height: 60rpx;
		text-align: center;
		margin-right: 16rpx;
	}
	.button {
        margin-top: 40rpx;
        width: 300rpx;
        height: 80rpx;
        line-height: 80rpx;
        text-align: center;
        border-radius: 40rpx;
        color: #fff;
    }
}
</style>
