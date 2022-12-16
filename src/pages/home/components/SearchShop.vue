<template>
    <view class="search-shop-container">
        <Search :searchResultList="searchShopList" :defaultList="recommandShopList" v-model="searchValue" :bottom="tabBarHeightPX" @clickCancel="clickCancel">
            <template #result>
                <Shop v-for="searchShopItem in searchShopList" :key="searchShopItem.shopID" class="search-shop-item" :shopItem="searchShopItem" @clickShopItem="clickShopItem" showExtraFlag></Shop>
            </template>
            <template #default>
                <Shop v-for="searchShopItem in recommandShopList" :key="searchShopItem.shopID" class="search-shop-item" :shopItem="searchShopItem" @clickShopItem="clickShopItem" showExtraFlag></Shop>
            </template>
        </Search>
        <view v-if="showSelectTypeFlag" class="select-type-box flex-row flex-ja-center" :style="{ bottom: tabBarHeightPX + 'px' }">
            <view class="overlay" :animation="overlayAnimationData" @click.stop="closeSlelectType"></view>
            <view class="type-list flex-col flex-ja-center" :animation="mainAnimationData">
                <view class="title text-center">{{ selectedShopItem.shopName }}的业务类型</view>
                <view class="type-item flex-row flex-ja-center" v-for="(typeItem, index) in selectedShopItem.businessTitleList" :key="index" @click.stop="confirmType(index)" :style="{color: $mainColor}">{{ typeItem }}</view>
                <!-- <view class="close-img" @click.stop="closeSlelectType"></view> -->
                <image class="close-img" @click.stop="closeSlelectType" src='/static/img/common/close1.png'></image>

            </view>
        </view>
    </view>
</template>

<script lang="ts" setup>
import { RefI } from "@/interface/vueInterface";
import { delaySync, tabBarHeightPX } from "@/utils/";
import Shop from "@/components/Shop.vue";
import Search from "@/components/Search.vue";
import { ref, onMounted, computed, toRefs } from "vue";
import { initShopItem, ShopItemI } from "@/interface/home";
import { searchShopTransitionTime, selectTypeTransitionTime } from "../homeConfig";
import router from "@/utils/router";
import useOverlayAnimation from "@/utils/useOverlayAnimation";
import { HomeStateG, HomeStoreI, useHomeStore } from "@/piniaStore/home";
import { MenuStoreI, useMenuStore } from "@/piniaStore/menu";


// home store
const homeStore: HomeStoreI = useHomeStore()
// home state
const { recommandShopList }: HomeStateG = toRefs(homeStore.homeState);
// home action
const { setSearchShopFlag } = homeStore
// menu store
const menuStore: MenuStoreI = useMenuStore()
// menu action
const { setShopInfo, setBusinessType } = menuStore

const showSelectTypeFlag: RefI<boolean> = ref(false);
const selectedShopItem: RefI<ShopItemI> = ref(recommandShopList.value[0]);
const searchValue: RefI<string> = ref("");
const searchShopList: RefI<ShopItemI> = computed(() => {
    if (!searchValue.value) return [];
    const searchShopList: ShopItemI[] = [];
    recommandShopList.value.forEach((shopItem: ShopItemI) => {
        if (shopItem.shopName.includes(searchValue.value)) {
            searchShopList.push(shopItem);
        }
    });
    return searchShopList;
});

const { overlayAnimationData, mainAnimationData, toStartAnimation, toEndAnimation } = useOverlayAnimation({
    duration: selectTypeTransitionTime,
    type: "scale",
});

function clickShopItem(shopItem: ShopItemI) {
    selectedShopItem.value = shopItem;
    showSelectTypeFlag.value = true;
    toStartAnimation();
}
async function closeSlelectType() {
    toEndAnimation();
    await delaySync(selectTypeTransitionTime);
    showSelectTypeFlag.value = false;
    selectedShopItem.value = initShopItem;
}
async function clickCancel() {
    setSearchShopFlag(false);
}
function confirmType(index: number) {
    const businessType = selectedShopItem.value.businessTypeList[index];
    setShopInfo(selectedShopItem.value);
    setBusinessType(businessType);
    router.navigateTo({
        name: "menu/info",
        query: {
            shopID: selectedShopItem.value.shopID,
            businessType: businessType,
        },
    });
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
    .select-type-box {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        width: 100%;
        z-index: 400;
        .overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5);
            opacity: 0;
        }
        .type-list {
            position: relative;
            width: 400rpx;
            padding: 80rpx 40rpx 60rpx;
            background-color: #fff;
            border-radius: 20rpx;
            transform: scale(0);
        }
        .close-img {
            position: absolute;
            top: 12rpx;
            right: 12rpx;
            width: 40rpx;
            height: 40rpx;
            padding: 8rpx;
            // background-color: red;
        }
        .title {
            font-weight: bold;
            font-size: 32rpx;
            line-height: 40rpx;
            margin-bottom: 10rpx;
            // text-align: center;
        }
        .type-item {
            font-size: 32rpx;
            height: 70rpx;
            margin-top: 30rpx;
            width: 100%;
            color: orange;
            border: 1px solid;
            border-radius: 30rpx;
        }
    }
}
</style>
