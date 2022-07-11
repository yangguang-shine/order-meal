<template>
    <div v-if="recommandShopList.length" class="shop-list-container">
        <!-- <div class="near-shop-title">附近外卖店铺推荐</div> -->
        <shop v-for="(shopItem, index) in recommandShopList" :key="index" :shopItem="shopItem" @clickShopItem="toOrder" showExtraFlag></shop>
        
    </div>
</template>

<script lang="ts" setup>
import Shop from "@/components/Shop.vue";
import { defineComponent, computed, getCurrentInstance, toRefs } from "vue";
import { ComputedStateI, ShopItemI } from "@/interface/index";
import router from "@/utils/router";
import { HomeStoreI, useHomeStore } from "@/piniaStore/home";
import { MenuStoreI, useMenuStore } from "@/piniaStore/menu";
import { storeToRefs} from 'pinia'

interface HomeStateF {
    recommandShopList: ComputedStateI<ShopItemI[]>;
}
// home store
const homeStore: HomeStoreI = useHomeStore()
// home state
const { recommandShopList }: HomeStateF = toRefs(homeStore.homeState);
// menu store
const menuStore: MenuStoreI = useMenuStore()
// menu action
const { setShopInfo, setBusinessType } = menuStore;
// 下单
function toOrder(shopItem: ShopItemI) {
    setShopInfo(shopItem);
    setBusinessType(2);
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
