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
<<<<<<< HEAD
  key: "memoState",
  default: {
    text: "",
    background: "black",
  },
});
=======
    key: "memoState",
    default: {
        text: "",
        style: {
            textColor: "black",
            background: "white"
        }
    }
})
>>>>>>> 573d5623a7b7c3b512b3e5746d876c57902f4bda

export const createBoardStepId = atom({
  key: "createBoardStepId",
  default: 1,
});
