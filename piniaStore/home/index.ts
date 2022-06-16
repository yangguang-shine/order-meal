import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import homeState , { HomeStateI } from './state'
import homeAction, { HomeActionI} from './actions'
// interface AddressStoreI {
//     homeState: HomeStateI,
// }
export type HomeStoreI = {
    homeState: HomeStateI
} & HomeActionI

export const useHomeStore = defineStore("address", () => {
    return { homeState, ...homeAction } as HomeStoreI;
});
