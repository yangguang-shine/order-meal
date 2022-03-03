export default function getOrderTypeTitle(orderStatus: number, businessType: number) : string {
    if (orderStatus === 10) {
        return '待接单';
    } else if (orderStatus === 20) {
        return '已接单';
    } else if (orderStatus === 30) {
        if (businessType === 2) {
            return '已送出';
        } else if (businessType === 3) {
            return '待自提';
        }
        return '';
    } else if (orderStatus === 40) {
        if (businessType === 2) {
            return '已送达';
        } else if (businessType === 3) {
            return '已自提';
        }
        return '';
    } else if (orderStatus === 50) {
        return '已取消';
    }
    return '';
}