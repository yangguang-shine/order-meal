import address, { AddressStateI } from "./address";
import home, { HomeStateI } from "./home";
import menu, { MenuStateI } from "./menu";
import confirm, { ConfirmStateI } from "./confirm";
import order, { orderStateI } from "./order";
import { StateI } from "@/interface/index";

const state: StateI = {
    ...address,
    ...home,
    ...menu,
    ...confirm,
    ...order,
};
export default state;
