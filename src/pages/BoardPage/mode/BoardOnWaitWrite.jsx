import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import ChipButton from "../../../components/buttons/chipButton";
import { boardState } from "../../../store";
import BoardBackground from "../components/boardBackground";
import Buttons from "../components/buttons";
import Timer from "../components/timer";

const BoardOnWaitWrite = () => {
  const board = useRecoilValue(boardState);
  const navigate = useNavigate();

  const onTimeOver = () => {
    navigate("/board/onwrite");
  };

  const getTimer = () => {
    return (
      <Timer
        duedate={board.writingStartTime}
        onTimeOver={onTimeOver}
        text="후에 작성할 수 있습니다."
      />
    );
  };

  const onClickMakeBoard = () => {
    navigate("/board/new");
  };

  return (
    <PageWrapper>
      <BoardBackground
        boardInfo={board}
        centerContent={getTimer()}
      ></BoardBackground>
      <Buttons>
        <ChipButton onClick={onClickMakeBoard}>새 보드 만들기</ChipButton>
      </Buttons>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export default BoardOnWaitWrite;
