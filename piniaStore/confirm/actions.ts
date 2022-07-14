import fetch from '@/utils/fetch'
import { ActionI, ActionContextI, GetterStateI, OriginUserInfoI, UserInfoI, ComputedStateI, FoodItemI } from "@/interface/index";
import { getStorage, setStorage } from '@/utils/tool';
import confirmState from './state'
import menuState from '../menu/state';
import { MenuStoreI, useMenuStore } from '../menu';
import homeState from '../home/state';
import addressState from '../address/state';
import {storeToRefs} from 'pinia'
import { CartPriceInfoI } from '../getters/menu';
interface CartPriceInfoGetterF {
    cartPriceInfo: ComputedStateI<CartPriceInfoI>,
    orderFoodList: ComputedStateI<FoodItemI[]>
}
function setTakeOutTime(takeOutTime: string) {
    confirmState.takeOutTime = takeOutTime;
};
function setNoteInputFlag(noteInputFlag: boolean) {
    confirmState.noteInputFlag = noteInputFlag;
};
function setNoteText(noteText: string) {
    confirmState.noteText = noteText;
};

async function submitOrder (payload?: any = {}) {
    const menuStore: MenuStoreI = useMenuStore()
    // 不需要进行响应式
    const { cartPriceInfo, orderFoodList }: CartPriceInfoGetterF = storeToRefs(menuStore)
    console.log(
        {
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
            ...payload
        }
    )
    // return
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


