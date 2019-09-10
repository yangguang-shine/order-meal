<template>
	<view class="address-list-container">
		<div class="address-lsit">
			<div class="address-item" v-for="(addressItem, index) in addressList" :key="index" @click="defaultAddress(addressItem.addressID)">
				<div class="address-title line1">
					{{addressItem.address1}} {{addressItem.address2}}
				</div>
				<div class="user-info flex-row flex-a-center">
					<div class="address-name">{{addressItem.name}}</div>
					<div class="address-mobile">{{addressItem.mobile}}</div>
				</div>
				<image class="delete-icon" src="/static/img/shop-delete.svg" @click.stop="toDeleteAddress(addressItem.addressID)"></image>
                <image class="edit-icon" src="/static/img/shop-edit.svg" @click.stop="toEditAddress(addressItem.addressID)"></image>
				<div v-if="defaultAddressID === addressItem.addressID" class="default-bgc" :style="{'color': $mainColor}"></div>
				<div v-if="defaultAddressID === addressItem.addressID" class="default-title">默认</div>
			</div>
		</div>
		<div class="address-add" :style="{'background': $mainColor}" @click="toAddAddress">
			增加地址
		</div>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				addressList: [],
				defaultAddressID: ''
			}
		},
		onShow() {
			this.init()
		},
		methods: {
			async init() {
				try {
					this.$showLoading()
					const res = await this.$fetch.get('/api/address/list')
					this.addressList = res.data || []
					if (this.addressList.length) {
						this.defaultAddressID = this.addressList[0].addressID
					}
					this.$hideLoading()
				} catch (e) {
					this.$hideLoading()
					console.log(e)
				}

			},
			async toDeleteAddress(addressID) {
				try {
					this.$showLoading()
					await this.$fetch.post('/api/address/delete', { addressID })
					this.$hideLoading()
					await this.$showModal({
						content: '删除成功'
					})
				} catch (e) {
					this.$hideLoading()
					console.log(e)
					return
				}
				this.init()
			},
			async defaultAddress(addressID) {
				console.log(addressID)
				if (this.defaultAddressID === addressID) return;
				try {
					await this.$showModal({
						content: '确认设置为默认地址吗？',
						showCancel: true,
					})
				} catch(e) {
					console(e)
					return
				}
				try {
					this.$showLoading()
					await this.$fetch.post('/api/address/default', { addressID })
					await this.init()
					this.$hideLoading()
				} catch (e) {
					this.$hideLoading()
					console.log(e)
				}

			},
			toEditAddress(addressID) {
				this.$myrouter.push({
					name: 'address/edit',
					query: {
						addressID
					}
				})
			},
			toAddAddress() {
				this.$myrouter.push({
					name: 'address/edit',
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
		top: 8rpx;
		right: 2rpx;
		transform: rotate(45deg);
		color: #fff;
		font-size: 18rpx;
		line-height: 1;
	}
}
</style>
