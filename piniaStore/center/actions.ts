import centerState from "./state";
import fetch from '@/utils/fetch'
import { ActionI, ActionContextI, GetterStateI, OriginUserInfoI, UserInfoI } from "@/interface/index";
import { getStorage, setStorage } from '@/utils/tool';
export interface ChangeUserInfoParamsI {
    key: string,
    value: string
}
async function getUserInfo () {
    const originUserInfo: OriginUserInfoI = await fetch('account/getUserInfo')
    const userInfo: UserInfoI = {
        ...originUserInfo,
        userImg: originUserInfo.headimgurl
    }
    centerState.userInfo = userInfo
}
async function changeUserInfo ( payload: ChangeUserInfoParamsI) {
     await fetch('account/changeUserInfo', payload)
}
async function logout () {
    await fetch('account/logout')
    setStorage("userToken", null)
}

function setUserInfo(userInfo: UserInfoI): void {
    centerState.userInfo = userInfo;
}

export interface CenterActionI {
    getUserInfo: () => void,
    changeUserInfo: (params: ChangeUserInfoParamsI) => void,
    logout: () => void,
    setUserInfo: (userInfo: UserInfoI) => void
}

const centerAction: CenterActionI = {
    getUserInfo,
    changeUserInfo,
    logout,
    setUserInfo,
}
export default centerAction


