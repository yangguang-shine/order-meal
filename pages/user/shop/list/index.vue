<template>
    <div class="shop-list-container">
        <div class="shop-list">
            <shop v-for="(shopItem, index) in shopList" :key="index" :shopItem="shopItem" @clickShopItem="toOrder(shopItem)" showArrowRight></shop>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import {host} from '@/config/host'
import shop from '@/components/shop'
import getShopMinusList from '@/utils/getShopMinusList';
import { vuexStorage } from '@/utils/tool.js';

export default {
    components:{
        shop
    },
    data() {
        return {
            shopList: [],
            host,
        }
    },
	computed: {
		...mapState({
			businessType: state => vuexStorage(state, 'businessType') || ''
		}),
	},
    onShow() {
        this.init()
    },
    methods: {
        ...mapMutations({
            saveShopInfo: 'saveShopInfo',
        }),
        async init() {
            try {
                this.$showLoading()
                const query = {
					businessType: this.businessType
				}
                const res = await this.$fetch.get('/user/shop/list', query)
                const shopList = res.data || [];
                shopList.forEach((item) => {
                    item.minusList = getShopMinusList(item.minus || '')
                })
                this.shopList = shopList
                this.$hideLoading()
            } catch(e) {
                console.log(e)
                this.$hideLoading()
            }
        },
		toOrder(shopItem) {
			this.saveShopInfo(shopItem)
			this.$myrouter.navigateTo({
				name: 'user/menu/list',
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
    line-height: 1;
    .shop-list {
        padding: 20rpx;
    }
}
</style>

