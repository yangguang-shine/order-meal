import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import menuState , { MenuStateI } from './state'
import meunAction, { MenuActionI} from './actions'
import menuGetter, {MenuGetterI} from "./getter";
// interface AddressStoreI {
//     menuState: MenuStateI,
// }
export type MenuStoreI = {
    menuState: MenuStateI
} & MenuActionI & MenuGetterI

export const useMenuStore = defineStore("menu", () => {
    return { menuState, ...meunAction, ...menuGetter } as MenuStoreI;
});
