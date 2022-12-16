export interface SimpleI {
    selectedCategoryID: number;
    categoryIDMain: string;
    categoryIDAside: string;
    topBarInfo: string;
    businessType: number;
    // 凑单
    requiredCategoryIDList: number[],
    footerInfoCurrentInstance: any
}



const simpleDefault: SimpleI = {
    selectedCategoryID: 0,
    categoryIDMain: "",
    categoryIDAside: "",
    topBarInfo: "点餐",
    businessType: 2,
    requiredCategoryIDList: [],
    footerInfoCurrentInstance: {}
}

const simple: SimpleI = simpleDefault

export default simple
