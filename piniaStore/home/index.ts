import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import homeState , { HomeStateI } from './state'
import homeAction, { HomeActionI} from './actions'
export * from './state'
export * from './actions'
// interface AddressStoreI {
//     homeState: HomeStateI,
// }
export type HomeStoreI = {
    homeState: HomeStateI
} & HomeActionI

export const useHomeStore = defineStore("home", () => {
    return { homeState, ...homeAction, }
});
