<template>
    <div class="shop-list-container">
        <div v-for="(shopItem, index) in shopList" :key="index" class="shop-item" @click="toCategoryList(shopItem)">
            <div>{{shopItem.shopName}}</div>
            <div>{{shopItem.address}}</div>
            <div>开放时间：{{shopItem.startTime}}--{{shopItem.endTime}}</div>
            <div class="edit" @click.stop="toEditShop(shopItem)">×</div>
        </div>
        <div class="add" @click="toAddShop">增加</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            shopList: [],
        }
    },
    onLoad() {
    },
    async onShow() {
        try {
            const res = await this.$fetch.get('/api/shop/list')
            this.shopList = res.data || [] 
        } catch(e) {
            console.log(e)
        }
    },
    methods: {
        toCategoryList(shopItem) {
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
    padding: 30rpx;
    .shop-item {
        margin-bottom: 20rpx;
        position: relative;
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
    div {
        margin-top: 10rpx;
    }
}
</style>

