import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import centerState , { CenterStateI } from './state'
import centerAction, { CenterActionI} from './actions'
// interface AddressStoreI {
//     centerState: CenterStateI,
// }
export type CenterStoreI = {
    centerState: CenterStateI
} & CenterActionI

export const useCenterStore = defineStore("center", () => {
    return { centerState, ...centerAction } as CenterStoreI;
});
