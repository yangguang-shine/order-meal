import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import confirmState , { ConfirmStateI } from './state'
import confirmAction, { ConfirmActionI} from './actions'
export * from './state'
export * from './actions'
// interface AddressStoreI {
//     confirmState: ConfirmStateI,
// }
export type ConfirmStoreI = {
    confirmState: ConfirmStateI
} & ConfirmActionI

export const useConfirmStore = defineStore("confirm", () => {
    return { confirmState, ...confirmAction } as ConfirmStoreI;
});
