<template>
    <div class="page-shop-container">
        <Search :searchResultList="searchShopList" v-model="searchValue"  @clickCancel="clickCancel">
            <template #result>
                <Shop v-for="searchShopItem in searchShopList" :key="searchShopItem.shopID" class="search-shop-item" :shopItem="searchShopItem" @clickShopItem="clickShopItem"></Shop>
            </template>
            <template #default>
                <div></div>
                <Shop v-for="searchShopItem in recommandShopList" :key="searchShopItem.shopID" class="search-shop-item" :shopItem="searchShopItem" @clickShopItem="clickShopItem"></Shop>
            </template>
        </Search>
    </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, reactive, computed, ref } from "vue";
import { onShow, onLoad, onPageScroll } from "@dcloudio/uni-app";
import { mapAction, mapMutation, mapState } from "@/utils/mapVuex";
import { ComputedActionI, ComputedMutationI, ComputedStateI } from "@/interface/vuex";
import { UserInfoI } from "@/interface/center";
import Search from "@/components/Search";
import Shop from "@/components/Shop";
import { ComputedI } from "@/interface/vueInterface";
import { ShopItemI } from "@/interface/home";
import router from "@/utils/router";
const { $showLoading, $hideLoading, $showModal, $myrouter } = getCurrentInstance().proxy;
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
    console.log(searchValue.value)
    console.log('recommandShopList')
    console.log(recommandShopList)
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
    console.log('clickShopItem')
}
function clickCancel() {
    router.back()
}
</script>
<style>
page {
    background-color: #f5f5f5;
}
</style>
<style lang="scss">
.page-shop-container {
    .search-shop-item {
        border-bottom: 1rpx solid #eee;
    }
    .search-shop-item:last-child {
        border-bottom: none;
        margin-bottom: 30rpx;
    }
}
</style>
