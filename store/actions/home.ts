import fetch from "@/utils/fetch";
import { shopImgPath } from "@/config/index";
import { ActionI, ActionContextI, OriginShopItemI, ShopItemI } from "@/interface/index";
import getBusinessTypeInfo from "@/utils/getBusinessTypeInfo";
export interface ShopListParamsI {
    type?: string,
    businessType?: number
}
async function getRecommandShopList({ commit, state }: ActionContextI, { type = "", businessType = 2 }: ShopListParamsI = {}) {
    let data: OriginShopItemI[] = await fetch("shop/list", {
        businessType,
        type,
        latitude: state.defaultAddress.latitude,
        longitude: state.defaultAddress.longitude,
    });
    const recommandShopList: ShopItemI[] = (data || []).map(
        (item: OriginShopItemI): ShopItemI => ({
            ...item,
            minusList: JSON.parse(item.minus),
            fullImgPath: `${shopImgPath}/${item.imgUrl}`,
            ...getBusinessTypeInfo(item.businessTypes),
        })
    );
    // recommandShopList.push(...recommandShopList.concat(recommandShopList).concat(recommandShopList).concat(recommandShopList).concat(recommandShopList));
    // recommandShopList.push(...recommandShopList.concat(recommandShopList).concat(recommandShopList).concat(recommandShopList).concat(recommandShopList))
    commit("setRecommandShopList", recommandShopList);
    return recommandShopList || [];
}

async function getShopList(
    { commit, state }: ActionContextI,
    { type = "", businessType = 2 }: ShopListParamsI = {}
) {
    let data: OriginShopItemI[] = await fetch("shop/list", {
        type,
        businessType,
        latitude: state.defaultAddress.latitude,
        longitude: state.defaultAddress.longitude,
    });
    const shopList: ShopItemI[] = (data || []).map(
        (item: OriginShopItemI): ShopItemI => ({
            ...item,
            minusList: JSON.parse(item.minus),
            fullImgPath: `${shopImgPath}/${item.imgUrl}`,
            ...getBusinessTypeInfo(item.businessTypes),
        })
    );
    // recommandShopList.push(...recommandShopList.concat(recommandShopList).concat(recommandShopList).concat(recommandShopList).concat(recommandShopList));
    // recommandShopList.push(...recommandShopList.concat(recommandShopList).concat(recommandShopList).concat(recommandShopList).concat(recommandShopList))
    commit("setShopList", shopList);
    return shopList || [];
}

async function getShopInfo({ state, commit }: ActionContextI, payload: { shopID: number }): Promise<ShopItemI> {
    const originShopInfo: OriginShopItemI = await fetch("shop/find", payload);
    const shopInfo: ShopItemI = {
        ...originShopInfo,
        minusList: JSON.parse(originShopInfo.minus),
        fullImgPath: `${shopImgPath}/${originShopInfo.imgUrl}`,
        ...getBusinessTypeInfo(originShopInfo.businessTypes),
    };
    commit("setShopInfo", shopInfo);
    return shopInfo;
}
export default { getRecommandShopList, getShopList, getShopInfo } as ActionI;
