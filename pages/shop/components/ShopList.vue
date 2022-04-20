<template>
    <view class="shop-list-container ">
        <Shop v-for="(shopItem, index) in shopList" :key="index" :shopItem="shopItem" class="shop-item" @clickShopItem="toOrder" :showExtraFlag="routerBusinessType === 2"></Shop>
    </view>
</template>

<script lang="ts" setup>
import { defineComponent, computed, getCurrentInstance, ref } from "vue";
import { mapState, mapMutation, mapAction } from "@/utils/mapVuex";
import { topAddressSearchHeight, tabListTop } from "../homeConfig";
import { TabItemI, ComputedStateI, ComputedMutationI, ComputedActionI, ShopItemI } from "@/interface/index";
import { RefI } from "@/interface/vueInterface";
import { onShow, onLoad, onPageScroll } from "@dcloudio/uni-app";
import { delaySync, hideLoading, showLoading } from "@/utils/";
import router from "@/utils/router";
import Shop from '@/components/Shop.vue'

interface StateF {
    shopList: ComputedStateI<ShopItemI[]>;
    routerBusinessType: ComputedStateI<number>;
    
}
interface MutationF {
    saveShopInfo: ComputedMutationI<ShopItemI>
    saveBusinessType: ComputedMutationI<number>
}

const { shopList, routerBusinessType }: StateF = mapState(["shopList", "routerBusinessType"]);
const { saveShopInfo, saveBusinessType } :MutationF = mapMutation(["saveShopInfo", "saveBusinessType"])
function toOrder(shopItem: ShopItemI) {
    saveShopInfo(shopItem);
    saveBusinessType(routerBusinessType.value);
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
