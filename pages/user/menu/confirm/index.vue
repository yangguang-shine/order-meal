<template>
    <div class="comfirm-order-container">
        <AddressDeliver></AddressDeliver>
        <OrderInfo></OrderInfo>
        <OtherInfo></OtherInfo>
        <FooterButton></FooterButton>
        <NoteInput v-if="noteInputFlag"></NoteInput>
        <!-- <common-loading v-if="showLoadingFlag"></common-loading> -->
    </div>
</template>

<script lang="ts" setup>
import AddressDeliver from "./components/AddressDeliver.vue";
import OrderInfo from "./components/OrderInfo.vue";
import OtherInfo from "./components/OtherInfo.vue";
import FooterButton from "./components/FooterButton.vue";
import NoteInput from "./components/NoteInput.vue";
import { mapMutation, mapState, mapAction } from "../../../../utils/mapVuex";
import { getCurrentInstance } from "vue";
import { onShow, onLoad, onPageScroll } from "@dcloudio/uni-app";

const { $showLoading, $hideLoading, $showModal, $myrouter } = getCurrentInstance().proxy;

const { setTakeOutTime } = mapMutation(["setTakeOutTime"]);
const { noteInputFlag } = mapState(["noteInputFlag"]);
const { getDefaultAddress } = mapAction([
    "getDefaultAddress"
]);
getCurrentTakeOutTime();
function getCurrentTakeOutTime() {
    const current = +new Date();
    const deliverStamp = current + 1000 * 60 * 60;
    console.log(deliverStamp);
    const deliverTime = new Date(deliverStamp);
    const hours =
        `${deliverTime.getHours()}`.length === 1
            ? `0${deliverTime.getHours()}`
            : `${deliverTime.getHours()}`;
    const minute =
        `${deliverTime.getMinutes()}`.length === 1
            ? `0${deliverTime.getMinutes()}`
            : `${deliverTime.getMinutes()}`;
    setTakeOutTime(`${hours}:${minute}`);
}
onShow(() => {
    toGetDefaultAddress();
});

async function toGetDefaultAddress() {
    try {
        $showLoading();

        const defaultAddress = await getDefaultAddress();
        if (!defaultAddress.addressID) {
            $hideLoading();
            await $showModal({
                content: "为提供更好服务，请先选择地址",
                confirmText: "去选择地址"
            });
            $myrouter.navigateTo({
                name: "user/address/list",
                query: {
                    fromPage: "userHome"
                }
            });
        }
    } catch (e) {
        console.log(e);
    } finally {
        $hideLoading();
    }
}
// async submitOrder() {
// 	try {
// 		this.$showLoading();
// 		if (!this.cartCategoryList.length) return;
// 		const foodList = [];
// 		this.cartCategoryList.forEach(item => {
// 			foodList.push(...item.foodList);
// 		});
// 		const query = {};
// 		if (this.businessType === 2) {
// 			query.takeOutTime = this.takeOutTime;
// 			query.address = JSON.stringify(this.defaultAddress);
// 		}
// 		await this.$fetch('user/order/submit', {
// 			foodList,
// 			shopID: this.shopInfo.shopID,
// 			orderAmount: this.payPrice,
// 			businessType: this.businessType,
// 			...query,
// 			minusPrice: this.minusPrice,
// 			originOrderAmount: this.originOrderAmount,
// 			noteText: this.noteText
// 		});
// 		this.clearCart();
// 		this.$myrouter.reLaunchTo({
// 			name: 'user/order/list'
// 		});
// 	} catch (e) {
// 		console.log(e);
// 	} finally {
// 		this.$hideLoading();
// 	}
// }
</script>

<style lang="scss">
// page {
// 	height: 100%;
// 	width: 100%;
// }
.comfirm-order-container {
    min-height: 100vh;
    width: 100%;
    background-color: #f4f4f4;
    padding: 20rpx 20rpx 50rpx;
    box-sizing: border-box;
    font-size: 28rpx;
    color: #333;
    // overflow: hidden;
    // .top-box {
    //     background-color: #fff;
    //     padding: 0 20rpx;

    //     .address-detail-box {
    //         padding: 30rpx 0;
    //         border-bottom: 1rpx solid #d7d7d7;
    //     }
    //     .address-detail {
    //         width: 600rpx;
    //     }
    //     .address-info {
    //         font-size: 30rpx;
    //         font-weight: bold;
    //         line-height: 42rpx;
    //         color: #333;
    //     }
    //     .user-info {
    //         margin-top: 3rpx;
    //         font-size: 28rpx;
    //         line-height: 40rpx;
    //         color: #777;
    //     }
    //     .address-icon,
    //     .deliver-icon {
    //         width: 40rpx;
    //         height: 40rpx;
    //         padding-right: 20rpx;
    //     }
    //     .deliver-box {
    //         padding: 30rpx 0;
    //         font-size: 30rpx;
    //         line-height: 42rpx;
    //     }

    //     .send-time {
    //         font-weight: bold;
    //         color: #333;
    //         padding-right: 10rpx;
    //     }
    // }
    // .center-box {
    //     margin-top: 20rpx;
    //     background-color: #fff;

    //     .shop-info {
    //         height: 100rpx;
    //         padding: 0 20rpx;
    //         color: #666;
    //     }
    //     .shop-img {
    //         width: 40rpx;
    //         height: 40rpx;
    //         padding-right: 20rpx;
    //     }

    //     .food-list {
    //         padding-bottom: 20rpx;
    //         padding: 20rpx;
    //     }
    //     .food-item {
    //         padding: 20rpx;
    //         margin-bottom: 10rpx;
    //         background-color: #f8f8f8;
    //     }

    //     .food-img {
    //         height: 110rpx;
    //         width: 110rpx;
    //         // border-radius: 8rpx;
    //         margin-right: 20rpx;
    //         background-color: red;
    //     }
    //     .food-info {
    //         flex: 10;
    //         font-size: 28rpx;
    //         height: 110rpx;

    //         // height: 90rpx;
    //     }
    //     .food-name {
    //         max-width: 320rpx;
    //         font-size: 28rpx;
    //         line-height: 40rpx;
    //         color: #333;
    //     }
    //     .food-price {
    //         font-size: 24rpx;
    //         color: #999;
    //     }
    //     .food-count {
    //         flex: 2;
    //         font-size: 28rpx;
    //         line-height: 34rpx;
    //         text-align: center;
    //         color: #666;
    //     }
    //     .food-count-price {
    //         flex: 3;
    //         font-size: 28rpx;
    //         text-align: right;
    //         color: #333;
    //     }
    //     .dash-split {
    //         position: relative;
    //         width: 100%;
    //         height: 0;
    //         border-bottom: 3rpx dashed #eee;
    //         margin-bottom: 10rpx;
    //     }
    //     .left-circle,
    //     .right-circle {
    //         position: absolute;
    //         top: -12rpx;
    //         width: 24rpx;
    //         height: 24rpx;
    //         background-color: #f4f4f4;
    //         border-radius: 12rpx;
    //     }
    //     .left-circle {
    //         left: -12rpx;
    //     }
    //     .right-circle {
    //         right: -12rpx;
    //     }
    //     .minus-info {
    //         padding: 20rpx 20rpx 30rpx;
    //     }
    //     .minus-icon {
    //         width: 30rpx;
    //         height: 30rpx;
    //         margin-right: 10rpx;
    //         color: #fff;
    //         text-align: center;
    //         font-size: 20rpx;
    //         line-height: 30rpx;
    //         background-color: #fb4e44;
    //     }
    //     .minus-title {
    //         font-size: 28rpx;
    //         line-height: 40rpx;
    //         color: #333;
    //     }
    //     .minus-price {
    //         font-size: 28rpx;
    //         font-weight: bold;
    //         color: #fb4e44;
    //     }
    //     .all-price-box {
    //         padding: 0 20rpx 10rpx;
    //         height: 80rpx;
    //     }
    //     .all-price-info {
    //         color: #999;
    //         font-size: 24rpx;
    //         line-height: 40rpx;
    //     }
    //     .origin-price,
    //     .discount-price {
    //         padding-right: 30rpx;
    //     }
    //     .pay-price {
    //         font-weight: bold;
    //         font-size: 28rpx;
    //         color: #333;
    //     }

    //     .pay-price-color {
    //         color: #fb4e44;
    //     }
    // }
    // .other-info-box {
    //     padding: 0 20rpx;
    //     background-color: #fff;
    //     font-size: 28rpx;
    //     margin-top: 20rpx;
    //     .other-info-item {
    //         position: relative;
    //         height: 88rpx;
    //         border-bottom: 1rpx solid #e4e4e4;
    //         padding-right: 34rpx;
    //     }
    //     .other-info-invoice {
    //         padding-right: 0;
    //     }
    //     .arrow-right-icon {
    //         position: absolute;
    //         top: 50%;
    //         right: 6rpx;
    //         width: 12rpx;
    //         height: 22rpx;
    //         transform: translateY(-50%)
    //     }
    //     .other-info-item:last-child {
    //         border-bottom: none;
    //     }
    //     .note-tip {
    //         color: #999;
    //     }
    //     .note-text {
    //     }
    //     .invoice-info {
    //         color: #ccc;
    //     }
    // }

    // .footer-block {
    //     width: 100%;
    //     height: 140rpx;
    //     margin-top: 20rpx;
    //     background-color: #fff;
    //     .footer-box {
    //         position: fixed;
    //         bottom: 0;
    //         left: 0;
    //         width: 100%;
    //         height: 140rpx;
    //         background-color: #3c3c3c;
    //         box-sizing: border-box;
    //         padding-right: 250rpx;

    //     }
    // }
}
</style>
