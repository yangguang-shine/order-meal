import { shopImgPath } from "@/config/index";
import { OriginShopItemI, ShopItemI } from "@/interface/home";
import fetch from "@/utils/fetch";
import getBusinessTypeInfo from "@/utils/getBusinessTypeInfo";
import menuState from "../../state";
async function getShopInfo(payload: { shopID: number }): Promise<ShopItemI> {
    const originShopInfo: OriginShopItemI = await fetch("shop/find", payload);
    const shopInfo: ShopItemI = {
        ...originShopInfo,
        minusList: JSON.parse(originShopInfo.minus),
        fullImgPath: `${shopImgPath}/${originShopInfo.imgUrl}`,
        ...getBusinessTypeInfo(originShopInfo.businessTypes),
    };
    menuState.shopInfo = shopInfo;
    return shopInfo;
}

export interface SimpleFetchActionI {
    getShopInfo: (payload: { shopID: number }) => Promise<ShopItemI>
}
const simpleFetchAction: SimpleFetchActionI= {
    getShopInfo
}
export default simpleFetchAction
