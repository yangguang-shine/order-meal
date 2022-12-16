import { CategoryItemI } from "@/interface/menu";
import { selectQuery, systemInfo } from "@/utils/";
import menuState from "@/piniaStore/menu/state";
import { setCategoryIDAside, setCategoryIDMain, setSelectedCategoryID } from "../setSimpleAction";

export type HandleFoodCategoryListScrollI = (params: { type?: "vertical" | "horizontal"; currentInstance: any }) => Promise<void>;
const handleFoodCategoryListScroll: HandleFoodCategoryListScrollI = async function ({ type = "vertical", currentInstance }) {
    setSelectedCategoryID;
    const categoryList = menuState.categoryList;
    // const { setSelectedCategoryID, setCategoryIDMain, setCategoryIDAside} = menuStore
    for (let i = 0; i < categoryList.length; i++) {
        const categoryItem: CategoryItemI = categoryList[i];
        const categoryItemPositionInfo = await selectQuery(`#${categoryItem.categoryIDMain}`, currentInstance);
        if (type === "vertical") {
            if (menuState.topBarPX <= categoryItemPositionInfo.top + 1 || categoryItemPositionInfo.bottom - 1 > menuState.topBarPX) {
                setSelectedCategoryID(categoryItem.categoryID);
                setCategoryIDMain("");
                setCategoryIDAside(categoryItem.categoryIDAside);
                await handleLazyImg({
                    index: i,
                    currentInstance,
                    type
                });
                break;
            }
        } else if (type === "horizontal") {
            const topBarAndAsideBarPX = menuState.topBarPX + menuState.asideBarHorizontalPX;
            if (topBarAndAsideBarPX <= categoryItemPositionInfo.top + 1 || categoryItemPositionInfo.bottom - 1 > topBarAndAsideBarPX) {
                setSelectedCategoryID(categoryItem.categoryID);
                setCategoryIDMain("");
                setCategoryIDAside(categoryItem.categoryIDAside);
                await handleLazyImg({
                    index: i,
                    currentInstance,
                    type,
                });
                break;
            }
        }
    }
};
export default handleFoodCategoryListScroll;
interface handleLazyImgParamI {
    index: number;
    currentInstance: any;
    type: "vertical" | "horizontal";
}
export async function handleLazyImg({ index, currentInstance, type }: handleLazyImgParamI) {
    const categoryList = menuState.categoryList;

    const categoryItem: CategoryItemI = categoryList[index];
    let lastCategoryFlag: boolean = true;
    for (let i = 0; i < categoryItem.foodList.length; i++) {
        const foodItem = categoryItem.foodList[i];
        let imgCurrentInstance;
        if (type === 'vertical') {
            imgCurrentInstance = menuState.foodItemVerticalImgMap[`${foodItem.foodID}`];
        } else if (type === 'horizontal') {
            imgCurrentInstance = menuState.foodItemHorizontalImgMap[`${foodItem.foodID}`];
        }
        const imgPositionInfo = await selectQuery(`#${type}-${foodItem.foodID}`, imgCurrentInstance);
        if (imgPositionInfo.top > systemInfo.windowHeight) {
            lastCategoryFlag = false;
            break;
        }
        if ((0 <= imgPositionInfo.top && imgPositionInfo.top <= systemInfo.windowHeight) || (0 <= imgPositionInfo.bottom && imgPositionInfo.bottom < systemInfo.windowHeight)) {
            foodItem.currentImg = foodItem.fullImgPath;
        }
    }
    if (lastCategoryFlag && index + 1 < categoryList.length) {
        await handleLazyImg({
            index: index + 1,
            currentInstance,
            type,
        });
    }
}
