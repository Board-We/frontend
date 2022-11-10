import { atom } from "recoil";

export const boardState = atom({
    key: "boardState",
    default: {
        name: "boardName",
        description: "boardDescription"
    }
})