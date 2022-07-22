import fetch from '@/utils/fetch'
import confirmState from './state'
import { MenuGetterG, MenuStoreI, useMenuStore } from '../menu';
import addressState from '../address/state';
import {storeToRefs} from 'pinia'

function setTakeOutTime(takeOutTime: string) {
    confirmState.takeOutTime = takeOutTime;
};
function setNoteInputFlag(noteInputFlag: boolean) {
    confirmState.noteInputFlag = noteInputFlag;
};
function setNoteText(noteText: string) {
    confirmState.noteText = noteText;
};

async function submitOrder (payload: any = {}) {
    const menuStore: MenuStoreI = useMenuStore()
    const { cartPriceInfo, orderFoodList }: MenuGetterG = storeToRefs(menuStore)
    await fetch('order/submit', {
        foodList: orderFoodList.value,
        shopID: menuStore.menuState.shopInfo.shopID,
        payPrice: cartPriceInfo.value.payPrice,
        businessType: menuStore.menuState.businessType,
        minusPrice: cartPriceInfo.value.minusPrice,
        allPackPrice: cartPriceInfo.value.allPackPrice || 0,
        deliverPrice: menuStore.menuState.shopInfo.deliverPrice || 0,
        orderOriginAmount: cartPriceInfo.value.orderOriginAmount,
        noteText: confirmState.noteText,
        takeOutTime: confirmState.takeOutTime,
        address: JSON.stringify(addressState.defaultAddress),
        reservePhone: addressState.defaultAddress.mobile,
        selfTakeTime: confirmState.selfTakeTime,
        ...payload
    })
}

export interface ConfirmActionI {
    setTakeOutTime: (takeOutTime: string) => void,
    setNoteInputFlag: (noteInputFlag: boolean) => void,
    setNoteText: (noteText: string) => void,
    submitOrder: (payload?: any) => void,
}

const confirmAction: ConfirmActionI = {
    setTakeOutTime,
    setNoteInputFlag,
    setNoteText,
    submitOrder,
}
export default confirmAction


