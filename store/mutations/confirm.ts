import { MutationI, StateI } from "@/interface/index";

function setTakeOutTime(state:StateI, takeOutTime: string) {
    state.takeOutTime = takeOutTime;
};
function setNoteInputFlag(state:StateI, noteInputFlag: boolean) {
    state.noteInputFlag = noteInputFlag;
};
function setNoteText(state:StateI, noteText: string) {
    state.noteText = noteText;
};

export default {
    setTakeOutTime,
    setNoteInputFlag,
    setNoteText,
};
