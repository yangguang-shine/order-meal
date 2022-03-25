import { AddressStateI } from "@/store/state/address";
import { HomeStateI } from "@/store/state/home";
import { MenuStateI } from "@/store/state/menu";
import { ConfirmStateI } from "@/store/state/confirm";
import { orderStateI } from "@/store/state/order";
export type StateI = AddressStateI & HomeStateI & MenuStateI & ConfirmStateI & orderStateI;

export interface MutationI {
    [index: string]: (state: StateI, payload?: any) => any;
}

export interface CommitI {
    (action: string, payload?: any): any
}

export interface ActionsContextI {
    commit: CommitI,
    state: StateI,
    getters:any;
}




export interface ActionI {
    [index: string]: (
        store: ActionsContextI,
        payload?: any
    ) => any;
}

export interface GetterI {
    [index: string]: (state: StateI, getter: any) => any;
}

