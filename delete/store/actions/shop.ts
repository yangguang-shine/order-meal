import fetch from "@/utils/fetch";
import { shopImgPath } from "@/config/index";
import { ActionI, ActionContextI, OriginShopItemI, ShopItemI } from "@/interface/index";
import getBusinessTypeInfo from "@/utils/getBusinessTypeInfo";

async function getShopList(
    { commit, state }: ActionContextI,
    params: {
        businessType: number;
        type: string;
    }
) {
    let data: OriginShopItemI[] = await fetch("shop/list", {
        ...params,
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

export default { getShopList } as ActionI;
