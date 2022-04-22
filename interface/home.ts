export interface TabItemI {
    title: string;
    type: string;
}

export interface OriginShopItemI {
    address: any;
    businessTypes: string;
    description: string;
    endTime: string;
    imgUrl: string;
    latitude: string;
    longitude: string;
    location: string;
    mainColor: string;
    manageID: number;
    minus: string;
    shopID: number;
    shopName: string;
    startTime: string;
    mode: 'vertical' | 'horizontal'; // ,
    deliverPrice: number,
    startDeliverPrice: number,

}

export interface minusItemI {
    reach: number;
    reduce: number;
}
export interface ShopItemI extends OriginShopItemI {
    minusList: minusItemI[];
    fullImgPath: string;
    businessTypeList: number[]
    businessTitleList: string[]
}

export const initShopItem: ShopItemI = {
    address: "",
    businessTypes: "[]",
    description: "",
    endTime: "00:00",
    imgUrl: "",
    latitude: "",
    location: "",
    longitude: "",
    mainColor: "",
    manageID: 0,
    minus: "[]",
    shopID: 0,
    shopName: "",
    startTime: "00:00",
    fullImgPath: "",
    minusList: [],
    mode: "vertical",
    businessTypeList: [],
    businessTitleList: [],
    deliverPrice: 0,
    startDeliverPrice: 0,
};
