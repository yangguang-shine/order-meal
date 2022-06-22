import address, { AddressStateI } from "./address";
import home, { HomeStateI } from "./home";
import menu, { MenuStateI } from "./menu";
import confirm, { StateConfirmI } from "./confirm";
import order, { OrderStateI } from "./order";
import center, { CenterStateI } from "./center";
import shop, { ShopStateI } from "./shop";
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
