

export interface MenuStateI {
    cartCategoryList: any[],
    categoryList: any[],
    orderCategoryList: any[],
    categoryTabId: string,
    scrollIntoCategoryTabID: '',
    topBarInfo: string,
    shopInfoFlag: boolean,
    cartDetailFlag: boolean,
    foodDetailFalg: boolean,
    foodInfo: any
}

const state:MenuStateI = {
    cartCategoryList: [],
    categoryList: [],
    orderCategoryList: [],
    categoryTabId: 'null',
    scrollIntoCategoryTabID: '',
    topBarInfo: '点餐',
    shopInfoFlag: false,
    cartDetailFlag: false,
    foodDetailFalg: false,
    foodInfo: {}
}
export default state