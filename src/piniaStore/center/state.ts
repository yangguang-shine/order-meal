import { TabItemI, ShopItemI, initShopItem } from "@/interface/index";
import { ref, reactive } from "vue";

import { initUserInfo, UserInfoI } from "@/interface/center"
import { RefI } from "@/interface/vueInterface";


export interface CenterStateI {
    userInfo: UserInfoI

}
export type CenterStateG = {
    [T in keyof CenterStateI]: RefI<CenterStateI[T]>
}
 const centerState: CenterStateI = reactive({
    userInfo: initUserInfo,
})

export default centerState

