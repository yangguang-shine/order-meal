interface minusInfo {
    reach: number,
    reduce: number,
    random: number,
};

export default (minus: string): minusInfo[] => {
    if (!minus) return [];
    const minusSplit: string[] = minus.split(',')
    const minusList : minusInfo[] = minusSplit.map((item) => {
        const splitMinus: string[] = item.split('-')
        return {
            reach: Number(splitMinus[0]),
            reduce: Number(splitMinus[1]),
            random: Math.random()
        }
    })
    return minusList
}