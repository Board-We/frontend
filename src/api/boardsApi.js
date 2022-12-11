import { request } from ".";

export const getReccomendBoardsList = async () => {
  const res = await request({ method: "GET", url: "/boards/recommend" });
  return res.data;
};

export const getSearchBoardsResult = async ({ query, page = 1, size = 10 }) => {
  const res = await request({
    method: "GET",
    url: `/board/search?query=${query}&page=${page}&size=${size}`,
  });
  return res.data;
};
