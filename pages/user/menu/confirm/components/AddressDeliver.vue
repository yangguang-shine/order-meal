<template>
    <div class="address-deliver-container">
        <div class="address-detail-box flex-row flex-a-center" @click="toAddressList">
            <image class="address-icon" src="/static/img/user-confirm/address-icon.png"></image>
            <div class="address-detail flex-item">
                <div class="address-info line1">{{defaultAddress.address1}} {{defaultAddress.address2}}</div>
                <div class="user-info">{{defaultAddress.name}} {{defaultAddress.mobile}}</div>
            </div>
        </div>
        <div class="deliver-box flex-row flex-a-center">
            <image class="deliver-icon" src="/static/img/user-confirm/deliver-time-icon.png"></image>
			<picker  mode="time" :value="takeOutTime" start="00:00" end="23:59" @change="takeOutTimeChange">
				<div class="deliver-info flex-row">
					<div class="send-time">立即送出</div>
					<div class="deliver-time">大约 {{takeOutTime}} 送达</div>
				</div>
			</picker>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        defaultAddress: {
            type: Object,
            default: () => {}
        },
		takeOutTime: {
			type: String,
			default: '00:00'
		}
    },
	methods: {
		toAddressList() {
			this.$myrouter.navigateTo({
			    name: 'user/address/list',
				query: {
					fromPage: 'userMenuConfirm'
				}
			});
		},
		takeOutTimeChange(e) {
			this.$emit('takeOutTimeChange', e)
		}
	}

}
</script>

<style lang="scss" scoped>
.address-deliver-container {
    background-color: #fff;
    padding: 0 20rpx;

    .address-detail-box {
        padding: 30rpx 0;
        border-bottom: 1rpx solid #d7d7d7;
    }
    .address-detail {
        width: 600rpx;
    }
    .address-info {
        font-size: 30rpx;
        font-weight: bold;
        line-height: 42rpx;
        color: #333;
    }
    .user-info {
        margin-top: 6rpx;
        font-size: 28rpx;
        line-height: 40rpx;
        color: #777;
    }
    .address-icon,
    .deliver-icon {
        width: 40rpx;
        height: 40rpx;
        padding-right: 20rpx;
    }
    .deliver-box {
        padding: 30rpx 0 40rpx;
        font-size: 30rpx;
        line-height: 42rpx;
    }

    .send-time {
        font-weight: bold;
        color: #333;
        padding-right: 10rpx;
    }
}
</style>