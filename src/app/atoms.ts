import { atom } from "recoil";

export const talkPreviewActiveModalState = atom({
  key: "talkPreviewActiveModalState",
  default: -1,
});

export const reviewPreviewActiveModalState = atom({
  key: "reviewPreviewActiveModalState",
  default: -1,
});
