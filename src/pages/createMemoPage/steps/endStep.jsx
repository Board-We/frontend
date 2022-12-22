import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import ChipButton from "../../../components/buttons/chipButton";
import Description from "../../../components/label/description";
import SmallTitle from "../../../components/label/smallTitle";
import Tag from "../../../components/label/tag";
import ServiceNameHeader from "../../../components/layout/headers/serviceNameHeader";
import { boardState, memoStyleState } from "../../../store";
import {
  formattingDateObject,
  setDefaultOpenDay,
} from "../../../utils/setDefaultDay";
import MemoTextArea from "../components/memoTextArea";

const EndStep = () => {
  const board = useRecoilValue(boardState);
  const memo = useRecoilValue(memoStyleState);
  const navigate = useNavigate();
  const [timer, setTimer] = useState(3);

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
        <SmallTitle>롤링페이퍼가 작성되었어요! 🎉</SmallTitle>
        <Description size={"medium"}>
          {formattingDateObject(board.openStartTime)}에 공개됩니다.
        </Description>
        <EndStepImage />
      </BodyContainer>
      <Alertcontainer>
        {/* <ChipButton flat fit color={"black"} background={"#E8E8E8"} text={"인기보드 보기"} onClick={onClickTopBoard}></ChipButton> */}
        {/* <ChipButton flat fit text={"롤링페이퍼 더 붙이기"} onClick={onClickMoreMemo} /> */}
        <ChipButton
          flat
          width={"80%"}
          text={"롤링페이퍼 더 붙이기"}
          onClick={onClickMoreMemo}
        />
        <ChipButton
          flat
          backgroundGrey={true}
          width={"80%"}
          text={"공유하기"}
          onClick={() => {}}
        />
      </Alertcontainer>
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

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -10%;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto auto;
`;

const EndStepImage = styled.div`
  width: 20rem;
  height: 20rem;
  background-color: #d9d9d9;
`;

const Alertcontainer = styled.div`
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 1.5rem 0;
`;

export default EndStep;
