<template>

    <div v-if="recommandShopList.length" class="shop-list-container">
        <!-- <div class="near-shop-title">附近外卖店铺推荐</div> -->
        <shop v-for="(shopItem, index) in recommandShopList" :key="index" :shopItem="shopItem" @clickShopItem="toOrder" showArrowRight></shop>
    </div>
</template>

<script lang="ts">

import Shop from '../../../../components/Shop';
import { defineComponent, computed, getCurrentInstance } from "vue";
import { mapState, mapMutations, mapActions } from "../../../../utils/mapVuex";

export default defineComponent({
    components: {
        Shop,
    },
    setup(props) {
        const { recommandShopList } = mapState('user', ['recommandShopList'])

        function toOrder(shopItem) {
            console.log('toOrder')
        }
        return {
            recommandShopList
        }
    },
    mounted() {
    },
    methods: {
        toOrder(shopItem) {
            console.log('toOrder')
        }
    }
})
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
