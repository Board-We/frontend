import { request } from ".";

export const createMemo = async ({ boardCode, memoContent, memoThemeId }) => {
  const res = await request({
    method: "POST",
    url: `/board/${boardCode}/memo`,
    data: { memoContent, memoThemeId },
  });
  if (res.status === 200) return true;
  return false;
};

export const deleteMemo = async ({ boardCode, memoIds }) => {
  const res = await request({
    method: "POST",
    url: `/board/${boardCode}/memo/delete`,
    data: { memoIds },
  });
  if (res.status === 200) return true;
  return false;
};

export const searchMemo = async ({ boardCode, query }) => {
  const res = await request({
    method: "GET",
    url: `/board/${boardCode}/memo/search?query=${query}}`,
  });
  return res.data;
};
