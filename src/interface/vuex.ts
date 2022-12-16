import { AddressStateI } from "../delete/store/state/address";
import { HomeStateI } from "../delete/store/state/home";
import { MenuStateI } from "../delete/store/state/menu";
import { StateConfirmI } from "../delete/store/state/confirm";
import { OrderStateI } from "../delete/store/state/order";
import { CenterStateI } from "../delete/store/state/center";
import { ConfirmGetterI } from '../delete/store/getters/confirm'
import { MenuGetterI } from '../delete/store/getters/menu'
import { ShopStateI } from "../delete/store/state/shop";
export type StateI = AddressStateI & HomeStateI & MenuStateI & StateConfirmI & OrderStateI & CenterStateI & ShopStateI;
export type GetterStateI = ConfirmGetterI & MenuGetterI;
export interface MutationI {
    [index: string]: (state: StateI, payload?: any) => any;
}
export interface CommitI {
    (action: string, payload?: any): any;
}
export interface ActionContextI {
    commit: CommitI;
    state: StateI;
    getters: GetterStateI;
}
export interface ActionI {
    [index: string]: (store: ActionContextI, payload?: any) => any;
}
export interface GetterI {
    [index: string]: (state: StateI, getter: GetterStateI) => any;
}
export type ComputedStateI<T> = { value: T };
export type ComputedGetterI<T> = { value: T };
export type ComputedMutationI<T = void> = (payload: T) => void;
export type ComputedActionI<T = void, U = any> = (payload: T) => U;
