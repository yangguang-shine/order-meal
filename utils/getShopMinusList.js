export default (minus) => {
    let minusList = []
    if (!minus) return [];
    const minusSplit = minus.split(',')            
    minusList = minusSplit.map((item) => {
        const splitMinus = item.split('-')
        return {
            reach: Number(splitMinus[0]),
            reduce: Number(splitMinus[1]),
			random: Math.random()
        }
    })
    return minusList
}