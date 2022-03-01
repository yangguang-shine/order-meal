<template>
    <div class="shop-list-container">
        <div class="shop-list">
            <shop v-for="(shopItem, index) in shopList" :key="index" :shopItem="shopItem" @clickShopItem="toOrder(shopItem)" showArrowRight></shop>
        </div>
    </div>
</template>

<script>
import {host} from '@/config/host'
import Shop from '@/components/Shop'
import getShopMinusList from '@/utils/getShopMinusList';

export default {
    components:{
        Shop
    },
    data() {
        return {
            shopList: [],
            host,
            businessType: ''
        }
    },
    onShow() {
        this.businessType = uni.getStorageSync('businessType')
        this.init()
    },
    methods: {
        async init() {
            try {
                this.$showLoading()
                const query = {
					businessType: this.businessType
				}
                const shopList = await this.$fetch('user/shop/list', query)
                shopList.forEach((item) => {
                    item.minusList = getShopMinusList(item.minus || '')
                })
                this.shopList = shopList
            } catch(e) {
                console.log(e)
            } finally {
                this.$hideLoading()
            }
        },
		toOrder(shopItem) {
			this.saveShopInfo(shopItem)
			this.$myrouter.navigateTo({
				name: 'user/menu/info',
				query: {
					businessType: this.businessType
				}
		    })
		},
        pickerChange(e) {
            console.log(e)
        },
        toEditShop(shopItem = {}) {
            this.$myrouter.navigateTo({
                name: 'shop/edit',
                query: {
                    shopID: shopItem.shopID,
                }
            })
        },
        toAddShop() {
            this.$myrouter.navigateTo({
                name: 'shop/edit'
            })
        },
        saveBusinessType(businessType) {
            uni.setStorageSync('businessType', businessType)
        },
        saveShopInfo(shopItem) {
            if (!shopItem.minusList) {
                shopItem.minusList = getShopMinusList(shopItem.minus || '')
            }
            uni.setStorageSync('shopInfo',shopItem)
        },
    }
}
</script>
<style lang="scss">
	page {
		height: 100%;
		background-color: $color-bg-f5;

	}
.shop-list-container {
    font-size: 28rpx;
    color: #333;
    
    .shop-list {
        padding: 20rpx;
    }
}
</style>

