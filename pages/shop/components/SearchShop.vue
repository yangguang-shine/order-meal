<template>
    <Search :searchResultList="searchShopList" v-model="searchValue" @clickCancel="clickCancel">
        <template #result>
            <Shop v-for="searchShopItem in searchShopList" :key="searchShopItem.shopID" class="search-shop-item" :shopItem="searchShopItem" @clickShopItem="clickShopItem" :showExtraFlag="routerBusinessType === 2"></Shop>
        </template>
        <template #default>
            <Shop v-for="shopItem in shopList" :key="shopItem.shopID" class="search-shop-item" :shopItem="shopItem" @clickShopItem="clickShopItem" :showExtraFlag="routerBusinessType === 2"></Shop>
        </template>
    </Search>
</template>

<script lang="ts" setup>
import { defineComponent, computed, getCurrentInstance, ref } from "vue";
import { mapState, mapMutation, mapAction } from "@/utils/mapVuex";
import { topAddressSearchHeight, tabListTop } from "../homeConfig";
import { TabItemI, ComputedStateI, ComputedMutationI, ComputedActionI, ShopItemI } from "@/interface/index";
import { ComputedI, RefI } from "@/interface/vueInterface";
import { onShow, onLoad, onPageScroll } from "@dcloudio/uni-app";
import { delaySync, hideLoading, showLoading } from "@/utils/";
import Search from "@/components/Search.vue";
import Shop from "@/components/Shop.vue";
import router from "@/utils/router";

interface StateF {
    tabList: ComputedStateI<TabItemI[]>;
    shopList: ComputedStateI<ShopItemI[]>;
    routerBusinessType: ComputedStateI<number>;
}
interface MutationF {
    setSearchShopListFlag: ComputedMutationI<boolean>;
    saveShopInfo: ComputedMutationI<ShopItemI>;
    saveBusinessType: ComputedMutationI<number>;
}

const { tabList, shopList, routerBusinessType }: StateF = mapState(["tabList", "shopList", "routerBusinessType"]);
const { setSearchShopListFlag, saveShopInfo, saveBusinessType }: MutationF = mapMutation(["setSearchShopListFlag", "saveShopInfo", "saveBusinessType"]);
const searchValue: RefI<string> = ref("");
const searchShopList: ComputedI<ShopItemI> = computed(() => {
    if (!searchValue.value) return [];
    const searchShopList: ShopItemI[] = [];
    shopList.value.forEach((shopItem: ShopItemI) => {
        if (shopItem.shopName.includes(searchValue.value)) {
            searchShopList.push(shopItem);
        }
    });
    return searchShopList;
});
function clickShopItem(shopItem: ShopItemI) {
    saveShopInfo(shopItem);
    saveBusinessType(routerBusinessType.value);
    router.navigateTo({
        name: "menu/info",
        query: {
            businessType: routerBusinessType.value,
            shopID: shopItem.shopID,
        },
    });
}

async function clickCancel() {
    setSearchShopListFlag(false);
}
</script>

<style lang="scss" scoped>
.tab-list-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 80rpx;
    background-color: #fff;
    z-index: 100;
    .tab-item {
        color: #666;
        height: 100%;
    }
    .select-tab-item {
        font-weight: bold;
        color: #333;
    }
    .search-box {
        width: 160rpx;
        height: 50rpx;
        color: #ccc;
        border: 1px solid;
        position: relative;
        border-radius: 25rpx;
        .search-img {
            position: absolute;
            top: 50%;
            left: 16rpx;
            transform: translateY(-50%);
            width: 25rpx;
            height: 25rpx;
            background-color: #ccc;
            border-radius: 50%;
        }
        .search-title {
            margin-left: 8rpx;
            font-size: 24rpx;
            color: #ccc;
        }
    }
}
</style>
