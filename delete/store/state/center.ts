import { initUserInfo, UserInfoI } from "@/interface/center"


export interface CenterStateI {
    userInfo: UserInfoI

}
 const state: CenterStateI = {
    userInfo: initUserInfo,
}
export default state