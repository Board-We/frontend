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
    writingStartTime: new Date(new Date().getTime() + 100),
    writingEndTime: new Date(new Date().setDate(new Date().getDate() + 7)),
    openStartTime: new Date(new Date().setDate(new Date().getDate() + 7)),
    openEndTime: new Date(new Date().setDate(new Date().getDate() + 14)),
    password: undefined,
    openType: "", // PUBLIC OR PRIVATE
    background:
      "https://dimg.donga.com/wps/NEWS/IMAGE/2022/12/03/116825963.2.jpg",

    boardThemeId: "",

    theme: {
      boardBackgroundImage:
        "https://dimg.donga.com/wps/NEWS/IMAGE/2022/12/03/116825963.2.jpg",
      boardBackgroundImageName: "test.jpg",
      boardBackgroundColor: "",
      boardFont: "",

      // 논의 필요
      memoImageTextColorSets: [],
      memoBackgroundTextColorSets: [],
    },
    memoTypes: [],
    memoColors: ["white", "grey", "red", "blue", "yellow"],
    memos: [
      {
        memoThemeId: 13,
        memoContent: "안녕! 생일 축하해~~",
      },
      {
        memoThemeId: 12,
        memoContent: "행복해야해",
      },
      {
        memoThemeId: 13,
        memoContent: "반가워",
      },
      {
        memoThemeId: 13,
        memoContent: "안녕! 생일 축하해~~",
      },
      {
        memoThemeId: 12,
        memoContent: "행복해야해",
      },
      {
        memoThemeId: 13,
        memoContent: "반가워",
      },
      {
        memoThemeId: 13,
        memoContent: "안녕! 생일 축하해~~",
      },
      {
        memoThemeId: 12,
        memoContent: "행복해야해",
      },
      {
        memoThemeId: 13,
        memoContent: "반가워",
      },
    ],
  },
});

export const memoStyleState = atom({
  key: "memoStyleState",
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
