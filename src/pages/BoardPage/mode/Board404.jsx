import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ChipButton from "../../../components/buttons/chipButton";
import SmallTitle from "../../../components/label/smallTitle";

const Board404 = () => {
  const navigate = useNavigate();

  const handleClickNewBoard = () => {
    navigate("/board/new");
  };

  const handleClickExplore = () => {
    navigate("/");
  };

  return (
    <PageWrapper>
      <BodyContainer>
        <TextContainer>
          <SmallTitle>삭제되었거나 존재하지 않는 보드입니다.</SmallTitle>
        </TextContainer>
        <OnEndImage />
      </BodyContainer>
      <ButtonContainer>
        <ChipButton
          width="100%"
          onClick={handleClickNewBoard}
          style={{ color: "black" }}
        >
          새 보드 만들기
        </ChipButton>
        <ChipButton
          width="100%"
          onClick={handleClickExplore}
          style={{ backgroundColor: "grey_50", color: "black" }}
        >
          다른 보드 탐색하기
        </ChipButton>
      </ButtonContainer>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`;

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  margin: auto auto;
`;

const OnEndImage = styled.img`
  width: 75vw;
  height: 75vw;
  max-width: 400px;
  max-height: 400px;
  background-color: #d9d9d9;
`;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem;
  gap: 0.5rem;
`;
export default Board404;
