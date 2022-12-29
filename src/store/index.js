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
        memoThemeId: 13,
        memoContent:
          "재벌집 막내아들 엄마는 베리베리스트로베리\n오징어게임 상금은 로또1등상금하고 똑같다\n엔터 테스트 엔터 테스트트트트ㅡㅌ트트트트ㅡㅌ트ㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡㅡ",
      },
      {
        memoThemeId: 12,
        memoContent: "행복해야해",
      },
      {
        memoThemeId: 14,
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
        memoThemeId: 14,
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
        memoThemeId: 14,
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
        memoThemeId: 14,
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
        memoThemeId: 14,
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
        memoThemeId: 14,
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
        memoThemeId: 14,
        memoContent: "반가워",
      },
    ],
    memoThemes: [
      {
        memoThemeId: 12,
        memoBackgroundType: "IMAGE",
        memoBackground:
          "https://static5.depositphotos.com/1013245/484/i/950/depositphotos_4841490-stock-photo-yellow-memo-stick-paper-note.jpg",
        memoTextColor: "#000000",
      },
      {
        memoThemeId: 13,
        memoBackgroundType: "IMAGE",
        memoBackground:
          "https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80",
        memoTextColor: "#FFFFFF",
      },
      {
        memoThemeId: 14,
        memoBackgroundType: "COLOR",
        memoBackground: "#FF12F4",
        memoTextColor: "#000000",
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
