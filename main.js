import App from './App.vue'
import router from './utils/router'
import fetch from './utils/fetch'
import { delaySync } from '@/utils/index';
import CommonError from '@/components/CommonError.vue'
import CommonLoading from '@/components/CommonLoading.vue'
import TopNotice from '@/components/TopNotice.vue'
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
} from '@/utils/tool'
import '@/style/flex.css'
import '@/style/common.css'
// import BottomButton from '@/components/BottomButton.vue'
import getShopMinusList from '@/utils/getShopMinusList';

import { createSSRApp } from 'vue'
import * as Pinia from 'pinia';
console.log(uni)
export function createApp() {
	const app = createSSRApp(App)
	app.config.globalProperties.$myrouter = router
	app.config.globalProperties.$fetch = fetch
	app.config.globalProperties.$showModal = showModal
	app.config.globalProperties.$showLoading = showLoading
	app.config.globalProperties.$showToast = showToast
	app.config.globalProperties.$hideLoading = hideLoading
	app.config.globalProperties.$setStorage = setStorage
	app.config.globalProperties.$getStorage = getStorage
	app.config.globalProperties.$delaySync = delaySync
	app.config.globalProperties.$getShopMinusList = getShopMinusList
	app.component('CommonError', CommonError)
	app.component('CommonLoading', CommonLoading)
	app.component('TopNotice', TopNotice)
	// app.component('BottomButton', BottomButton)
	// const $mainColor = "#0096ff"
	const $mainColor = "#ff4b33"
	// const $mainColor = "orange"
	const $mainColor2 = "#58a3dd"

	const appMainColor = ''
	const shopMainColor = ''

	app.mixin({ // 用得比较多且需要在模板里用可以放到这里，如果用jsx就没有这么多事
		computed: { // 不能修改
			$mainColor() {
				return $mainColor
			},
			$mainColor2() {
				return $mainColor2
			},
			// ...mapState({
			// 	selectShopItem: state => vuexStorage(state, 'selectShopItem') || {}
			// })
		}
	});
	app.use(Pinia.createPinia());
	return {
		app,
		Pinia
	}
}


