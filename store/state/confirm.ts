

export interface ConfirmStateI {
    takeOutTime: string,
    noteText: string,
    noteInputFlag: boolean,

}
 const state: ConfirmStateI = {
    takeOutTime: '00:00',
    noteText: '',
    noteInputFlag: false
}
export default state