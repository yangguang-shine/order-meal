import address, { StateAddressI } from "./address";
import home, { StateHomeI } from "./home";
import menu, { StateMenuI } from "./menu";
import confirm, { StateConfirmI } from "./confirm";
import order, { StateOrderI } from "./order";
import center, { StateCenterI } from "./center";
import shop, { StateShopI } from "./shop";
import { StateI } from "@/interface/index";

const state: StateI = {
    ...address,
    ...home,
    ...menu,
    ...confirm,
    ...order,
    ...center,
    ...shop,
};
export default state;
