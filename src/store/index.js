import { atom } from "recoil";
import { theme } from "../../src/styles/theme";
const basicThemeBG = require(`../assets/images/basicThemeBG.png`)
const basicThemeMemo1 = require(`../assets/images/basicThemeMemo1.png`)
const basicThemeMemo2 = require(`../assets/images/basicThemeMemo2.png`)
const basicThemeMemo3 = require(`../assets/images/basicThemeMemo3.png`)

export const boardState = atom({
  key: "boardState",
  default: {
    id: null,
    name: "",
    description: "",
    tags: [],
    writingStartTime: new Date(),
    writingEndTime: new Date(new Date().getTime() + 1209600000),
    openStartTime: new Date(new Date().getTime() + 1209600000),
    openEndTime: new Date(new Date().getTime() + 2419200000),
    password: "",
    openType: "", // "PUBLIC" or "PRIVATE"
    boardThemeId: null,
    boardBackground: basicThemeBG, // "Base-64" or "#FFFFFF"
    boardFont: "san-serif",
    memos: [],
    memoThemes: [
      {
        memoThemeId: null,
        memoBackgroundType: "IMAGE",
        memoBackground: basicThemeMemo1,
        memoTextColor: theme.colors.black
      },
      {
        memoThemeId: null,
        memoBackgroundType: "IMAGE",
        memoBackground: basicThemeMemo2,
        memoTextColor: theme.colors.black
      },
      {
        memoThemeId: null,
        memoBackgroundType: "IMAGE",
        memoBackground: basicThemeMemo3,
        memoTextColor: theme.colors.black
      },
    ],
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
  default: 0,
});

export const deviceScreenState = atom({
  key: "deviceScreenState",
  default: {
    x: 0,
    y: 0,
    rem: `16px`,
  },
});
