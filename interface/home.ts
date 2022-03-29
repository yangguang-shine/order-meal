export interface TabItemI {
    title: string,
    type: string,
}

export interface OriginShopItemI {
    address: any,
    businessTypes: string,
    description: string,
    endTime: string,
    imgUrl: string,
    latitude: string,
    longitude: string,
    location: string,
    mainColor: string,
    manageID: number,
    minus: string,
    shopID: number,
    shopName: string,
    startTime: string,
}

export interface minusItemI {
    reach: number,
    reduce: number
}
export interface ShopItemI extends OriginShopItemI {
    minusList: minusItemI[],
    fullImgPath: string,
}


