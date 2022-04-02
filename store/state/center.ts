import { initUserInfo, UserInfoI } from "@/interface/center"


export interface StateCenterI {
    userInfo: UserInfoI

}
 const state: StateCenterI = {
    userInfo: initUserInfo,
}
export default state