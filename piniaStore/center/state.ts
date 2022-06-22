import { TabItemI, ShopItemI, initShopItem } from "@/interface/index";
import { ref, reactive } from "vue";

import { initUserInfo, UserInfoI } from "@/interface/center"


export interface CenterStateI {
    userInfo: UserInfoI

}
 const centerState: CenterStateI = reactive({
    userInfo: initUserInfo,
})

export default centerState

