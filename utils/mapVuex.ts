import { computed, toRefs, reactive } from "vue";
import { useStore } from "vuex";
let store: any;
let state: any = null;
let getter: any = null;
let mutation: any = null;
let action: any = null;
let stateModule: any = {};
let getterModule: any = {};
let mutationModule: any = {};
let actionModule: any = {};

// (['hahah'])  or (['hahah'])
export const mapState = function (namespace?: string): any {
    store || (store = useStore());

    if (typeof namespace === 'string') {
        if (!stateModule[namespace]) {
            stateModule[namespace] = computed(() => getNamespaceState(namespace, store));
        }
        return toRefs(stateModule[namespace]);
    } else {
        if (!state) {
            state = computed(() => store.state);
        }
        return toRefs(reactive(state.value));
    }
  
};


function getNamespaceState(namespace: string, store: any): any {
    const spaceArr = namespace.split("/");
    return spaceArr.reduce((state, item) => {
        return state[item];
    }, store.state);
}

export const mapGetter = function (namespace?: string): any {
    store || (store = useStore());
    const obj: any = {};
    if (typeof namespace === "string") {
        if (!getterModule[namespace]) {
            console.log('getterModule to do')
        }
    } else {
        if (!getter) {
            getter = computed(() => store.getters);
        }

        return toRefs(reactive(getter.value));
    }
};




export const mapMutation = (namespace?: string): any => {
    store || (store = useStore());
    if (typeof namespace === 'string') {
        if (!mutationModule[namespace]) {
            const module = store._modulesNamespaceMap[`${namespace}/`];
            mutationModule[namespace] = {};
            Object.keys(module._mutations).forEach((key) => {
                mutationModule[namespace][key] = async (payload: any) => await store.commit(key, payload);
            });
            return mutationModule[namespace];
        }
    } else {
        if (!mutation) {
            mutation = {}
            Object.keys(store._mutations).forEach((key) => {
                mutation[key] = async (payload: any) => await store.commit(key, payload);
            });
        }
        return mutation;
    }

};



export const mapAction = (namespace?: string): any => {
    // const store = useStore();
    const obj: any = {};
    store || (store = useStore());
    if (typeof namespace === "string") {
        if (!actionModule[namespace]) {
            const module = store._modulesNamespaceMap[`${namespace}/`];
            actionModule[namespace] = {};
            Object.keys(module._actions).forEach((key) => {
                actionModule[namespace][key] = async (payload: any) => await module.context.dispatch(key, payload);
            });
            return actionModule[namespace];
        }

    } else {
        if (!action) {
            action = {}
            Object.keys(store._actions).forEach((key) => {
                action[key] = async (payload: any) => await store.dispatch(key, payload);
            });
        }

        return action;
    }
};


// export const mapAction = (namespace: string | string[], action?: string[]): any => {
//     const store = useStore();
//     const obj: any = {};
//     if (typeof namespace === "string") {
//         const module = store._modulesNamespaceMap[`${namespace}/`];
//         if (action) {
//             action.forEach((key: string) => {
//                 obj[key] = async (payload: any) => await module.context.dispatch(key, payload);
//             });
//         }
//     } else {
//         namespace.forEach((key: string) => {
//             obj[key] = async (payload: any) => await store.dispatch(key, payload);
//         });
//     }
//     return obj;
// };
