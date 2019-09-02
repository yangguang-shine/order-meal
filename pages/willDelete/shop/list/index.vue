<template>
    <div class="shop-list-container">
        <div class="shop-list">
            <div v-for="(shopItem, index) in shopList" :key="index" class="shop-item flex-row" @click="toCategoryList(shopItem)">
                <image :src="shopInfo.imgUrl ? host + shopInfo.imgUrl : '/static/img/default-img.svg'" class="shop-img" mode="aspectFill"></image>
                <div class="shop-info-box flex-item flex-col flex-j-between">
                    <div>
                        <div class="shop-name line1">{{shopItem.shopName}}</div>
                        <div class="shop-open-time">{{shopItem.startTime}}--{{shopItem.endTime}}</div>
                    </div>
                    <div class="shop-address">{{shopItem.address}}</div>
                </div>
                <image v-if="!toOrder" class="delete-icon" src="/static/img/shop-delete.svg" @click.stop="toDeleteShop(shopItem)"></image>
                <image v-if="!toOrder" class="edit-icon" src="/static/img/shop-edit.svg" @click.stop="toEditShop(shopItem)"></image>
            </div>
        </div>
        <div class="add-box flex-row flex-ja-center" @click="toAddShop" >
            <image class="add-icon" src="/static/img/shop-add.svg"></image>
        </div> 
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import host from '@/config/host'

export default {
    data() {
        return {
            shopList: [],
            toOrder: 0,
            host
        }
    },
    onLoad(query) {
        this.toOrder = +query.toOrder || 0
    },
    onShow() {
        this.init()
    },
    methods: {
        ...mapMutations({
            saveOrderShopInfo: 'saveOrderShopInfo'
        }),
        async init() {
            try {
                this.$showLoading()
                const res = await this.$fetch.get('/api/shop/list')
                this.shopList = res.data || [];
                this.$hideLoading()
            } catch(e) {
                console.log(e)
                this.$hideLoading()
                this.$showModal({
                    content: '店铺列表获取失败'
                })
            }
        },
        toCategoryList(shopItem) {
            if (this.toOrder) {
                this.saveOrderShopInfo(shopItem)
 				this.$myrouter.push({
					name: 'menu',
					query: {
						shopID: shopItem.shopID
					}
                })
                return
            }
            this.$myrouter.push({
                name: 'category/list',
                query: {
                    shopID: shopItem.shopID
                }
            })
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

