import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import ChipButton from "../../../components/buttons/chipButton";
import { boardState } from "../../../store";
import BoardBackground from "../components/boardBackground";
import Buttons from "../components/buttons";
import Timer from "../components/timer";

const BoardOnWaitOpen = () => {
  const board = useRecoilValue(boardState);
  const navigate = useNavigate();

  const onTimeOver = () => {
    navigate("/board/onopen");
  };

  const getTimer = () => {
    return (
      <Timer
        duedate={board.openStartTime}
        onTimeOver={onTimeOver}
        text="후에 확인할 수 있습니다."
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

export default BoardOnWaitOpen;
