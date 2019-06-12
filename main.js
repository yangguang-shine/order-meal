import Vue from 'vue'
import App from './App'
import router from './utils/router.js'

Vue.config.productionTip = false
console.log(Vue.prototype)
Vue.prototype.$myrouter = router
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
