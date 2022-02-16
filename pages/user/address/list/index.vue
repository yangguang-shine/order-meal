<template>
	<view class="address-list-container">
		<div class="address-lsit">
			<div class="address-item" v-for="(addressItem, index) in addressList" :key="index" @click="setDefaultAddress(addressItem.addressID)">
				<div class="address-title line1">
					{{addressItem.address1}} {{addressItem.address2}}
				</div>
				<div class="user-info flex-row flex-a-center">
					<div class="address-name">{{addressItem.name}}</div>
					<div class="address-mobile">{{addressItem.mobile}}</div>
				</div>
				<image class="delete-icon" src="/static/img/shop-delete.svg" @click.stop="toDeleteAddress(addressItem.addressID)"></image>
                <image class="edit-icon" src="/static/img/shop-edit.svg" @click.stop="toEditAddress(addressItem.addressID)"></image>
				<div v-if="defaultAddress.addressID === addressItem.addressID" class="default-bgc" :style="{'color': $mainColor}"></div>
				<div v-if="defaultAddress.addressID === addressItem.addressID" class="default-title">默认</div>
			</div>
		</div>
		<div class="address-add" :style="{'background': $mainColor}" @click="toAddAddress">
			新增收获地址
		</div>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				addressList: [],
				fromPage: '',
				defaultAddress: {}
			}
		},
		onLoad(query) {
			this.fromPage = query.fromPage || ''
		},
		onShow() {
			this.defaultAddress = uni.getStorageSync('defaultAddress')
			this.init()
		},
		methods: {
			async init() {
				try {
					this.$showLoading()
					const addressList = await this.$fetch('user/address/list')
					this.addressList = addressList
					if (this.addressList.length) {
						this.saveDefaultAddress(this.addressList[0])
					}
					this.$hideLoading()
				} catch (e) {
					this.$hideLoading()
					console.log(e)
				}

			},
			saveDefaultAddress(addressItem) {
				this.defaultAddress = addressItem
				uni.setStorageSync('defaultAddress', addressItem)
			},
			async toDeleteAddress(addressID) {
				try {
					await this.$showModal({
						content: '确认删除改地址吗？',
						showCancel: true,
					})
				} catch(e) {
					console.log(e)
					return
				}
				
				try {
					this.$showLoading()
					await this.$fetch('user/address/remove', { addressID })
					await this.$showModal({
						content: '删除成功'
					})
				} catch (e) {
					console.log(e)
					return
				} finally {
					this.$hideLoading()
				}
				this.init()
			},
			async setDefaultAddress(addressID) {
				if (this.defaultAddress.addressID === addressID) return;
				try {
					await this.$showModal({
						content: '确认设置为默认地址吗？',
						showCancel: true,
					})
				} catch(e) {
					console.log(e)
					return
				}
				try {
					this.$showLoading()
					await this.$fetch('user/address/setDefault', { addressID })
					await this.init()
					if (this.fromPage) {
						this.$myrouter.back()
					}
				} catch (e) {
					console.log(e)
				} finally {
					this.$hideLoading()
				}

			},
			toEditAddress(addressID) {
				this.$myrouter.navigateTo({
					name: 'user/address/edit',
					query: {
						addressID
					}
				})
			},
			toAddAddress() {
				this.$myrouter.navigateTo({
					name: 'user/address/edit',
				})
			}
		}
	}
</script>

<style lang="scss">
page {
	height: 100%;
}
.address-list-container  {
	font-size: 30rpx;
	padding: 30rpx 0 110rpx;
	background-color: #f5f5f5;
	color: #333;
	min-height: 100%;
	box-sizing: border-box;
	.address-item {
		position: relative;
		padding: 36rpx;
		margin-bottom: 30rpx;
		background-color: #fff;
	}
	.address-title {
		font-weight: bold;
		width: 500rpx;
		margin-bottom: 16rpx;
	}
	.user-info {
		font-size: 24rpx;
		color: #666;
	}
	.address-name {
		margin-right: 20rpx;
	}
	.delete-icon, .edit-icon {
		position: absolute;
		right: 80rpx;
		width: 30rpx;
		height: 30rpx;
	}
	.delete-icon {
		top: 30rpx;
	}
	.edit-icon {
		bottom: 30rpx;
	}
	.address-add {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		font-size: 32rpx;
		color: #fff;
	}
	.default-bgc{
		position: absolute;
		top: 0;
		right: 0;
		width: 0;
		height: 0;
		border: 40rpx solid;
		border-left: 40rpx solid transparent;
		border-bottom: 40rpx solid transparent;
	}
	.default-title {
		position: absolute;
		top: 14rpx;
		right: 4rpx;
		transform: rotate(45deg);
		color: #fff;
		font-size: 18rpx;
		
	}
}
</style>
