import fetch from '@/utils/fetch'
import { shopImgPath } from '@/config/index'
import { ActionI,ActionContextI, OriginShopItemI,ShopItemI } from "@/interface/index";

async function getRecommandShopList ({ commit, state }: ActionContextI, params = {}) {
    let data: OriginShopItemI[] = await fetch('user/shop/list', {
        businessType: 2,
        type: state.selectedTabItem.type,
        latitude: state.defaultAddress.latitude,
        longitude: state.defaultAddress.longitude,
    });
    const recommandShopList : ShopItemI[]= (data || []).map((item: OriginShopItemI): ShopItemI => ({
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