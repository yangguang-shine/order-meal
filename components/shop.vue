<template>
    <div class="com-shop-container">
        <div class="shop-item flex-row" @click="clickShopItem">
            <image :src="shopItem.imgUrl ? host + shopItem.imgUrl : '/static/img/default-img.svg'" class="shop-img" mode="aspectFill"></image>
            <div class="shop-info-box flex-item flex-col flex-j-between">
                <div class="shop-name line1">{{shopItem.shopName}}</div>
                <div class="shop-open-time">营业时间：{{shopItem.startTime}}--{{shopItem.endTime}}</div>
                <div class="shop-address line1">店铺地址：{{shopItem.address}}</div>
                <div v-if="shopItem.minusList.length" class="shop-minus line1">满减信息：<span v-for="(minusItem, index) in shopItem.minusList" :key="index">满{{minusItem.reach}}减{{minusItem.reduce}}{{index === shopItem.minusList.length - 1 ? '' : '，'}}</span></div>
            </div>
            <image v-if="!pageSign && managerShopList" class="delete-icon" src="/static/img/shop-delete.svg" @click.stop="toDeleteShop"></image>
            <image v-if="!pageSign && managerShopList" class="edit-icon" src="/static/img/shop-edit.svg" @click.stop="toEditShop(shopItem)"></image>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import host from '@/config/host'

export default {
    props: {
        shopItem: {
            type: Object,
            default: {}
        },
        pageSign: {
            type: String,
            default: ''
        },
        managerShopList: {
            type: String,
            default:''
        },
    },
    mounted() {
        console.log(this.pageSign)
    },
    data() {
        return {
            host
        }
    },
    methods: {
        clickShopItem() {
            this.$emit('clickShopItem', this.shopItem)
        },
        toDeleteShop() {
            this.$emit('toDeleteShop', this.shopItem)
        },
        toEditShop(shopItem = {}) {
            this.$myrouter.push({
                name: 'shop/edit',
                query: {
                    shopID: shopItem.shopID,
                }
            })
        },
    }
}
</script>
<style scoped lang="scss">
.com-shop-container {
    position: relative;
    font-size: 28rpx;
    color: #333;
    line-height: 1;
    .shop-item {
        margin-bottom: 30rpx;
        position: relative;
    }
    .shop-img {
        width: 140rpx;
        height: 140rpx;
        margin-right: 20rpx;
        border-radius: 10rpx;
    }
    .shop-info-box {
        height: 140rpx;
        line-height: 1.3;
    }
    .shop-name {
        font-size: 32rpx;
        font-weight: bold;
        max-width: 450rpx;
    }
    .shop-open-time {
        font-size: 22rpx;
        color: #999;
    }
    .shop-address {
        max-width: 450rpx;
        color: #666; 
        font-size: 24rpx;
    }
    .shop-minus {
        max-width: 450rpx;
        font-size: 24rpx
    }
    .delete-icon {
        position: absolute;
        top: 0rpx;
        right: 0rpx;
        padding: 10rpx 20rpx;
        width: 30rpx;
        height: 30rpx;
    }
    .edit-icon {
        position: absolute;
        bottom: 0;
        right: 0;
        padding: 10rpx 20rpx;
        width: 30rpx;
        height: 30rpx;
    }

}
</style>

