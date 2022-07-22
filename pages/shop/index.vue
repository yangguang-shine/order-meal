<template>
    <div class="page-shop-container">
        <TabList></TabList>
        <ShopList></ShopList>
        <SearchShop v-if="searchShopListFlag"></SearchShop>
    
    </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, reactive, computed, ref, toRefs } from "vue";
import { onShow, onLoad, onPageScroll } from "@dcloudio/uni-app";
import TabList from './components/TabList.vue'
import ShopList from './components/ShopList.vue'
import SearchShop from './components/SearchShop.vue'
import { ShopStoreI, useShopStore } from "@/piniaStore/shop";

import { ShopStateG } from "@/piniaStore/shop/state";
// shop store
const shopStore: ShopStoreI = useShopStore()
// shop state
const { searchShopListFlag }: ShopStateG = toRefs(shopStore.shopState)
// shop action
const { setRouterBusinessType } = shopStore;

onLoad((option: { businessType: string }) => {
    const routerBusinessType: number = Number(option.businessType);
    setRouterBusinessType(routerBusinessType)
});
</script>
<style lang="scss">
page {
    background-color: #f5f5f5;
}
.page-shop-container {
    padding-top: 80rpx;

}
</style>
