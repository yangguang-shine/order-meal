import { computed } from "vue";
import { useStore } from "vuex";
// (['hahah'])  or (['hahah'])
export const mapState = function (namespace: string | string[], states?: string[]): any {
    const store = useStore();
    console.log(store);

    const obj: any = {};
    if (typeof namespace === "string") {
        if (states) {
            states.forEach((key: any) => {
                obj[key] = computed(() => getNamespaceState(namespace, store)[key]);
            });
        }
    } else {
        namespace.forEach((key: string) => {
            console.log(1111);
            console.log(key);
            obj[key] = computed(() => {
                return store.state[key];
            });
        });
    }
    return obj;
};
function getNamespaceState(namespace: string, store: any): any {
    const spaceArr = namespace.split("/");
    return spaceArr.reduce((state, item) => {
        return state[item];
    }, store.state);
}

export const mapGetters = function (namespace: string | any[], states?: any[]): any {
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

export const mapMutations = (namespace: string | string[], mutations?: string[]): any => {
    const store = useStore();
    console.log(store);

    const obj: any = {};
    if (typeof namespace === "string") {
        const module = store._modulesNamespaceMap[`${namespace}/`];
        if (mutations) {
            mutations.forEach((key: string) => {
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

export const mapActions = (namespace: string | string[], actions?: string[]): any => {
    const store = useStore();
    console.log(store);
    const obj: any = {};
    if (typeof namespace === "string") {
        const module = store._modulesNamespaceMap[`${namespace}/`];
        if (actions) {
            actions.forEach((key: string) => {
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
