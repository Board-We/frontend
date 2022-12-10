import { request } from ".";

export const getReccomendBoardsList = async () => {
  const res = await request({ method: "GET", url: "/boards/recommend" });
  return res.data;
};
