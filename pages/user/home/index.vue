<template>
    <view class="home-container">
		<top-address-search :defaultAddress="defaultAddress" :topAddressWidthFlag="topAddressWidthFlag" @setTopAddressSearchHeight="setTopAddressSearchHeight" @toSelectAddress="toSelectAddress"></top-address-search>
		<tools-list></tools-list>
		<recommand-shop-list :recommandShopList="recommandShopList" :tabListFixed="tabListFixed" :selectTabItem="selectTabItem" :topAddressSearchHeight="topAddressSearchHeight" @setTabListTopHeight="setTabListTopHeight" @changeTabItem="changeTabItem" @toOrder="toOrder"></recommand-shop-list>
		<loading v-if="showLoadingFlag"></loading>
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
			selectTabItem: {
				title: '综合排序',
				type: 'comprehensive'
			},
			tabListTop: 0,
			tabListHeight: 0,
			topAddressSearchHeight: 0,
			showLoadingFlag: true,
			pageErrorFlag: false
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
		if (this.tabListTop === 0) return;
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
				this.showLoadingFlag = true
				await this.getDefaultAddress()
				await this.getShopList()
            } catch (e) {
                console.log(e);
				this.pageErrorFlag = true
            } finally {
				this.showLoadingFlag = false
            }
        },
		async getDefaultAddress() {
			    const res = await this.$fetch.get('/user/address/list', {})
			    const addressList = res.data || []
			    if (addressList.length) {
			        this.defaultAddress = addressList[0]
			    } else {
					await this.$showModal({
						content: '为提供更好服务，请先选择地址',
						confirmText: '去选择地址'
					})
					this.toSelectAddress()
					this.defaultAddress = {}
				}
				console.log(this.defaultAddress);
		},
		toSelectAddress() {
			this.$myrouter.navigateTo({
			    name: 'user/address/list',
				query: {
					fromPage: 'userHome'
				}
			});
		},
		async getShopList() {
			if(!this.defaultAddress.latitude || !this.defaultAddress.longitude) return;
			const params = {
				businessType: 2,
				type: this.selectTabItem.type,
				latitude: this.defaultAddress.latitude,
				longitude: this.defaultAddress.longitude
			}
			const res = await this.$fetch.get('/user/shop/list', params);
			const recommandShopList = res.data || [];
			recommandShopList.forEach(item => {
			    item.minusList = getShopMinusList(item.minus || '');
			});
			const remandShopList1 = recommandShopList.concat(recommandShopList);
			const tmandShopList2 = remandShopList1.concat(remandShopList1);
			this.recommandShopList = tmandShopList2.concat(tmandShopList2)
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
		async changeTabItem(tabItem) {
			try {
				this.$showLoading()
				await this.getShopList()
				this.selectTabItem = tabItem;
				uni.pageScrollTo({
				    scrollTop: this.tabListTop - this.topAddressSearchHeight,
				    duration: 100
				});
			} catch(e) {
				console.log(e)
			} finally {
				this.$hideLoading()
			}
   
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
