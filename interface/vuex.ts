import { AddressStateI } from "@/store/state/address";
import { HomeStateI } from "@/store/state/home";
import { StateMenuI } from "@/store/state/menu";
import { StateConfirmI } from "@/store/state/confirm";
import { StateOrderI } from "@/store/state/order";
import { StateCenterI } from "@/store/state/center";
import { GetterStateConfirmI } from '@/store/getters/confirm'
import { GetterStateMenuI } from '@/store/getters/menu'
import { ShopStateI } from "@/store/state/shop";
export type StateI = AddressStateI & HomeStateI & StateMenuI & StateConfirmI & StateOrderI & StateCenterI & ShopStateI;
export type GetterStateI = GetterStateConfirmI & GetterStateMenuI;
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
