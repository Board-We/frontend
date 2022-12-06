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
        background: "https://w.namu.la/s/0d9ec42cc9c1007454e7c91cebf3d5126b3b5486efa6085223c744dfc053cef11a715a85ccfc19e8c008f9d2949b5304fc90704d8d94e319beb39471561ec89f37ff80705192dd92dc4dbf8997b754df08e61688928fc1243527ca8822a6a564",
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
