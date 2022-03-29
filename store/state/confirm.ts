

export interface StateConfirmI {
    takeOutTime: string,
    noteText: string,
    noteInputFlag: boolean,

}
 const state: StateConfirmI = {
    takeOutTime: '00:00',
    noteText: '',
    noteInputFlag: false
}
export default state