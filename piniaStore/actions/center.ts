import fetch from '@/utils/fetch'
import { ActionI, ActionContextI, GetterStateI, OriginUserInfoI, UserInfoI } from "@/interface/index";
import { getStorage, setStorage } from '@/utils/tool';

async function getUserInfo ({state, getters, commit}: ActionContextI, payload: any) {
    const originUserInfo: OriginUserInfoI = await fetch('account/getUserInfo')
    const userInfo: UserInfoI = {
        ...originUserInfo,
        userImg: originUserInfo.headimgurl
    }
    commit('setUserInfo', userInfo)
}

async function changeUserInfo ({state, getters, commit}: ActionContextI, payload: any) {
     await fetch('account/changeUserInfo', payload)
}
async function logout ({state, getters, commit}: ActionContextI, payload: any) {
    await fetch('account/logout', payload)
    setStorage("userToken", null)
}
export default {
    getUserInfo,
    changeUserInfo,
    logout
}as ActionI