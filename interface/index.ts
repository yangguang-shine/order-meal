export interface ShopInfoI {

}
export interface MutationI {
    (state: any, payload: any): any
}


export interface ActionI {
    (store: {
        commit: any,
        state: any,
        getters: any
    }, payload: any): any
}
export interface getterI {
    (state: any, getter: any): any
}