import { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { getReccomendBoardsList } from "../../../../api/boardsApi";
import BoardSlider from "./BoardSlider";

const mockData = [
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

const ReccomendBoardSlide = ({ reccomendBoardsList }) => {
  const [reccomendBoards, setReccomendBoards] = useState(mockData);

  const getReccomendBoardsData = useCallback(async () => {
    const data = await getReccomendBoardsList();
    if (data) setReccomendBoards(data);
  }, []);

  useEffect(() => {
    getReccomendBoardsData();
  }, [getReccomendBoardsData]);

  return (
    <ReccomendBoardSlideContainer>
      <ReccomendBoardSlideHeader>
        <p>인기 보드 추천</p>
        <p>공개한 보드는 랜덤으로 추천됩니다!</p>
      </ReccomendBoardSlideHeader>
      <ReccomendBoardSlideBody>
        <BoardSlider reccomendBoards={reccomendBoards} />
      </ReccomendBoardSlideBody>
    </ReccomendBoardSlideContainer>
  );
};

export default ReccomendBoardSlide;

const ReccomendBoardSlideContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
  margin-top: 5.5rem;
`;

const ReccomendBoardSlideHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 1rem;

  p:first-child {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;
  }

  p:last-child {
    font-size: 0.8rem;
    margin: 0;
    margin-top: 0.2rem;
    color: #4e4e4e;
  }
`;

const ReccomendBoardSlideBody = styled.div`
  width: 100%;
  height: 100%;
`;
