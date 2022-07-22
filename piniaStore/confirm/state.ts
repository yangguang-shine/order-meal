import { TabItemI, ShopItemI, initShopItem } from "@/interface/index";
import { RefI } from "@/interface/vueInterface";
import { ref, reactive } from "vue";

export interface ConfirmStateI {
    takeOutTime: string,
    noteText: string,
    noteInputFlag: boolean,
    selfTakeTime: string
}
export type ConfirmStateG = {
    [T in keyof ConfirmStateI]: RefI<ConfirmStateI[T]>
}
 const confirmState: ConfirmStateI = reactive({
    takeOutTime: '00:00',
    noteText: '',
    noteInputFlag: false,
    selfTakeTime: '00:00'
})

export default confirmState

