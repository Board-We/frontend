// api 연결 작업용 임시 데이터
export const searchResultsData = {
  content: [
    {
      boardLink: "/board/bc57b0d3-259f-4f4e-b54f-c73d87cb4da4/welcome",
      boardName: "내 생일을 축하해줘",
      boardTags: ["생일", "파티"],
      boardViews: 419,
      theme: {
        boardBackgroundType: "IMAGE", // or "COLOR"
        boardBackground: "/file-server/sadkfajlswc11231", // or "FFFFFF"
        boardFont: "Batang",
        memoThemes: [
          {
            memoThemeId: 12,
            memoBackgroundType: "IMAGE",
            memoBackground: "/file-server/sadkfajlswc11231",
            memoTextColor: "#000000",
          },
          {
            memoThemeId: 13,
            memoBackgroundType: "IMAGE",
            memoBackground: "/file-server/sadkfajlswc11231",
            memoTextColor: "#000000",
          },
          {
            memoThemeId: 14,
            memoBackgroundType: "COLOR",
            memoBackground: "FF12F4",
            memoTextColor: "#000000",
          },
        ],
      },
    },
    {
      boardLink: "/board/bc57b0d3-259f-4f4e-b54f-c73d87cb4da4/welcome",
      boardName: "내 트리를 꾸며줘",
      boardTags: ["크리스마스", "파티"],
      boardViews: 55,
      theme: {
        boardBackgroundType: "COLOR",
        boardBackground: "FFFFFF",
        boardFont: "Batang",
        memoThemes: [
          {
            memoThemeId: 15,
            memoBackgroundType: "IMAGE",
            memoBackground: "/file-server/sadkfajlswc11231",
            memoTextColor: "#000000",
          },
          {
            memoThemeId: 16,
            memoBackgroundType: "COLOR",
            memoBackground: "FF12F4",
            memoTextColor: "#000000",
          },
        ],
      },
    },
  ],
  pageable: {
    sort: {
      sorted: false,
      unsorted: true,
      empty: true,
    },
    offset: 0,
    pageSize: 20,
    pageNumber: 0,
    paged: true,
    unpaged: false,
  },
  last: true, // 마지막 페이지 여부
  totalPages: 1, // 전체 페이지가 1개
  totalElements: 13, // 모든 요소가 13개
  size: 20, // 한 페이지에서 보여줄 요소의 개수
  number: 0,
  sort: {
    sorted: false,
    unsorted: true,
    empty: true,
  },
  numberOfElements: 13,
  first: true, // 첫 페이지 여부
  empty: false, // 리스트가 비어 있는지 여부
};

export const reccomendBoardsData = [
  {
    boardLink: "/board/bc57b0d3-259f-4f4e-b54f-c73d87cb4da4/welcome",
    boardName: "내 생일을 축하해줘",
    boardTags: ["생일", "파티"],
    boardViews: 419,
    theme: {
      boardBackgroundType: "IMAGE", // or "COLOR"
      boardBackground: "/file-server/sadkfajlswc11231", // or "#FFFFFF"
      boardFont: "Batang",
      memoThemes: [
        {
          memoThemeId: 12,
          memoBackgroundType: "IMAGE",
          memoBackground: "/file-server/sadkfajlswc11231",
          memoTextColor: "#000000",
        },
        {
          memoThemeId: 13,
          memoBackgroundType: "IMAGE",
          memoBackground: "/file-server/sadkfajlswc11231",
          memoTextColor: "#000000",
        },
        {
          memoThemeId: 14,
          memoBackgroundType: "COLOR",
          memoBackground: "#FF12F4",
          memoTextColor: "#000000",
        },
      ],
    },
  },
  {
    boardLink: "/board/bc57b0d3-259f-4f4e-b54f-c73d12cb4da4/welcome",
    boardName: "내 트리를 꾸며줘",
    boardTags: ["크리스마스", "파티"],
    boardViews: 55,
    theme: {
      boardBackgroundType: "COLOR",
      boardBackground: "#FFFFFF",
      boardFont: "Gulim",
      memoThemes: [
        {
          memoThemeId: 18,
          memoBackgroundType: "IMAGE",
          memoBackground: "/file-server/sadkfajlswc11231",
          memoTextColor: "#000000",
        },
        {
          memoThemeId: 19,
          memoBackgroundType: "COLOR",
          memoBackground: "#FF12F4",
          memoTextColor: "#000000",
        },
      ],
    },
  },
];
