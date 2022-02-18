import state from "./state";
import mutations from "./mutations";
import actions from "./actions";
import home from './home';
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    modules: {
        home,
    }
}