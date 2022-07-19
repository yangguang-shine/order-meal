import { FoodItemI, ComputedGetterI } from "@/interface/index";
import { computed } from "vue";
import menuState from "../state";


const orderFoodList: ComputedGetterI<FoodItemI[]> = computed((): FoodItemI[] => {
    const orderFoodList = menuState.cartCategoryList.reduce((list: any[], item) => {
        return [...list, ...item.foodList];
    }, []);
    return orderFoodList;
});

const footerAndMinusPX: ComputedGetterI<number> = computed(() => {
    return menuState.footerPX + menuState.topBarPX
})
export interface SimpleGetterI {
    orderFoodList: ComputedGetterI<FoodItemI[]>;
    footerAndMinusPX: ComputedGetterI<number>
}
const simple: SimpleGetterI = {
    orderFoodList,
    footerAndMinusPX
};

export default simple;
