import { atom } from "recoil";

export const boardState = atom({
  key: "boardState",
  default: {
    id: "1",
    name: "boardName",
    description: "boardDescription",
    tags: [],
    attachableTerm: {
      start: undefined,
      end: undefined,
    },
    openTerm: {
      start: undefined,
      end: undefined,
    },
    password: undefined,
    privateMode: false,
    background: "#AB2323",
    font: "san-serif",
    memoTypes: [],
    memoColors: ["white", "grey", "red", "blue", "yellow"],
  },
});

export const memoState = atom({
    key: "memoState",
    default: {
        text: "",
        background: null,
    }
})

export const createBoardStepId = atom({
  key: "createBoardStepId",
  default: 0,
});
