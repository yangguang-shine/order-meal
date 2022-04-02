<template>
    <div class="shop-list-container">
        <div class="shop-list">
            <Shop v-for="(shopItem, index) in shopList" :key="index" :shopItem="shopItem" :showDeleteShopFlag="true" :showEditShopFlag="true" @clickShopItem="toShowSelectMoadl(shopItem)" @deleteShop="toDeleteShop(shopItem)"></Shop>
        </div>
        <BottomButton title="去添加店铺" @clickButton="toAddShop"></BottomButton>
        <view v-if="showSelectModal" class="select-modal-container flex-row flex-ja-center" @click="toCloseSelectModal">
            <view class="select-modal-box flex-col flex-a-center" @click.stop>
                <view class="select-title">请选择</view>
                <view class="select-item" @click="toShopFoodInfo">去店铺菜品信息列表</view>
                <view class="select-item" @click="toShopOrderInfo">去店铺订单信息列表</view>
                <view class="select-item" @click="toCopyMeiTuanData">批量导入美团数据</view>
                <icon class="close-icon" type="cancel" size="26" color="#eee" @click="toCloseSelectModal" />
            </view>
        </view>
    </div>
</template>

<script lang="ts" setup>
import Shop from "@/components/Shop";
import BottomButton from "@/components/BottomButton.vue";
import { mapState, mapMutation, mapAction } from "@/utils/mapVuex";
import { ref, getCurrentInstance } from "vue";
import { onShow, onLoad, onPageScroll } from "@dcloudio/uni-app";
const showSelectModal = ref(false);
const selectShopItem = {};
const {
    $showLoading,
    $hideLoading,
    $showModal,
    $showToast,
    $myrouter
} = getCurrentInstance().proxy;

const { shopList } = mapState("manage", ["shopList"]);
const { getShopList, saveShopInfo } = mapAction("manage", ["getShopList", 'saveShopInfo']);
onShow(() => {
    init();
});
async function init() {
    try {
        $showLoading();
        await getShopList();
        // shopList.forEach(item => {
        //     item.minusList = getShopMinusList(item.minus || "");
        //     item.fullImgUrl = `${shopImgPrePath}/${item.imgUrl}`;
        // });
        if (shopList.value.length === 0) {
            $showToast({
                title: "暂无店铺列表"
            });
        }
    } catch (e) {
        console.log(e);
    } finally {
        $hideLoading();
    }
}
function toShowSelectMoadl(shopItem) {
    saveShopInfo(shopItem);
    showSelectModal.value = true;
}
function toCloseSelectMoadl() {
    saveShopInfo({});
    showSelectModal.value = false;
}
function toShopFoodInfo() {
    $myrouter.navigateTo({
        name: "manage/category/list"
    });
}

function toShopOrderInfo() {
    $myrouter.navigateTo({
        name: "manage/order/list"
    });
}

function toCopyMeiTuanData() {
    $myrouter.navigateTo({
        name: "manage/meituan/copy"
    });
}

        // async toDeleteShop(shopItem) {
        //     try {
        //         try {
        //             await this.$showModal({
        //                 content:
        //                     "删除店铺将一并删除该店铺的菜品分类、菜品详情、订单列表，操作不可逆",
        //                 showCancelFlag: true,
        //                 confirmText: "确认删除"
        //             });
        //         } catch (e) {
        //             return;
        //         }
        //         this.$showLoading({
        //             title: "删除中"
        //         });
        //         await this.$fetch("manage/shop/remove", {
        //             shopID: shopItem.shopID
        //         });
        //         this.$hideLoading();
        //         await this.$showModal({
        //             content: "删除成功"
        //         });
        //     } catch (e) {
        //         console.log(e);
        //         this.$hideLoading();
        //         await this.$showModal({
        //             content: "删除失败"
        //         });
        //         return;
        //     }
        //     try {
        //         this.$showLoading({
        //             title: "加载中"
        //         });
        //         await this.init();
        //         this.$hideLoading();
        //     } catch (e) {
        //         console.log(e);
        //         this.$hideLoading();
        //     }
        // },
        // toEditShop(shopItem = {}) {
        //     this.$myrouter.navigateTo({
        //         name: "manage/shop/edit",
        //         query: {
        //             canOperation: "true"
        //         }
        //     });
        // },
        // toAddShop() {
        //     this.$myrouter.navigateTo({
        //         name: "manage/shop/edit"
        //     });
        // }
</script>
<style lang="scss">
page {
    background-color: $color-bg-f5;
}

.shop-list-container {
    font-size: 28rpx;

    padding-bottom: 100rpx;
    .shop-list {
        padding: 10rpx 20rpx 0;
    }
    .select-modal-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
    }
    .select-modal-box {
        position: relative;
        width: 600rpx;
        padding: 60rpx 0;
        box-sizing: border-box;
        background-color: #fff;
        border-radius: 24rpx;
    }
    .select-title {
        font-weight: bold;
        font-size: 44rpx;
        padding-bottom: 20rpx;
    }
    .select-item {
        font-size: 32rpx;
        margin-top: 50rpx;
        width: 80%;
        height: 120rpx;
        line-height: 120rpx;
        border: 1.5rpx solid #eee;
        border-radius: 12rpx;
        text-align: center;
    }
    .close-icon {
        position: absolute;
        padding: 10rpx;
        top: -100rpx;
        right: 0;
    }
}
</style>
