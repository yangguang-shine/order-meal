import { defineStore } from "pinia";
import { ref, reactive } from "vue";
import menuState, { MenuStateI } from "./state";
import meunAction, {MenuActionI} from "./action";
import menuGetter, { MenuGetterI } from "./getter";
// interface AddressStoreI {
//     menuState: MenuStateI,
// }
export type MenuStoreI = {
    menuState: MenuStateI;
} & MenuGetterI & MenuActionI

export const useMenuStore = defineStore("menu", () => {
    const store: MenuStoreI = { menuState, ...meunAction, ...menuGetter }
    return  store ;
});
