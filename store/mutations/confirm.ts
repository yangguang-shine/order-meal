import { MutationI } from "@/interface/index";

const setTakeOutTime: MutationI = (state, payload) => {
    state.takeOutTime = payload;
};
const setNoteInputFlag: MutationI = (state, payload) => {
    state.noteInputFlag = payload;
};
const setNoteText: MutationI = (state, payload) => {
    state.noteText = payload;
};

export default {
    setTakeOutTime,
    setNoteInputFlag,
    setNoteText,
};
