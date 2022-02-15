import { createStore } from 'vuex'
import actions from './actions'
import state from './state'
import mutations from './mutations'
import user from './user'
const store = createStore({
    state,
    mutations,
    actions,
    modules: {
        user,
    }
})
export default store