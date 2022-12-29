import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import ChipButton from "../../../components/buttons/chipButton";
import Description from "../../../components/label/description";
import SmallTitle from "../../../components/label/smallTitle";
import ServiceNameHeader from "../../../components/layout/headers/serviceNameHeader";
import { boardState } from "../../../store";
import { formattingDateObject } from "../../../utils/setDefaultDay";

const EndStep = () => {
  const board = useRecoilValue(boardState);
  const navigate = useNavigate();

  useEffect(() => {
    setTimerForFlip();
  }, []);

  const setTimerForFlip = () => {};

  const onClickMoreMemo = () => {
    navigate("/board/onWrite");
  };

  return (
    <PageWrapper>
      <ServiceNameHeader />
      <BodyContainer>
        <TextContainer>
          <SmallTitle>롤링페이퍼가 작성되었어요! 🎉</SmallTitle>
          <Description size={"medium"}>
            {formattingDateObject(board.openStartTime)}에 공개됩니다.
          </Description>
        </TextContainer>
        <EndStepImage />
      </BodyContainer>
      <ButtonContainer>
        <ChipButton width={"80%"} onClick={onClickMoreMemo}>
          롤링페이퍼 더 붙이기
        </ChipButton>
        <ChipButton width={"80%"} onClick={() => {}}>
          공유하기
        </ChipButton>
      </ButtonContainer>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
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

const EndStepImage = styled.div`
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
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 1.5rem 0;
`;

export default EndStep;
