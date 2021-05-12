<template>
    <div class="footer-button-container">
        <div class="footer-fixed">
            <div class="footer-box">
                <div class="footer-discount-price"></div>
                <div class="footer-pay-price"></div>
                <div class="submit-order-button flex-row flex-ja-center" :style="{'background': $mainColor}" @click="submitOrder">提交订单</div>
            </div>
        </div>
        <div class="footer-block"></div>
    </div>
</template>

<script>
export default {
	methods: {
		submitOrder() {
			this.$emit('submitOrder')
		}
	}
}
</script>

<style lang="scss" scoped>
.footer-button-container {
    .footer-fixed {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 140rpx;
        background-color: #fff;
        box-sizing: border-box;
    }

    .footer-box {
        background-color: #3c3c3c;
        height: 100rpx;
        width: 100%;
        padding-right: 250rpx;
        box-sizing: border-box;
    }
    .submit-order-button {
        font-size: 32rpx;
        position: absolute;
        top: 0;
        right: 0;
        width: 250rpx;
        height: 100rpx;
        color: #fff;
        font-weight: normal;
    }
    .footer-block {
        width: 100%;
        height: 140rpx;
        margin-top: 20rpx;
    }
}
</style>
       
       
