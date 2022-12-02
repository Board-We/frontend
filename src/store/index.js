import { atom } from "recoil";

export const boardState = atom({
    key: "boardState",
    default: {
        id: "1",
        name: "boardName",
        description: "boardDescription",
        tags: ["tag1", "tag2", "tag3"],
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
        background: "https://upload.wikimedia.org/wikipedia/commons/0/0f/IU_posing_for_Marie_Claire_Korea_March_2022_issue_03.jpg",
        font: "san-serif",
        memoTypes: [],
        memoColors: ["white", "grey", "red", "blue", "yellow"],
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
    style: {
      textColor: "black",
      background: "white",
    },
  },
});

export const createBoardStepId = atom({
  key: "createBoardStepId",
  default: 1,
});

export const setDateStepId = atom({
  key: "setDateStepId",
  default: 1,
});
