import React from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import ChipButton from "../../components/buttons/chipButton";
import { boardState } from "../../store";

const BoardOnMessagingPage = () => {
  const board = useRecoilValue(boardState);

  const onClickChipButton = () => {
    console.log("onClickChipButton");
  };

  return (
    <PageWrapper>
      <BoardContainer url={board.background}>
        <BoardTitleText>{board.name}</BoardTitleText>
        <BoardDescriptionText>{board.description}</BoardDescriptionText>
      </BoardContainer>
      <PageFooter>
        <ChipButton
          onClick={onClickChipButton}
          text={"롤링 페이퍼 남기기"}
          flat
        />
      </PageFooter>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BoardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 12rem;
  background: ${(props) => (props.url ? `url(${props.url})` : "#ffffffff")};
`;

const BoardTitleText = styled.span`
  font-size: 2rem;
`;

const BoardDescriptionText = styled.span`
  font-size: 1rem;
`;

const PageFooter = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 10%;
  background-color: #dddddd;
`;

export default BoardOnMessagingPage;
