import fetch from "@/utils/fetch";
import getShopMinusList from "../../../utils/getShopMinusList";
import { shopImgPath } from "@/config/index";

import { OriginShopInfoI, ShopInfoI, minusItemI } from "@/interface/index";
const getRecommandShopList = async ({ commit, state }, params = {}) => {
    let recommandShopList: OriginShopInfoI[] | ShopInfoI[] = await fetch("user/shop/list", {
        businessType: 2,
        type: state.selectTabItem,
        latitude: state.defaultAddress.latitude,
        longitude: state.defaultAddress.longitude,
    });

    //     address: "西直门凯德茂地铁站"
    // businessTypes: "[\"2\",\"3\"]"
    // description: "哈哈"
    // endTime: "18:00"
    // imgUrl: "479350342606189.png"
    // latitude: "100"
    // location: "嘻嘻"
    // longitude: "100"
    // mainColor: "#e49c9c"
    // manageID: 100000020
    // minus: "[{\"reach\":20,\"reduce\":2},{\"reach\":40,\"reduce\":5}]"
    // shopID: 100030
    // shopName: "店铺od1111"
    // startTime: "09:00"

    recommandShopList = (recommandShopList || []).map((item) => ({
        ...item,
        minusList: JSON.parse(item.minus),
        fullImgPath: `${shopImgPath}/${item.imgUrl}`,
    }));
    // recommandShopList.push(...recommandShopList.concat(recommandShopList).concat(recommandShopList).concat(recommandShopList).concat(recommandShopList));
    // recommandShopList.push(...recommandShopList.concat(recommandShopList).concat(recommandShopList).concat(recommandShopList).concat(recommandShopList))
    commit("setRecommandShopList", recommandShopList);
    return recommandShopList || [];
};
export default { getRecommandShopList };
