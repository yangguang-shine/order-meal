<template>
    <div v-if="recommandShopList.length" class="shop-list-container">
        <!-- <div class="near-shop-title">附近外卖店铺推荐</div> -->
        <shop v-for="(shopItem, index) in recommandShopList" :key="index" :shopItem="shopItem" @clickShopItem="toOrder" showExtraFlag></shop>
    </div>
</template>

<script lang="ts" setup>
import Shop from "@/components/Shop.vue";
import { defineComponent, computed, getCurrentInstance } from "vue";
import { mapState, mapMutation, mapAction } from "@/utils/mapVuex";
import { ShopItemI } from "@/interface/index";
import router from "@/utils/router";
// import { AddressItemI, ShopItemI } from '@/interface/index'
interface MutationF {
    saveShopInfo: (shopItem: ShopItemI) => void;
    saveBusinessType: (type: number) => void;
}
interface StateU {
    recommandShopList: {
        value: ShopItemI[];
    };
}
const { saveShopInfo, saveBusinessType }: MutationF = mapMutation(["saveShopInfo", "saveBusinessType"]);
const { recommandShopList }: StateU = mapState(["recommandShopList"]);
function toOrder(shopItem: ShopItemI) {
    saveShopInfo(shopItem);
    saveBusinessType(2);
    router.navigateTo({
        name: "menu/info",
        query: {
            shopID: shopItem.shopID,
            businessType: 2
        }
    });
}
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
