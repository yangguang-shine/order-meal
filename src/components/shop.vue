<template>
    <div class="com-shop-container">
        <div class="shop-item flex-row" @click="toClickShopItem">
            <image :src="shopItem.fullImgPath" class="shop-img flex-shrink" mode="scaleToFill"></image>
            <div class="shop-info-box flex-item flex-col flex-j-between flex-shrink">
                <div class="shop-name line1">{{ shopItem.shopName }}</div>
                <div v-if="showExtraFlag && shopItem.businessTypeList.includes(2)" class="shop-extra-price flex-row flex-a-center">
                    <div class="delever-price">起送¥{{ shopItem.deliverPrice }}</div>
                    <div class="start-delever-price">配送费:¥{{ shopItem.startDeliverPrice }}</div>
                </div>
                <div class="shop-business-type flex-row">
                    <div class="business-item flex-row flex-ja-center" :style="{'color': $mainColor}" v-for="(businessTitleItem, index) in shopItem.businessTitleList" :key="index">{{ businessTitleItem }}</div>
                </div>
                <div class="flex-row">
                    <MinusList v-if="shopItem.minusList.length" :minusList="shopItem.minusList.length > 6 ? shopItem.minusList.slice(0, 6) : shopItem.minusList" :mainColor="shopItem.mainColor"></MinusList>
                </div>
            </div>
            <image class="arrow-right-icon" src="/static/img/shop/arrow-right.png"></image>
        </div>
    </div>
</template>

<script lang="ts" setup>
import MinusList from "@/components/MinusList.vue";
import { defineComponent, computed, getCurrentInstance } from "vue";
import { shopImgPath } from "@/config/index";
interface Props {
    shopItem: any;
    showExtraFlag?: boolean

    // showDeleteShopFlag?: boolean;
    // showEditShopFlag?: boolean;
    // showArrowRightFlag?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
    // showDeleteShopFlag: false,
    // showEditShopFlag: false,
    // showArrowRightFlag: false,
    shopItem: () => ({}),
    showExtraFlag: false
});


// shopItem: {
//     type: Object,
//     default() {
// 		return {}
// 	}
// },
// showDeleteShop: {
// 	type: Boolean,
// 	default: false
// },
// showEditShop: {
// 	type: Boolean,
// 	default: false
// },
// showArrowRight: {
// 	type: Boolean,
// 	default: false
// }
const emit = defineEmits<{
    (e: "clickShopItem", shopItem: any): void;
    //   (e: 'deleteShop', shopItem: any): void,
}>();
function toClickShopItem() {
    emit("clickShopItem", props.shopItem);
}
</script>
<style scoped lang="scss">
.com-shop-container {
    position: relative;
    font-size: 28rpx;
    color: #333;
    // line-height: 1.1;
    padding: 30rpx;
    background-color: #fff;
    // margin-bottom: 10rpx;
    // border-radius: 12rpx;
    .shop-item {
        position: relative;
    }
    .shop-img {
        width: 150rpx;
        height: 150rpx;
        margin-right: 20rpx;
        border-radius: 10rpx;
    }
    .shop-info-box {
        // height: 150rpx;
        // line-height: 1.3;
    }
    .shop-name {
        font-size: 32rpx;
        line-height: 34rpx;
        font-weight: bold;
        max-width: 460rpx;
        color: #333;
    }
    .business-item {
        font-size: 20rpx;
        height: 24rpx;
        color: orange;
        padding: 0 4rpx;
        border: 1rpx solid;
        margin-right: 8rpx;
        border-radius: 4rpx;
        //  color: #ff4b33;
    }
    .shop-extra-price {
        font-size: 22rpx;
        line-height: 24rpx;
        color: #999;
    }
    .arrow-right-icon {
        position: absolute;
        top: 50%;
        right: 20rpx;
        transform: translateY(-50%);
        width: 12rpx;
        height: 22rpx;
    }
}
</style>
