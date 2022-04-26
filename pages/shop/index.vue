<template>
    <div class="page-shop-container">
        <TabList></TabList>
        <ShopList></ShopList>
        <SearchShop v-if="searchShopListFlag"></SearchShop>
    
    </div>
</template>

<script setup lang="ts">
import { getCurrentInstance, reactive, computed, ref } from "vue";
import { onShow, onLoad, onPageScroll } from "@dcloudio/uni-app";
import { mapAction, mapMutation, mapState } from "@/utils/mapVuex";
import { ComputedActionI, ComputedMutationI, ComputedStateI } from "@/interface/vuex";
import { UserInfoI } from "@/interface/center";
import { ComputedI } from "@/interface/vueInterface";
import { ShopItemI } from "@/interface/home";
import router from "@/utils/router";
import TabList from './components/TabList.vue'
import ShopList from './components/ShopList.vue'
import SearchShop from './components/SearchShop.vue'
const { $showLoading, $hideLoading, $showModal, $myrouter } = getCurrentInstance().proxy;
interface StateF {
    searchShopListFlag: ComputedStateI<boolean>
}
interface MutationF {
    setRouterBusinessType: ComputedMutationI<number>;
}
const { searchShopListFlag }: StateF = mapState()
const { setRouterBusinessType }: MutationF = mapMutation();

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
