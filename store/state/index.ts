import address, { StateAddressI } from "./address";
import home, { StateHomeI } from "./home";
import menu, { StateMenuI } from "./menu";
import confirm, { StateConfirmI } from "./confirm";
import order, { StateOrderI } from "./order";
import { StateI } from "@/interface/index";

const state: StateI = {
    ...address,
    ...home,
    ...menu,
    ...confirm,
    ...order,
};
export default state;
