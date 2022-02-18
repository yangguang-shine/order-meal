import { computed } from 'vue'
import { useStore } from 'vuex'
// ('user', ['hahah'])  or (['hahah'])
export const mapState = function (namespace: string | any[], states: any[]) {
    const store = useStore()
    const obj: any = {}
    if (typeof namespace === 'string') {
        states.forEach((key: any) => {
            obj[key] = computed(() => getNamespaceState(namespace, store)[key])
        })
    } else {
        namespace.forEach((key: any) => {
            obj[key] = computed(() => {
                return store.state[key]
            })
        })
    }
    return obj
}
function getNamespaceState (namespace: string, store: any) {
    const spaceArr = namespace.split('/')
    return spaceArr.reduce((state, item) => {
        return state[item]
    }, store.state)
}

export const mapMutations = (namespace: string | any[], mutations: any[]) => {
    const store = useStore()

    const obj: any = {}
    if (typeof namespace === 'string') {
        const module = store._modulesNamespaceMap[`${namespace}/`]
        mutations.forEach((key: string) => {
            obj[key] = async (payload: any) => await module.context.commit(key, payload)
        })
    } else {
        namespace.forEach((key: string) => {
            obj[key] = async (payload: any) => await store.commit(key, payload)
        })
    }
    return obj
}

export const mapActions = (namespace: any, mutations: any[]) => {
    const store = useStore()

    const obj: any = {}
    if (typeof namespace === 'string') {
        const module = store._modulesNamespaceMap[`${namespace}/`]
        mutations.forEach((key: string) => {
            obj[key] = async (payload: any) => await module.context.dispatch(key, payload)
        })
    } else {
        namespace.forEach((key: string) => {
            obj[key] = async (payload: any) => await store.dispatch(key, payload)
        })
    }
    return obj
}