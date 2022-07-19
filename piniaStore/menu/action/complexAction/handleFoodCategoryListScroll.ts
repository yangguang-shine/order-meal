import { CategoryItemI } from "@/interface/menu";
import { selectQuery, systemInfo } from "@/utils/";
import menuState from "@/piniaStore/menu/state";
import { setCategoryIDAside, setCategoryIDMain, setSelectedCategoryID } from "../setSimpleAction";

export type HandleFoodCategoryListScrollI = (type?: "vertical" | "horizontal") => Promise<void>;
const handleFoodCategoryListScroll: HandleFoodCategoryListScrollI = async function (type: "vertical" | "horizontal" = "vertical") {
    setSelectedCategoryID;
    const categoryList = menuState.categoryList;
    // const { setSelectedCategoryID, setCategoryIDMain, setCategoryIDAside} = menuStore
    for (let i = 0; i < categoryList.length; i++) {
        const categoryItem: CategoryItemI = categoryList[i];
        const categoryItemPositionInfo = await selectQuery(`#${categoryItem.categoryIDMain}`);
        if (type === "vertical") {
            if (menuState.topBarPX <= categoryItemPositionInfo.top + 1 || categoryItemPositionInfo.bottom - 1 > menuState.topBarPX) {
                setSelectedCategoryID(categoryItem.categoryID);
                setCategoryIDMain("");
                setCategoryIDAside(categoryItem.categoryIDAside);
                await handleLazyImg(i);
                break;
            }
        } else if (type === "horizontal") {
            const topBarAndAsideBarPX = menuState.topBarPX + menuState.asideBarHorizontalPX;
            if (topBarAndAsideBarPX <= categoryItemPositionInfo.top + 1 || categoryItemPositionInfo.bottom - 1 > topBarAndAsideBarPX) {
                setSelectedCategoryID(categoryItem.categoryID);
                setCategoryIDMain("");
                setCategoryIDAside(categoryItem.categoryIDAside);
                await handleLazyImg(i);
                break;
            }
        }
    }
};
export default handleFoodCategoryListScroll;

export async function handleLazyImg(index: number) {
    const categoryList = menuState.categoryList;

    const categoryItem: CategoryItemI = categoryList[index];
    let lastCategoryFlag: boolean = true;
    for (let i = 0; i < categoryItem.foodList.length; i++) {
        const foodItem = categoryItem.foodList[i];
        const imgPositionInfo = await selectQuery(`#img-${foodItem.foodID}`);
        if (imgPositionInfo.top > systemInfo.windowHeight) {
            lastCategoryFlag = false;
            break;
        }
        if ((0 <= imgPositionInfo.top && imgPositionInfo.top <= systemInfo.windowHeight) || (0 <= imgPositionInfo.bottom && imgPositionInfo.bottom < systemInfo.windowHeight)) {
            foodItem.currentImg = foodItem.fullImgPath;
        }
    }
    if (lastCategoryFlag && index + 1 < categoryList.length) {
        await handleLazyImg(index + 1);
    }
}

