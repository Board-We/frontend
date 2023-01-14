import { request } from ".";

export const requestGetMemoList = async ({ boardCode }) => {
  const res = await request({
    method: "GET",
    url: `/board/${boardCode}/memos`,
  });
  if (res.status === 200) return res.data;
  return false;
};

export const requestGetMemoThemeList = async ({ boardCode }) => {
  const res = await request({
    method: "GET",
    url: `/board/${boardCode}/memo-themes`,
  });
  if (res.status === 200) return res.data;
  return false;
};

export const requestCreateMemo = async ({
  boardCode,
  memoContent,
  memoThemeId,
}) => {
  const res = await request({
    method: "POST",
    url: `/board/${boardCode}/memo`,
    data: { memoContent, memoThemeId },
  });
  if (res.status === 200) return true;
  return false;
};

export const requestDeleteMemo = async ({ boardCode, memoIds }) => {
  const res = await request({
    method: "POST",
    url: `/board/${boardCode}/memo/delete`,
    data: { memoIds },
  });

  if (res.status === 200) return true;
  return false;
};

export const requestSearchMemo = async ({ boardCode, query }) => {
  console.log(query);
  const res = await request({
    method: "GET",
    url: `/board/${boardCode}/memo/search?query=${query}`,
  });
  console.log(res);
  return res.data;
};
