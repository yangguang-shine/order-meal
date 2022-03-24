import fetch from '../../../utils/fetch'
import getShopMinusList from '../../../utils/getShopMinusList'
import { shopImgPath } from '@/config/index'

const getShopList = async ({ commit, state }, params = {}) => {
    const shopList: any[] = await fetch('manage/shop/list');
    (shopList || []).forEach((item) => {
        item.minusList = JSON.parse(item.minus);
        item.fullImgPath = `${shopImgPath}/${item.imgUrl}`
    });
    // recommandShopList.push(...recommandShopList.concat(recommandShopList).concat(recommandShopList).concat(recommandShopList).concat(recommandShopList));
    // recommandShopList.push(...recommandShopList.concat(recommandShopList).concat(recommandShopList).concat(recommandShopList).concat(recommandShopList))
    commit('saveShopList', shopList)
}
export default { getShopList }