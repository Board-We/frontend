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
            end: undefined
        },
        openTerm: {
            start: undefined,
            end: undefined
        },
        password: undefined,
        privateMode: false,
        background: "#ffffff",
        font: 'san-serif',
        memoTypes: [],
        memoColors: ["white", "grey", "red", "blue", "yellow"]
    }
})

export const selectedMemoTypeState = atom({
    key: "selectedMemoTypeState",
    default: undefined
})

export const selectedMemoColorState = atom({
    key: "selectedMemoColorState",
    default: undefined
})