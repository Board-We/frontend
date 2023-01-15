import { request } from ".";

export const postUserBoardState = async ({ boardState }) => {
  const res = await request({
    method: "POST",
    url: "/board",
    data: boardState,
  });
  return res.data.boardLink;
};

export const requestBoard = async (boardCode) => {
  const res = await request({ method: "GET", url: `/board/${boardCode}` });
  if (res.status === 200) return res.data;
  return null;
};

export const requestReccomendBoardList = async () => {
  const res = await request({ method: "GET", url: "/boards/recommend" });
  return res.data;
};

export const requestSearchBoard = async ({ query, page = 0, size = 10 }) => {
  const res = await request({
    method: "GET",
    url: `/board/search?query=${query}&page=${page}&size=${size}`,
  });
  return res.data.content;
};

export const requestHotBoardList = async () => {
  const res = await request({ method: "GET", url: "/boards/hot" });
  return res.data;
};

export const requestDeleteBoard = async ({ boardCode, password }) => {
  const res = await request({
    method: "DELETE",
    url: `/board/${boardCode}/delete`,
    data: { password },
  });
  if (res.status === 200) return true;
  return false;
};

export const requestLoginBoard = async ({ password, boardCode }) => {
  const res = await request({
    method: "POST",
    url: `/board/login`,
    data: { password, boardCode },
  });
  if (res.status === 200) return true;
  return res.data;
};
