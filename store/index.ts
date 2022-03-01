import { createStore } from 'vuex'
import actions from './actions'
import state from './state'
import mutations from './mutations'
import user from './user'
import manage from './manage'
const store = createStore({
    state,
    mutations,
    actions,
    modules: {
        user,
        manage
    }
})
export default store