import fetch from '@/utils/fetch'
import { shopImgPath } from '@/config/index'
import { ActionI } from "@/interface/index";

const getRecommandShopList : ActionI= async ({ commit, state }, params = {}) => {
    const recommandShopList: any = await fetch('user/shop/list', {
        businessType: 2,
        type: state.selectTabItem,
        latitude: state.defaultAddress.latitude,
        longitude: state.defaultAddress.longitude,
    });
    (recommandShopList || []).forEach((item) => {
        item.minusList = JSON.parse(item.minus);
        item.fullImgPath = `${shopImgPath}/${item.imgUrl}`
    });
    // recommandShopList.push(...recommandShopList.concat(recommandShopList).concat(recommandShopList).concat(recommandShopList).concat(recommandShopList));
    // recommandShopList.push(...recommandShopList.concat(recommandShopList).concat(recommandShopList).concat(recommandShopList).concat(recommandShopList))
    commit('setRecommandShopList', recommandShopList)
    return recommandShopList || []
}
export default { getRecommandShopList }