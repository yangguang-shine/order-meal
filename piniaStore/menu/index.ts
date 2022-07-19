import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import menuState, { MenuStateI } from "./state";
import meunAction, { MenuActionI } from "./actions";
import menuGetter, { MenuGetterI } from "./getter";
import setAction, { SetActionI } from "./setAction";
// interface AddressStoreI {
//     menuState: MenuStateI,
// }
export type MenuStoreI = {
    menuState: MenuStateI;
} & MenuActionI &
    MenuGetterI & SetActionI

export const useMenuStore = defineStore("menu", () => {
    return { menuState, ...meunAction, ...menuGetter, ...setAction } as MenuStoreI;
});
