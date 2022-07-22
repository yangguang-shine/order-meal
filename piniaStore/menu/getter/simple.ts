import { FoodItemI } from "@/interface/index";
import { RefI } from "@/interface/vueInterface";
import { computed } from "vue";
import menuState from "../state";


const orderFoodList: RefI<FoodItemI[]> = computed((): FoodItemI[] => {
    const orderFoodList = menuState.cartCategoryList.reduce((list: any[], item) => {
        return [...list, ...item.foodList];
    }, []);
    return orderFoodList;
});

const footerAndMinusPX: RefI<number> = computed(() => {
    return menuState.footerPX + menuState.minusPX
})
export interface SimpleGetterI {
    orderFoodList: RefI<FoodItemI[]>;
    footerAndMinusPX: RefI<number>
}
const simple: SimpleGetterI = {
    orderFoodList,
    footerAndMinusPX
};

export default simple;
