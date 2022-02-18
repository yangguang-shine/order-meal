
interface ITabItem {
    title: string,
    type: string
}
const tabList: ITabItem[] = [
    {
        title: '综合排序',
        type: 'comprehensive'
    },
    {
        title: '销量最高',
        type: 'sale'
    },
    {
        title: '距离最近',
        type: 'distance'
    }
]
interface IState {
    tabList: ITabItem[],
    selectTabItem: ITabItem,
}
const state: IState = {
    tabList,
    selectTabItem: tabList[0],
}
export default state