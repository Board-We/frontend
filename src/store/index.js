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
        writingEndTime: new Date(new Date().getTime() + 10000),
        openStartTime: new Date(new Date().getTime() + 100),
        openEndTime: new Date(new Date().getTime() + 10000),
        password: undefined,
        privateMode: false,
        background:
            "https://w.namu.la/s/0d9ec42cc9c1007454e7c91cebf3d5126b3b5486efa6085223c744dfc053cef11a715a85ccfc19e8c008f9d2949b5304fc90704d8d94e319beb39471561ec89f37ff80705192dd92dc4dbf8997b754df08e61688928fc1243527ca8822a6a564",
        font: "san-serif",
        memoTypes: [],
        memoColors: ["white", "grey", "red", "blue", "yellow"],
        memos: [
            {
                "memoThemeId": 13,
                "memoContent": "안녕! 생일 축하해~~"
            },
            {
                "memoThemeId": 12,
                "memoContent": "행복해야해"
            },
            {
                "memoThemeId": 13,
                "memoContent": "반가워"
            },
            {
                "memoThemeId": 13,
                "memoContent": "안녕! 생일 축하해~~"
            },
            {
                "memoThemeId": 12,
                "memoContent": "행복해야해"
            },
            {
                "memoThemeId": 13,
                "memoContent": "반가워"
            },
            {
                "memoThemeId": 13,
                "memoContent": "안녕! 생일 축하해~~"
            },
            {
                "memoThemeId": 12,
                "memoContent": "행복해야해"
            },
            {
                "memoThemeId": 13,
                "memoContent": "반가워"
            },
        ]
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
