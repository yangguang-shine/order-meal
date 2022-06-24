<template>
    <view class="shop-list-container ">
        <Shop v-for="(shopItem, index) in shopList" :key="index" :shopItem="shopItem" class="shop-item" @clickShopItem="toOrder" :showExtraFlag="routerBusinessType === 2"></Shop>
    </view>
</template>

<script lang="ts" setup>
import { defineComponent, computed, getCurrentInstance, ref, toRefs } from "vue";
import { mapState, mapMutation, mapAction } from "@/utils/mapVuex";
import { topAddressSearchHeight } from "../homeConfig";
import { TabItemI, ComputedStateI, ComputedMutationI, ComputedActionI, ShopItemI } from "@/interface/index";
import { RefI } from "@/interface/vueInterface";
import { onShow, onLoad, onPageScroll } from "@dcloudio/uni-app";
import { delaySync, hideLoading, showLoading } from "@/utils/";
import router from "@/utils/router";
import Shop from '@/components/Shop.vue'
import { ShopStoreI, useShopStore } from "@/piniaStore/shop";
import { storeToRefs} from 'pinia'
import { MenuStoreI, useMenuStore } from "@/piniaStore/menu";
interface ShopStateF {
    shopList: ComputedStateI<ShopItemI[]>;
    routerBusinessType: ComputedStateI<number>;
    
}
// shop store
const shopStore: ShopStoreI = useShopStore()
// shop state
const { shopList, routerBusinessType }: ShopStateF = toRefs(shopStore.shopState);
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
