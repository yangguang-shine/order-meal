<template>
    <view class="shop-list-container ">
        <Shop v-for="(shopItem, index) in shopList" :key="index" :shopItem="shopItem" class="shop-item" @clickShopItem="toOrder" :showExtraFlag="routerBusinessType === 2"></Shop>
    </view>
</template>

<script lang="ts" setup>
import { defineComponent, computed, getCurrentInstance, ref, toRefs } from "vue";
import { ShopItemI } from "@/interface/index";
import router from "@/utils/router";
import Shop from '@/components/Shop.vue'
import { ShopStoreI, useShopStore } from "@/piniaStore/shop";
import { MenuStoreI, useMenuStore } from "@/piniaStore/menu";
import { ShopStateG } from "@/piniaStore/shop/state";

// shop store
const shopStore: ShopStoreI = useShopStore()
// shop state
const { shopList, routerBusinessType }: ShopStateG = toRefs(shopStore.shopState);
// menu store
const menuStore: MenuStoreI = useMenuStore()
// menu action
const { setShopInfo, setBusinessType } = menuStore
function toOrder(shopItem: ShopItemI) {
    setShopInfo(shopItem);
    setBusinessType(routerBusinessType.value);
    router.navigateTo({
        name: "menu/info",
        query: {
            shopID: shopItem.shopID,
            businessType: routerBusinessType.value
        }
    });
}
</script>

<style lang="scss" scoped>
.shop-list-container {
    padding: 20rpx;
    .shop-item {
        margin-bottom: 20rpx;
        border-radius: 12rpx;
    }
    
}
</style>
