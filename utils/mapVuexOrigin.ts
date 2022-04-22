import { computed } from "vue";
import { useStore } from "vuex";
let state : any= null
// (['hahah'])  or (['hahah'])
export const mapState = function (namespace: string | string[], states?: string[]): any {
    console.log(state)
    if (state) {
        return state
    }
    const store = useStore();
    // const obj: any = {};
    if (typeof namespace === "string") {
        if (states) {
          state = computed(() => getNamespaceState(namespace, store))
        }
    } else {
        state = computed(() => {
            return store.state;
        })
    }
    console.log(state.value)

    return state;
};
// export const mapState = function (namespace: string | string[], states?: string[]): any {
//     const store = useStore();

//     const obj: any = {};
//     if (typeof namespace === "string") {
//         if (states) {
//             states.forEach((key: any) => {
//                 obj[key] = computed(() => getNamespaceState(namespace, store)[key]);
//             });
//         }
//     } else {
//         namespace.forEach((key: string) => {
//             obj[key] = computed(() => {
//                 return store.state[key];
//             });
//         });
//     }
//     console.log(obj)
//     return obj;
// };

function getNamespaceState(namespace: string, store: any): any {
    const spaceArr = namespace.split("/");
    return spaceArr.reduce((state, item) => {
        return state[item];
    }, store.state);
}

export const mapGetter = function (namespace: string | any[], states?: any[]): any {
    const store = useStore();
    const obj: any = {};
    if (typeof namespace === "string") {
        if (states) {
            states.forEach((key: any) => {
                obj[key] = computed(() => store.getters[`${namespace}/${key}`]);
            });
        }
    } else {
        namespace.forEach((key: any) => {
            obj[key] = computed(() => {
                return store.getters[key];
            });
        });
    }
    return obj;
};

export const mapMutation = (namespace: string | string[], mutation?: string[]): any => {
    const store = useStore();

    const obj: any = {};
    if (typeof namespace === "string") {
        const module = store._modulesNamespaceMap[`${namespace}/`];
        if (mutation) {
            mutation.forEach((key: string) => {
                obj[key] = async (payload: any) => await module.context.commit(key, payload);
            });
        }
    } else if (namespace) {
        namespace.forEach((key: string) => {
            obj[key] = async (payload: any) => await store.commit(key, payload);
        });
    }
    return obj;
};

export const mapAction = (namespace: string | string[], action?: string[]): any => {
    const store = useStore();
    const obj: any = {};
    if (typeof namespace === "string") {
        const module = store._modulesNamespaceMap[`${namespace}/`];
        if (action) {
            action.forEach((key: string) => {
                obj[key] = async (payload: any) => await module.context.dispatch(key, payload);
            });
        }
    } else {
        namespace.forEach((key: string) => {
            obj[key] = async (payload: any) => await store.dispatch(key, payload);
        });
    }
    return obj;

};
