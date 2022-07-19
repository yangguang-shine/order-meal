import { ComputedGetterI } from "@/interface/index";
import { computed } from "vue";
import menuState from "../state";
import cartPriceInfo from './cartPriceInfo'
/**
 * @interface MinusPromotionsObjectI
 * @params show - 营销信息是否展示
 * @params contentList - 营销满减信息文案展示列表
 */
export interface MinusPromotionsObjectI {
    show: boolean;
    contentList: string[];
}

const minusPromotionsObject: ComputedGetterI<MinusPromotionsObjectI> = computed((): MinusPromotionsObjectI => {
    if ((menuState.shopInfo.minusList || []).length === 0 || menuState.cartCategoryList.length === 0) {
        return {
            show: false,
            contentList: [],
        };
    }
    if (cartPriceInfo.value.noReachFirst) {
        return {
            show: true,
            contentList: ["再买", `${Number((menuState.shopInfo.minusList[0].reach - cartPriceInfo.value.allOriginPrice).toFixed(2))}元`, ",可减", `${menuState.shopInfo.minusList[0].reduce}元`],
        };
    }
    if (!cartPriceInfo.value.minusIndex) {
        return {
            show: false,
            contentList: [],
        };
    }
    if (menuState.shopInfo.minusList.length === cartPriceInfo.value.minusIndex) {
        return {
            show: true,
            contentList: ["已减", `${menuState.shopInfo.minusList[cartPriceInfo.value.minusIndex - 1].reduce}`],
        };
    } else {
        return {
            show: true,
            contentList: ["已减", `${menuState.shopInfo.minusList[cartPriceInfo.value.minusIndex - 1].reduce}元`, `,再买`, `${Number((menuState.shopInfo.minusList[cartPriceInfo.value.minusIndex].reach - cartPriceInfo.value.allOriginPrice).toFixed(2))}元`, `可减`, `${menuState.shopInfo.minusList[cartPriceInfo.value.minusIndex].reduce}`],
        };
    }
});

export default minusPromotionsObject;
