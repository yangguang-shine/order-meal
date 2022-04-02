export interface OriginUserInfoI {
    nickname: string;
    headimgurl: string;
    phone: string;

}
export interface UserInfoI extends OriginUserInfoI {
    userImg: string
}

export const initUserInfo: UserInfoI = {
    nickname: '',
    headimgurl: '',
    phone: '',
    userImg: ''
}
