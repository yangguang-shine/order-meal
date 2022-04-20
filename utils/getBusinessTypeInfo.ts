export default function getBusinessTypeInfo(businessTypes: string): {
    businessTitleList: string[];
    businessTypeList: number[];
} {
    let businessTitleList: string[] = [];
    let businessTypeList: number[] = [];
    try {
        businessTypeList = JSON.parse(businessTypes).map((item: string): number => {
            const type = Number(item);
            console.log(type);
            if (type === 1) {
                businessTitleList.push("堂食");
            } else if (type === 2) {
                businessTitleList.push("外卖");
            } else if (type === 3) {
                businessTitleList.push("自提");
            }
            return type;
        });
    } catch (e) {
        console.log(e);
    } finally {
        return {
            businessTitleList,
            businessTypeList,
        };
    }
}
