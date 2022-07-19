export interface SimpleI {
    selectedCategoryID: number;
    categoryIDMain: string;
    categoryIDAside: string;
    topBarInfo: string;
    businessType: number;
    // 凑单
    requiredCategoryIDList: number[],
}



const simpleDefault: SimpleI = {
    selectedCategoryID: 0,
    categoryIDMain: "",
    categoryIDAside: "",
    topBarInfo: "点餐",
    businessType: 2,
    requiredCategoryIDList: [],
}

const simple: SimpleI = simpleDefault

export default simple
