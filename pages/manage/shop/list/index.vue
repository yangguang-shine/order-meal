<template>
    <div class="shop-list-container">
        <div class="shop-list">
            <shop v-for="(shopItem, index) in shopList" :key="index" :shopItem="shopItem" :pageSign="pageSign" :managerShopList="managerShopList" @clickShopItem="toNextPage" @toDeleteShop=toDeleteShop></shop>
        </div>
        <div v-if="!pageSign && managerShopList" class="add-box flex-row flex-ja-center" @click="toAddShop" >
            <image class="add-icon" src="/static/img/shop-add.svg"></image>
        </div> 
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import host from '@/config/host'
import shop from '@/components/shop'
import getShopMinusList from '@/utils/getShopMinusList';

export default {
    components:{
        shop
    },
    data() {
        return {
            shopList: [],
            pageSign: '',
            host,
            businessType: '',
            managerShopList: ''
        }
    },
    onLoad(query) {
        console.log(query)
        this.pageSign =query.pageSign || ''
        this.managerShopList = query.managerShopList || ''
        this.businessType = Number(query.businessType) || ''
    },
    onShow() {
        this.init()
    },
    methods: {
        ...mapMutations({
            saveOrderShopInfo: 'saveOrderShopInfo',
            saveBusinessType: 'saveBusinessType'
        }),
        async init() {
            try {
                this.$showLoading()
                const query = {
                    managerShopList: this.managerShopList
                }
                if (this.businessType) {
                    query.businessType = this.businessType
                }
                const res = await this.$fetch.get('/api/shop/list', { ...query })
                const shopList = res.data || [];
                shopList.forEach((item) => {
                    item.minusList = getShopMinusList(item.minus || '')
                })
                this.shopList = shopList
                this.$hideLoading()
            } catch(e) {
                console.log(e)
                this.$hideLoading()
                this.$showModal({
                    content: '店铺列表获取失败'
                })
            }
        },
        toNextPage(shopItem) {
            if (this.pageSign === 'menu') {
                this.saveOrderShopInfo(shopItem)
                this.saveBusinessType(this.businessType)
 				this.$myrouter.push({
					name: 'menu',
					query: {
                        shopID: shopItem.shopID,
                    }
                })
            } else if (this.pageSign === 'shop/orderList') {
                this.$myrouter.push({
                    name: 'shop/orderList',
                    query: {
                        shopID: shopItem.shopID
                    }
                })
            } else {
                this.$myrouter.push({
                    name: 'category/list',
                    query: {
                        shopID: shopItem.shopID
                    }
                })
            }

        },
        pickerChange(e) {
            console.log(e)
        },
        async toDeleteShop(shopItem) {
            try {
                try {
                    await this.$showModal({
                        content: '删除店铺将一并删除该店铺的菜品分类、菜品详情、订单列表，操作不可逆',
                        showCancel: true,
                        confirmText: '确认删除'
                    })
                } catch (e) {
                    return
                }
                this.$showLoading({
                    title: '删除中'
                });
                await this.$fetch.post('/api/shop/delete', { shopID: shopItem.shopID });
                this.$hideLoading();
                await this.$showModal({
                    content: '删除成功'
                })
            } catch (e) {
                console.log(e)
                uni.hideLoading();
                await this.$showModal({
                    content: '删除失败'
                })
                return;
            }
            try {
                this.$showLoading({
                    title: '加载中'
                });
                await this.init()
                uni.hideLoading();
            } catch(e) {
                console.log(e)
                this.$showModal({
                    content: '店铺列表获取失败'
                })
                uni.hideLoading();
            } 
        },
        toEditShop(shopItem = {}) {
            this.$myrouter.push({
                name: 'shop/edit',
                query: {
                    shopID: shopItem.shopID,
                }
            })
        },
        toAddShop() {
            this.$myrouter.push({
                name: 'shop/edit'
            })
        },
    }
}
</script>
<style scoped lang="scss">
.shop-list-container {
    font-size: 28rpx;
    color: #333;
    line-height: 1;
    padding-bottom: 70rpx;
    .shop-list {
        padding: 30rpx;
    }
    .shop-item {
        margin-bottom: 30rpx;
        position: relative;
    }
    .shop-img {
        width: 120rpx;
        height: 120rpx;
        margin-right: 20rpx;
    }
    .shop-info-box {
        height: 120rpx;
        line-height: 1.3;
    }
    .shop-name {
        font-size: 32rpx;
        font-weight: bold;
        max-width: 500rpx;
    }
    .shop-open-time {
        font-size: 24rpx;
        margin-top: 10rpx;
        color: #999;
    }
    .shop-address {
        max-width: 500rpx;
        color: #666; 
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
    .add-box {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 100rpx;
        background-color: #fff;
        line-height: 100rpx;
        text-align: center;
    }
    .add-icon {
        width: 50rpx;
        height: 50rpx;
    }
    .edit {
        position: absolute;
        padding: 30rpx;
        right: 80rpx;
        top: 50%;
        transform: translateY(-50%);
    }
    .add {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        text-align: center;
    }
}
</style>

