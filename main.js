import Vue from 'vue'
import App from '@/App'
import router from '@/utils/router.js'
import fetch from '@/utils/fly.js'
import store from '@/store'
import { delaySync } from '@/utils/index.js';
import CommonError from '@/components/CommonError.vue'
import CommonLoading from '@/components/CommonLoading.vue'
import {
	showModal,
	showLoading,
	showToast,
	hideLoading,
	hideToast
} from '@/utils'
import {
	setStorage,
	getStorage
} from '@/utils/tool.js'
import '@/style/flex.css'
import '@/style/common.css'
import BottomButton from '@/components/BottomButton.vue'

import {
	mapState,
	mapMutations
} from 'vuex'
import {
	vuexStorage
} from '@/utils/tool.js';

import VConsole from 'vconsole'
new VConsole();


Vue.component('common-error', CommonError)
Vue.component('common-loading', CommonLoading)
Vue.config.productionTip = false
Vue.prototype.$myrouter = router
Vue.prototype.$store = store
Vue.prototype.$fetch = fetch
Vue.prototype.$showModal = showModal
Vue.prototype.$showLoading = showLoading
Vue.prototype.$showToast = showToast
Vue.prototype.$hideLoading = hideLoading
Vue.prototype.$setStorage = setStorage
Vue.prototype.$getStorage = getStorage
Vue.prototype.$delaySync = delaySync

delaySync

// Vue.prototype.$data.$mainColor = '#47ff56'
// Vue.prototype.$mainColor = '#47ff56'
App.mpType = 'app'
// const $mainColor = "#3190e8"
// const $mainColor = "#00e067"
const $mainColor = "#0096ff"


const $mainColor2 = "#58a3dd"
const app = new Vue({
	...App,
	store
})



Vue.component('bottom-button', BottomButton)
Vue.mixin({ // 用得比较多且需要在模板里用可以放到这里，如果用jsx就没有这么多事
	computed: { // 不能修改
		$mainColor() {
			return $mainColor
		},
		$mainColor2() {
			return $mainColor2
		},
		...mapState({
			selectShopItem: state => vuexStorage(state, 'selectShopItem') || {}
		})
	}
});
app.$mount()
