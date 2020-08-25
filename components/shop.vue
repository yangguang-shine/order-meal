<template>
    <div class="com-shop-container">
        <div class="shop-item flex-row" @click="clickShopItem">
            <image :src="shopItem.imgUrl ? host + shopItem.imgUrl : '/static/img/default-img.svg'" class="shop-img" mode="scaleToFill"></image>
            <div class="shop-info-box flex-item flex-col flex-j-between">
                <div class="shop-name line1">{{shopItem.shopName}}</div>
                <div class="shop-open-time">营业时间：{{shopItem.startTime}}--{{shopItem.endTime}}</div>
                <div class="shop-address line1">店铺地址：{{shopItem.address}}</div>
           <!--     <div v-if="shopItem.minusList.length" class="shop-minus line1">满减信息：<span v-for="(minusItem, index) in shopItem.minusList" :key="index">满{{minusItem.reach}}减{{minusItem.reduce}}{{index === shopItem.minusList.length - 1 ? '' : '，'}}</span></div> -->
				<scroll-view v-if="shopItem.minusList.length" class="shop-minus-list" scroll-x="true">
					<view class="flex-row">
						<view class="minus-item flex-shrink" v-for="(minusItem, index) in shopItem.minusList" :key="index">
							{{minusItem.reach}}减{{minusItem.reduce}}
						</view>
					</view>
				</scroll-view>
            </div>
            <image v-if="showDeleteShop" class="delete-icon" src="/static/img/shop-delete.svg" @click.stop="toDeleteShop"></image>
            <image v-if="showEditShop" class="edit-icon" src="/static/img/shop-edit.svg" @click.stop="toEditShop(shopItem)"></image>
            <image v-if="showArrowRight" class="arrow-right-icon" src="/static/img/arrow-right-icon.svg" @click.stop="toEditShop(shopItem)"></image>
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
            default() {
				return {}
			}
        },
		showDeleteShop: {
			type: Boolean,
			default: false
		},
		showEditShop: {
			type: Boolean,
			default: false
		},
		showArrowRight: {
			type: Boolean,
			default: false
		}
    },
    mounted() {
    },
    data() {
        return {
            host
        }
    },
    methods: {
        clickShopItem() {
            this.$emit('clickShopItem')
        },
        toDeleteShop() {
            this.$emit('toDeleteShop')
        },
        toEditShop() {
            this.$router.navigateTo({
                name: 'manage/shop/edit',
                query: {
                    shopID: this.shopItem.shopID,
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
	padding: 20rpx;
	background-color: #fff;
	margin-bottom: 10rpx;
	border-radius: 20rpx;
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
        line-height: 1.3;
    }
    .shop-name {
        font-size: 28rpx;
        font-weight: bold;
        max-width: 460rpx;
		color: #333;
    }
    .shop-open-time {
        font-size: 22rpx;
        // color: #999;
		color: #7f7f7f;
		line-height: 1.1;
    }
    .shop-address {
        max-width: 460rpx;
        color: #666; 
        font-size: 22rpx;
		color: #7f7f7f;
		line-height: 1.1;
    }
	.shop-minus-list {
		color: #eb5940;
		width: 460rpx;
		overflow-x: auto;
	}
	
	.minus-item {
		padding: 2rpx 6rpx;
		border: 1px solid;
		margin-right: 8rpx;
		font-size: 18rpx;
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
		right: -16rpx;
		transform: translateY(-50%);
		width: 60rpx;
		height: 60rpx;
	}

}
</style>

