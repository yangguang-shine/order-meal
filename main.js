import Vue from 'vue'
import App from '@/App'
import router from '@/utils/router.js'
import fetch from '@/utils/fly.js'
import store from '@/store'
import NoData from '@/components/no-data.vue'
import { showModal, showLoading, showToast, hideLoading, hideToast} from '@/utils'
import '@/style/flex.css'
import '@/style/common.css'
Vue.component('no-data',NoData)
Vue.config.productionTip = false
Vue.prototype.$myrouter = router
Vue.prototype.$store = store
Vue.prototype.$fetch = fetch
Vue.prototype.$showModal = showModal
Vue.prototype.$showLoading = showLoading
Vue.prototype.$showToast = showToast
Vue.prototype.$hideLoading = hideLoading
Vue.prototype.$hideToast = hideToast
console.log(Vue.prototype)
// Vue.prototype.$data.$mainColor = '#47ff56'
// Vue.prototype.$mainColor = '#47ff56'
App.mpType = 'app'
const $mainColor = "#54e047"
const app = new Vue({
    ...App,
    store
})
Vue.mixin({ // 用得比较多且需要在模板里用可以放到这里，如果用jsx就没有这么多事
    computed: { // 不能修改
        $mainColor () {
            return $mainColor 
        },
    }
});
app.$mount()



