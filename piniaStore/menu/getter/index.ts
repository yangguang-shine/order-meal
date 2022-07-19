import simple, { SimpleGetterI} from './simple'
import minusPromotionsObject, { MinusPromotionsObjectI } from './minusPromotionsObject'
import cartPriceInfo, { CartPriceInfoI } from './cartPriceInfo'
import asideCategoryInfo, { AsideCategoryInfoI } from './asideCategoryInfo'
import { ComputedGetterI } from '@/interface/vuex';
import { FoodItemI } from '@/interface/menu';

export interface MenuGetterI extends SimpleGetterI{
    minusPromotionsObject: ComputedGetterI<MinusPromotionsObjectI>;
    cartPriceInfo: ComputedGetterI<CartPriceInfoI>;
    asideCategoryInfo: ComputedGetterI<AsideCategoryInfoI>;
}

const menuGetter: MenuGetterI = {
    minusPromotionsObject,
    cartPriceInfo,
    asideCategoryInfo,
    ...simple,
};

export default menuGetter;