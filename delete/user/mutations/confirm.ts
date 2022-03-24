
const setTakeOutTime = (state, payload) => {
    state.takeOutTime = payload
}
const setNoteInputFlag = (state, payload) => {
    state.noteInputFlag = payload
}
const setNoteText = (state, payload) => {
    state.noteText = payload
}

export default {
    setTakeOutTime,
    setNoteInputFlag,
    setNoteText
}