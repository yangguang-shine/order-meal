<template>

    <div v-if="recommandShopList.length" class="shop-list-container">
        <!-- <div class="near-shop-title">附近外卖店铺推荐</div> -->
        <shop v-for="(shopItem, index) in recommandShopList" :key="index" :shopItem="shopItem" @clickShopItem="toOrder" showArrowRightFlag></shop>
    </div>
</template>

<script lang="ts" setup>
import Shop from "../../../../components/Shop";
import { defineComponent, computed, getCurrentInstance } from "vue";
import { mapState, mapMutations, mapActions } from "../../../../utils/mapVuex";


const internalInstance = getCurrentInstance();
const { $myrouter } = internalInstance.proxy;
const { saveShopInfo, saveBusinessType } = mapMutations('user', ['saveShopInfo', 'saveBusinessType'])
const { recommandShopList } = mapState("user", ["recommandShopList"]);
function toOrder(shopItem: any) {
    console.log("toOrder");
    saveShopInfo(shopItem);
    saveBusinessType(2);
    $myrouter.navigateTo({
        name: "user/menu/info",
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
