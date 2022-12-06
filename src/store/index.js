import { atom } from "recoil";
import {
  setDefaultAttachableDay,
  setDefaultOpenDay,
} from "../utils/setDefaultDay";

export const boardState = atom({
  key: "boardState",
  default: {
    id: "1",
    name: "boardName",
    description: "boardDescription",
    tags: ["tag1", "tag2", "tag3"],
    attachableTerm: {
      start: setDefaultAttachableDay(true),
      end: setDefaultAttachableDay(false),
    },
    openTerm: {
      start: setDefaultOpenDay(true),
      end: setDefaultOpenDay(false),
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
