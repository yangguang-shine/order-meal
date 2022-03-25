import { MutationI, StateI } from "@/interface/index";

function setTakeOutTime(state:StateI, payload) {
    state.takeOutTime = payload;
};
function setNoteInputFlag(state:StateI, payload) {
    state.noteInputFlag = payload;
};
function setNoteText(state:StateI, payload) {
    state.noteText = payload;
};

export default {
    setTakeOutTime,
    setNoteInputFlag,
    setNoteText,
} as MutationI;
