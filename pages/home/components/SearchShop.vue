<template>
    <div class="search-shop-container">
        <Search :searchResultList="searchShopList" v-model="searchValue" :bottom="tabBarHeightPX" @clickCancel="clickCancel">
            <Shop v-for="searchShopItem in searchShopList" :key="searchShopItem.shopID" class="search-shop-item" :shopItem="searchShopItem" @clickShopItem="clickShopItem"></Shop>
        </Search>
    </div>
</template>

<script lang="ts" setup>
import { ComputedI, RefI } from "@/interface/vueInterface";
import { ComputedGetterI, ComputedMutationI, ComputedStateI } from "@/interface/vuex";
import { MinusPromotionsObjectI } from "@/store/getters/menu";
import { delaySync, tabBarHeightPX } from "@/utils/";
import Shop from "@/components/Shop.vue";
import Search from "@/components/Search.vue";
import { mapGetter, mapMutation, mapState } from "@/utils/mapVuex";
import { ref, onMounted, computed } from "vue";
import { ShopItemI } from "@/interface/home";
import { searchShopTransitionTime } from "../homeConfig";
import router from "@/utils/router";
interface StateF {
    recommandShopList: ComputedStateI<ShopItemI[]>;
}
interface MutationF {
    setSearchShopFlag: ComputedMutationI<boolean>;
    saveShopInfo: ComputedMutationI<ShopItemI>;
    saveBusinessType: ComputedMutationI<number>;
    
}

const { recommandShopList }: StateF = mapState(["recommandShopList"]);
const { setSearchShopFlag, saveShopInfo, saveBusinessType }: MutationF = mapMutation(["setSearchShopFlag", "saveShopInfo", "saveBusinessType"]);


const searchValue: RefI<string> = ref("");
const searchShopList: ComputedI<ShopItemI> = computed(() => {
    if (!searchValue.value) return [];
    const searchShopList: ShopItemI[] = [];
    recommandShopList.value.forEach((shopItem: ShopItemI) => {
        if (shopItem.shopName.includes(searchValue.value)) {
            searchShopList.push(shopItem);
        }
    });
    return searchShopList;
});
function clickShopItem(shopItem: ShopItemI) {
    saveShopInfo(shopItem);
    saveBusinessType(2);
    router.navigateTo({
        name: "menu/info",
    });
}

async function clickCancel() {
    setSearchShopFlag(false);
}
</script>

<style lang="scss">
.search-shop-container {
    .search-shop-item {
        border-bottom: 1rpx solid #eee;
    }
    .search-shop-item:last-child {
        border-bottom: none;
        margin-bottom: 30rpx;
    }
}
</style>
