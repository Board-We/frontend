import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import ChipButton from "../../../components/buttons/chipButton";
import { boardState } from "../../../store";
import BoardBackground from "../components/boardBackground";
import Buttons from "../components/buttons";

const BoardOnWrite = () => {
  const [board, setBoard] = useRecoilState(boardState);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(new Date());
  });

  const onClickMMP = () => {
    getMemoInfo(board.id);
    navigate("/memo/making");
  };

  const getMemoInfo = (boardId) => {
    const newBoard = {
      ...board,
      memoBackground: [
        "https://cdn1.vectorstock.com/i/1000x1000/56/85/yellow-memo-stick-concept-background-realistic-vector-17735685.jpg",
        "https://www.nicepng.com/png/detail/936-9366484_klik-op-bestand-voor-vergroting-memoblaadje-png.png",
        "https://thebusinesscommunication.com/wp-content/uploads/2019/11/Advantages-and-Disadvantages-of-Memo-in-Business.jpg",
      ],
      memoColors: ["red", "blue", "yellow"],
    };
    setBoard(newBoard);
  };

  return (
    <PageWrapper>
      <BoardBackground boardInfo={board} />
      <Buttons>
        <ChipButton
          width={"550px"}
          onClick={onClickMMP}
          style={{ left: 0, right: 0, margin: "0 auto" }}
        >
          롤링페이퍼 남기기
        </ChipButton>
      </Buttons>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

export default BoardOnWrite;
