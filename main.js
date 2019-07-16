import Vue from 'vue'
import App from './App'
import router from './utils/router.js'
import store from './store'
import '@/style/flex.css'
import '@/style/common.css'
Vue.config.productionTip = false
Vue.prototype.$myrouter = router
Vue.prototype.$store = store
App.mpType = 'app'

const app = new Vue({
    ...App,
    store
})
app.$mount()
