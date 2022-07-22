import simple, { SimpleGetterI } from "./simple";
import minusPromotionsObject, { MinusPromotionsObjectI } from "./minusPromotionsObject";
import cartPriceInfo, { CartPriceInfoI } from "./cartPriceInfo";
import asideCategoryInfo, { AsideCategoryInfoI } from "./asideCategoryInfo";
import { RefI } from "@/interface/vueInterface";

export interface MenuGetterI extends SimpleGetterI {
    minusPromotionsObject: RefI<MinusPromotionsObjectI>;
    cartPriceInfo: RefI<CartPriceInfoI>;
    asideCategoryInfo: RefI<AsideCategoryInfoI>;
}
export type MenuGetterG = {
    [T in keyof MenuGetterI]: MenuGetterI[T];
};

const menuGetter: MenuGetterI = {
    minusPromotionsObject,
    cartPriceInfo,
    asideCategoryInfo,
    ...simple,
};

export default menuGetter;
