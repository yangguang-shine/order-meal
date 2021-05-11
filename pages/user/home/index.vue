<template>
    <view class="home-container">
		<top-address-search :defaultAddress="defaultAddress" :topAddressWidthFlag="topAddressWidthFlag" @setTopAddressSearchHeight="setTopAddressSearchHeight"></top-address-search>
		<tools-list></tools-list>
		<recommand-shop-list :recommandShopList="recommandShopList" :tabListFixed="tabListFixed" :selectTabItemIndex="selectTabItemIndex" :topAddressSearchHeight="topAddressSearchHeight" @setTabListTopHeight="setTabListTopHeight" @changeTabItem="changeTabItem" @toOrder="toOrder"></recommand-shop-list>

    </view>
</template>

<script>
// import { host } from '@/config/host';
import getShopMinusList from '@/utils/getShopMinusList';
// import SelectModal from '@/components/SelectModal.vue';
import { mapMutations } from 'vuex';
import TopAddressSearch from './components/TopAddressSearch.vue'
import ToolsList from './components/ToolsList.vue'
import RecommandShopList from './components/RecommandShopList.vue'

const debounce = (() => {
    let timer = null;
    return (fn, delay) => {
        if (timer) {
            clearTimeout(timer);
        }
        timer = setTimeout(() => {
            fn();
        }, delay);
    };
})();

export default {
    components: {
        // 'select-modal': SelectModal,
		TopAddressSearch,
		ToolsList,
		RecommandShopList
    },
    data() {
        return {
            nearShopList: [],
			defaultAddress: {},
			topAddressWidthFlag: false,
			recommandShopList: [],
			tabListFixed: false,
			selectTabItemIndex: 0,
			tabListTop: null,
			tabListHeight: null,
			topAddressSearchHeight: 0
        };
    },
	onShow() {
		uni.pageScrollTo({
			scrollTop: 0,
			duration: 0
		})
		this.init();
	},
	onPageScroll(e) {
		console.log(e);
		console.log(e.scrollTop > this.topAddressSearchHeight);
		if (this.tabListTop === null) return;
		if (e.scrollTop > this.topAddressSearchHeight) {
			this.topAddressWidthFlag = true
		} else {
			this.topAddressWidthFlag = false
		}
		if (e.scrollTop >= this.tabListTop - this.topAddressSearchHeight) {
			this.tabListFixed = true
		} else {
			this.tabListFixed = false
		}
	},
    methods: {
        async init() {
            try {
				this.$showLoading();
				await this.getDefaultAddress()
				await this.getShopList()
            } catch (e) {
                console.log(e);
            } finally {
                this.$hideLoading();
            }
        },
		async getDefaultAddress() {
			    this.$showLoading()
			    const res = await this.$fetch.get('/user/address/list', {})
			    const addressList = res.data || []
			    if (addressList.length) {
			        this.defaultAddress = addressList[0]
			    } else {
					this.defaultAddress = {}
				}
				console.log(this.defaultAddress);
		},
		async getShopList() {
			const res = await this.$fetch.get('/user/shop/list', { businessType: 2 });
			const recommandShopList = res.data || [];
			this.$showLoading();
			recommandShopList.forEach(item => {
			    item.minusList = getShopMinusList(item.minus || '');
			});
			this.recommandShopList = recommandShopList;
		},
        setTabListTopHeight(top, height) {
			this.tabListTop = top
			this.tabListHeight = height
			console.log('setTabListTopHeight');
			console.log(this.tabListTop);
			console.log(this.tabListHeight);
		},
		setTopAddressSearchHeight(height) {
			this.topAddressSearchHeight = height
			console.log('this.topAddressSearchHeight');
			console.log(this.topAddressSearchHeight);
		},
		changeTabItem(index) {
			this.selectTabItemIndex = index;
			uni.pageScrollTo({
			    scrollTop: this.tabListTop - this.topAddressSearchHeight,
			    duration: 100
			});
	
		},
		
		toShopList(businessType) {
            this.saveBusinessType(businessType)
            this.$myrouter.navigateTo({
                name: 'user/shop/list',
                query: {
                    businessType
                }
            });
        },

        toOrder(shopItem) {
            this.saveShopInfo(shopItem);
            this.saveBusinessType(2)
            this.$myrouter.navigateTo({
                name: 'user/menu/list',
                query: {
                    businessType: 2
                }
            });
        },
        saveBusinessType(businessType) {
            uni.setStorageSync('businessType', businessType)
        },
        saveShopInfo(shopItem) {
            if (!shopItem.minusList) {
                shopItem.minusList = getShopMinusList(shopItem.minus || '')
            }
            uni.setStorageSync('shopInfo',shopItem)
        },
    }
};
</script>

<style lang="scss">
page {
    // minheight: 100%;
    // background-color: #fff;
    background-color: $color-bg-f5;

}
.home-container {
    font-size: 28rpx;
    color: #333;
	min-height: 100vh;
    .swiper-box {
        height: 280rpx;
        width: 100%;
    }
    .swiper-item-box {
        width: 100%;
        height: 100%;
    }
    .swiper-item-img {
        padding: 30rpx;
        width: 100%;
        height: 300rpx;
        box-sizing: border-box;
    }
    .business-type-box {
        padding: 20rpx 0;
        background-color: #fff;
        margin: 20rpx;
        border-radius: 20rpx;
    }
    .type-item-box {
    }
    .type-item {
        width: 150rpx;
        height: 150rpx;
        border-radius: 50%;
    }
    .type-img {
        width: 80rpx;
        height: 80rpx;
    }
    .near-shop-title {
        padding: 10rpx 30rpx;
        font-size: 32rpx;
        font-weight: bold;
        // margin-bottom: 20rpx;
    }
    .shop-list {
        background-color: $color-bg-f5;
        padding: 20rpx 20rpx 0;
    }
    // .near-shop-box {
    // 	// padding: 30rpx;
    // }
}
</style>
