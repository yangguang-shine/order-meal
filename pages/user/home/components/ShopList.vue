<template>

    <div v-if="recommandShopList.length" class="shop-list-container">
        <!-- <div class="near-shop-title">附近外卖店铺推荐</div> -->
        <shop v-for="(shopItem, index) in recommandShopList" :key="index" :shopItem="shopItem" @clickShopItem="toOrder" showArrowRight></shop>
    </div>
</template>

<script>

import Shop from '../../../../components/Shop';
import TabList from './TabList';
import { topAddressSearchHeight } from '../homeConfig'

export default {
    components: {
        Shop,
        TabList
    },
    props: {
        recommandShopList: {
            type: Array,
            default: () => []
        },
        tabListFixedFlag: {
            type: Boolean,
            default: false
        },
        selectTabItem: {
            type: Object,
            default: () => { }
        },
    },
    data() {
        return {
            topAddressSearchHeight,
            tabList: [
                {
                    title: '综合排序',
                    type: 'comprehensive'
                },
                {
                    title: '销量最高',
                    type: 'sale'
                },
                {
                    title: '距离最近',
                    type: 'distance'
                }
            ]
        };
    },
    mounted() {
    },
    methods: {
        changeTabItem(tabItem) {
            if (tabItem.type === this.selectTabItem.type) return;
            this.$emit('changeTabItem', tabItem);
        },
        toOrder(shopItem) {
            this.$emit('toOrder', shopItem)
        }
    }
};
</script>

<style lang="scss" scoped>
.shop-list {
    // margin-top: 30rpx;
    // height: 2000rpx;
    padding: 0 20rpx;
    .com-shop-container {
        border-bottom: 1rpx solid #eee;
        padding: 30rpx 0;
    }
    .com-shop-container:last-child {
        border-bottom: none;
    }
}
</style>
