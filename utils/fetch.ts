import router from "@/utils/router";
import { requestHost } from "@/config/index";
import { showModal, showLoading, showToast, hideLoading, hideToast } from "@/utils/index";

const fetch = (
    url: string,
    data: any = {},
    {
        AutoErrorFlag = true,
    }: {
        AutoErrorFlag?: boolean;
    } = {}
): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            const header: any = {};
            // #ifdef MP-WEIXIN
            const userToken: string = uni.getStorageSync("userToken");
            header["cookie"] = `userToken=${userToken}`;
            // #endif
            const response = await uni.request({
                url: url.startsWith("http") ? url : `${requestHost}/${url}`,
                data,
                header,
                method: "POST",
                timeout: 30000,
                withCredentials: true,
            });
            const responseData: any = response.data;
            const statusCode: number = response.statusCode;
            if (200 <= statusCode || statusCode <= 300) {
                const code: string = responseData.code;
                const data: any = responseData.data || {};
                const msg: string = responseData.msg;
                switch (code) {
                    case "000":
                        resolve(data);
                        break;
                    case "100":
                        hideLoading();
                        router.reLaunchTo({
                            name: "login",
                            query: {
                                roleName: "user",
                            },
                        });
                        reject(responseData);
                        break;
                    default:
                        if (AutoErrorFlag) {
                            hideLoading();
                            await showModal({
                                content: msg,
                            });
                        }
                        reject(responseData);
                        break;
                }
            } else {
                reject(response);
            }
        } catch (e) {
            console.log(e);
            uni.showToast({
                title: "网络错误，请稍候再试",
                icon: "none",
            });
            reject(e);
        }
    });
};

export default fetch;
