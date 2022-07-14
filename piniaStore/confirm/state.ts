import { TabItemI, ShopItemI, initShopItem } from "@/interface/index";
import { ref, reactive } from "vue";

export interface ConfirmStateI {
    takeOutTime: string,
    noteText: string,
    noteInputFlag: boolean,
    selfTakeTime: string
}
 const confirmState: ConfirmStateI = reactive({
    takeOutTime: '00:00',
    noteText: '',
    noteInputFlag: false,
    selfTakeTime: '00:00'
})

export default confirmState

