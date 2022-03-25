import fetch from '@/utils/fetch'
import { shopImgPath } from '@/config/index'
import { ActionI,ActionsContextI, OriginShopInfoI,ShopInfoI } from "@/interface/index";

async function getRecommandShopList ({ commit, state }: ActionsContextI, params = {}) {
    let data: OriginShopInfoI[] = await fetch('user/shop/list', {
        businessType: 2,
        type: state.selectedTabItem.type,
        latitude: state.defaultAddress.latitude,
        longitude: state.defaultAddress.longitude,
    });
    const recommandShopList : ShopInfoI[]= (data || []).map((item: OriginShopInfoI): ShopInfoI => ({
        ...item,
        minusList: JSON.parse(item.minus),
        fullImgPath: `${shopImgPath}/${item.imgUrl}`,
    }));
    // recommandShopList.push(...recommandShopList.concat(recommandShopList).concat(recommandShopList).concat(recommandShopList).concat(recommandShopList));
    // recommandShopList.push(...recommandShopList.concat(recommandShopList).concat(recommandShopList).concat(recommandShopList).concat(recommandShopList))
    commit('setRecommandShopList', recommandShopList)
    return recommandShopList || []
}
export default { getRecommandShopList } as ActionI