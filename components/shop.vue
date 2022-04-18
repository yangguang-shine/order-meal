<template>
    <div class="com-shop-container">
        <div class="shop-item flex-row" @click="toClickShopItem">
            <image :src="shopItem.fullImgPath" class="shop-img" mode="scaleToFill"></image>
            <div class="shop-info-box flex-item flex-col flex-j-between">
                <div class="shop-name line1">{{shopItem.shopName}}</div>
                <div class="shop-open-time">营业时间：{{shopItem.startTime}}--{{shopItem.endTime}}</div>
                <div class="shop-address line1">店铺地址：{{shopItem.address}}</div>
                <div class="flex-row">
                    <minus-list :minusList="shopItem.minusList"></minus-list>
                    <!--                    <view class="shop-minus-list flex-row">
                        <view class="minus-item flex-shrink" v-for="(minusItem, index) in shopItem.minusList" :key="index">
                            {{minusItem.reach}}减{{minusItem.reduce}}
                        </view>
                    </view> -->
                </div>

            </div>
            <!-- <image v-if="showDeleteShopFlag" class="delete-icon" src="/static/img/shop-delete.svg" @click.stop="toDeleteShop"></image>
            <image v-if="showEditShopFlag" class="edit-icon" src="/static/img/shop-edit.svg" @click.stop="toEditShop(shopItem)"></image> -->
            <image class="arrow-right-icon" src="/static/img/shop/arrow-right.png"></image>
        </div>
    </div>
</template>

<script lang="ts" setup>
import MinusList from "@/components/MinusList.vue";
import { defineComponent, computed, getCurrentInstance } from "vue";
import { shopImgPath } from '@/config/index'
interface Props {
    shopItem: any;
    // showDeleteShopFlag?: boolean;
    // showEditShopFlag?: boolean;
    // showArrowRightFlag?: boolean;
}
const props = withDefaults(defineProps<Props>(), {
    // showDeleteShopFlag: false,
    // showEditShopFlag: false,
    // showArrowRightFlag: false,
    shopItem: () => ({})
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
  (e: 'clickShopItem', shopItem: any): void,
//   (e: 'deleteShop', shopItem: any): void,
}>()
function toClickShopItem() {
    emit('clickShopItem', props.shopItem)
}
// function toDeleteShop() {
//     emit('deleteShop', props.shopItem)
// }
// function toEditShop(shopItem) {
//     console.log('toEditShop')
//     // this.$myrouter.navigateTo({
//     //     name: "manage/shop/edit",
//     //     query: {
//     //         shopID: shopItem.shopID
//     //     }
//     // });
// }
</script>
<style scoped lang="scss">
.com-shop-container {
    position: relative;
    font-size: 28rpx;
    color: #333;
    line-height: 1.1;
    padding: 20rpx;
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
        height: 150rpx;
        // line-height: 1.3;
    }
    .shop-name {
        font-size: 32rpx;
        font-weight: bold;
        max-width: 460rpx;
        color: #333;
    }
    .shop-open-time {
        font-size: 22rpx;
        color: #999;
        // color: #7f7f7f;
        // line-height: 1.1;
    }
    .shop-address {
        max-width: 460rpx;
        color: #999;
        font-size: 22rpx;
        // color: #7f7f7f;
        // line-height: 1.1;
    }
    .shop-minus-list {
        // color: #eb5940;
        color: #fb4e44;
        // rgb(255, 74, 38)
        max-width: 460rpx;
        overflow-x: auto;
        border: 1rpx solid rgb(255, 198, 193);
        padding: 6rpx 0;
        border-radius: 8rpx;
    }

    .minus-item {
        // padding: 2rpx 6rpx;
        position: relative;
        // border-right: 1px solid rgb(255, 198, 193);
        padding: 0 9rpx 0 8rpx;
        font-size: 20rpx;
    }
    .minus-item::after {
        content: "";
        position: absolute;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 1rpx;
        height: 18rpx;
        background-color: rgb(255, 198, 193);
    }
    .minus-item:last-child {
        padding: 0 8rpx;
    }
    .minus-item:last-child::after {
        width: 0;
    }
    // .shop-minus {
    //     max-width: 430rpx;
    //     font-size: 24rpx
    // }
    .delete-icon {
        position: absolute;
        top: 0rpx;
        right: -20rpx;
        padding: 10rpx 20rpx;
        width: 30rpx;
        height: 30rpx;
    }
    .edit-icon {
        position: absolute;
        bottom: 0;
        right: -20rpx;
        padding: 10rpx 20rpx;
        width: 30rpx;
        height: 30rpx;
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

