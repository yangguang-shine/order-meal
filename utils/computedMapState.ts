import { computed } from 'vue'
import { useStore } from 'vuex'
// ('user', ['hahah'])  or (['hahah'])
export default function(namespace: string | any[], states: any[]) {
    const store = useStore()
    console.log(store)
    let statesArray: any = []
    let module = store
    if (namespace) {
        module = store._modulesNamespaceMap[`${namespace}/`]
        statesArray = states
    } else {
        statesArray = namespace
    }
    console.log('store._modulesNamespaceMap[namespace]')
    console.log(store)
    console.log(store._modulesNamespaceMap['user/'])
    const obj: any = {}
    statesArray.forEach((key) => {
        obj[key] = computed(() => module.state[key])
    })
    console.log(obj)
    return obj
}