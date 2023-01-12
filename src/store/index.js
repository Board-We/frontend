import { atom } from "recoil";
import { theme } from "../../src/styles/theme";

export const boardState = atom({
  key: "boardState",
  default: {
    id: "1",
    name: "boardName",
    description: "boardDescription",
    tags: ["tag1", "tag2", "tag3"],
    writingStartTime: new Date(),
    writingEndTime: new Date(new Date().getTime() + 1209600000),
    openStartTime: new Date(new Date().getTime() + 1209600000),
    openEndTime: new Date(new Date().getTime() + 2419200000),
    password: undefined,
    openType: "", // "PUBLIC" or "PRIVATE"
    boardThemeId: 0,
    boardBackground: theme.colors.defaultBoardBg, // "Base-64" or "#FFFFFF"
    boardFont: "san-serif",
    memos: [
      {
        memoThemeId: 0,
        memoContent: ""
      }
    ],
    memoThemes: [
      {
        memoThemeId: 0,
        memoBackgroundType: "IMAGE" || "COLOR",
        memoBackground: "",
        memoTextColor: "",
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
