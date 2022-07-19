<template>
    <div class="search-food-container">
        <Search :searchResultList="searchFoodList" :defaultList="categoryFoodList" v-model="searchValue" :bottom="minusPromotionsObject.show ? footerAndMinusPX : footerPX" @clickCancel="clickCancel" type="searchFood">
            <!-- <FoodItem v-for="searchFoodItem in searchFoodList" :key="searchFoodItem.foodID" class="search-food-item" :foodItem="searchFoodItem" @clickFoodItem="toShowFoodDetail"></FoodItem> -->

            <template #result>
                <FoodItem v-for="searchFoodItem in searchFoodList" :key="searchFoodItem.foodID" class="search-food-item" :foodItem="searchFoodItem" type="searchFood" :idPre="idPre" @clickFoodItem="toShowFoodDetail"></FoodItem>
            </template>
            <template #default>
                <FoodItem v-for="searchFoodItem in categoryFoodList" :key="searchFoodItem.foodID" :idPre="idPre" class="search-food-item" :foodItem="searchFoodItem" type="searchFood" @clickFoodItem="toShowFoodDetail"></FoodItem>
            </template>
        </Search>
    </div>
    <!-- <view class="search-food-container" :animation="searchModalAnimationData" :style="{ bottom: minusPromotionsObject.show ? footerAndMinusPX + 'rpx' : footerPX + 'rpx' }">
        <view class="search-food-overlay"></view>
        <view class="top-box flex-row flex-ja-center">
            <input type="text" class="search-input flex-item" v-model="searchValue" />
            <view class="cancel" @click="clickCancel">取消</view>
            <view class="search-icon"></view>
            <view class="clear-input" @click="clearInput"></view>
        </view>
        <view v-if="searchFoodList.length" class="search-food-list">
            <FoodItem v-for="searchFoodItem in searchFoodList" :key="searchFoodItem.foodID" class="search-food-item" :foodItem="searchFoodItem" @clickFoodItem="toShowFoodDetail">{{ searchFoodItem.foodName }}</FoodItem>
        </view>
        <view v-else class="search-food-list-empty flex-col flex-ja-center">
       
            <CommonError></CommonError>
        </view>
    </view> -->
</template>

<script lang="ts" setup>
import { CategoryItemI, FoodItemI } from "@/interface/menu";
import { ComputedI, RefI } from "@/interface/vueInterface";
import { ComputedGetterI, ComputedMutationI, ComputedStateI } from "@/interface/vuex";
import { MinusPromotionsObjectI } from "@/store/getters/menu";
import { delaySync } from "@/utils/";
import { mapGetter, mapMutation, mapState } from "@/utils/mapVuex";
import { ref, onMounted, computed, toRefs } from "vue";
import FoodItem from "./item/FoodItem.vue";
import Search from "@/components/Search.vue";
import { MenuStoreI, useMenuStore } from "@/piniaStore/menu";
import { storeToRefs} from 'pinia'

interface MenuStateF {
    categoryList: ComputedStateI<CategoryItemI[]>;
    footerPX: ComputedStateI<number>;
    
}
interface MenuGetterF {
    minusPromotionsObject: ComputedGetterI<MinusPromotionsObjectI>;
    footerAndMinusPX: ComputedGetterI<number>;

}
interface MutationF {
    setSearchFoodFlag: ComputedMutationI<boolean>;
    setFoodDetailFlag: ComputedMutationI<boolean>;
    setFoodInfo: ComputedMutationI<FoodItemI>;
}
// store
const menuStore: MenuStoreI = useMenuStore();
// state
const { categoryList, footerPX }: MenuStateF = toRefs(menuStore.menuState);
// getter
const { minusPromotionsObject, footerAndMinusPX }: MenuGetterF = storeToRefs(menuStore);
// action
const { setSearchFoodFlag, setFoodDetailFlag, setFoodInfo } = menuStore;
const idPre = 'img-search'
const searchValue: RefI<string> = ref("");
const categoryFoodList: ComputedI<FoodItemI[]> = computed(() => {
    const categoryFoodList: FoodItemI[] = [];
    categoryList.value.forEach((categoryItem) => {
        categoryFoodList.push(...categoryItem.foodList);
    });
    return categoryFoodList;
});
const searchFoodList: ComputedI<FoodItemI> = computed(() => {
    if (!searchValue.value) return [];
    const searchFoodList: FoodItemI[] = [];
    categoryList.value.forEach((categoryItem) => {
        categoryItem.foodList.forEach((foodItem) => {
            if (foodItem.foodName.includes(searchValue.value)) {
                searchFoodList.push(foodItem);
            }
        });
    });
    return searchFoodList;
});

function toShowFoodDetail(foodItem: FoodItemI) {
    setFoodDetailFlag(true);
    setFoodInfo(foodItem);
}
async function clickCancel() {
    setSearchFoodFlag(false);
}
</script>

<style lang="scss">
.search-food-container {
    .search-food-item {
        border-bottom: 1rpx solid #eee;
        margin: 0 20rpx;
        // height: 200rpx;
        // background-color: red;
    }
    .search-food-item:last-child {
        border-bottom: none;
        padding-bottom: 40rpx;
    }
}
</style>
