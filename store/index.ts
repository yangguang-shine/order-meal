import state from "./state";
import getters from "./getters";
import mutations from "./mutations";
import actions from "./actions";
import { createStore } from 'vuex'
const store: any = createStore( {
    state,
    getters,
    mutations,
    actions,
})
console.log('>>>>>>>')
console.log(store)
export default store