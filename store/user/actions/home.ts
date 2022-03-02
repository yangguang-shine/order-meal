import fetch from '../../../utils/fetch'
import getShopMinusList from '../../../utils/getShopMinusList'
const getRecommandShopList = async ({ commit, state }, params = {}) => {
    const recommandShopList: any[] = await fetch('user/shop/list', {
        businessType: 2,
        type: state.selectTabItem,
        latitude: state.defaultAddress.latitude,
        longitude: state.defaultAddress.longitude,
    });
    (recommandShopList || []).forEach((item) => {
        item.minusList = getShopMinusList(item.minus || "");
    });
    recommandShopList.push(...recommandShopList.concat(recommandShopList).concat(recommandShopList).concat(recommandShopList).concat(recommandShopList));
    recommandShopList.push(...recommandShopList.concat(recommandShopList).concat(recommandShopList).concat(recommandShopList).concat(recommandShopList))
    commit('setRecommandShopList', recommandShopList)
    return recommandShopList || []
}
export default { getRecommandShopList }