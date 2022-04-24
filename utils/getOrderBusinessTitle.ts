export default function getOrderBusinessTitle(businessType: number): string {
    const businessTitleList = ['堂食', '外卖', '自提']
    return businessTitleList[businessType - 1]
}