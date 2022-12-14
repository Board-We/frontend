import React from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { boardState } from "../../../../store";
import { formattingDateObject } from "../../../../utils/setDefaultDay";

const ModalContents = () => {
  const board = useRecoilValue(boardState);
  const nagivate = useNavigate();

  const goToMyBoard = () => {
    nagivate("board/onWaitOpen");
  };

  return (
    <Container>
      <h1>🎉 보드가 완성되었어요! 🎉</h1>
      <p style={{ textAlign: "left", marginBottom: "0.3rem" }}>
        친구에게 알려주기
      </p>
      <BoardLinkBox>
        <BoardLinkUrlText>
          <p>www.어쩌구저쩌구</p>
        </BoardLinkUrlText>
        <BoardLinkCopyButton>공유</BoardLinkCopyButton>
      </BoardLinkBox>

      <DescriptionContainer>
        <CommonParagraph>롤링페이퍼 받는 기간</CommonParagraph>{" "}
        <BoardValue>{formattingDateObject(board.openStartTime)}</BoardValue>
      </DescriptionContainer>
      <DescriptionContainer>
        <CommonParagraph>롤링페이퍼 확인 기간</CommonParagraph>{" "}
        <BoardValue>{formattingDateObject(board.openEndTime)}</BoardValue>
      </DescriptionContainer>
      <DescriptionContainer>
        <CommonParagraph>비밀번호</CommonParagraph>{" "}
        <BoardValue>{board.password}</BoardValue>
      </DescriptionContainer>
      <GoToMyBoardButton onClick={goToMyBoard}>
        만든 보드 확인하기
      </GoToMyBoardButton>
    </Container>
  );
};

export default ModalContents;

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  h1 {
    font-size: 1.2rem;
  }
`;
const BoardLinkBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 2.7rem;
  margin-bottom: 0.4rem;
  margin-top: 0.4rem;
`;

const BoardLinkUrlText = styled.div`
  display: flex;
  align-items: center;
  width: 75%;
  height: inherit;
  background-color: #eff3f4;
  border: none;
  padding: 0rem 0.5rem 0rem 0.5rem;
  border-radius: 0.5rem;
`;

const BoardLinkCopyButton = styled.button`
  display: flex;
  width: 20%;
  justify-content: center;
  align-items: center;
  background-color: #fdc62e;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  height: inherit;
  border-radius: 0.5rem;
`;

const CommonParagraph = styled.p`
  text-align: left;
  margin-top: 0.7rem;
  margin-bottom: 0.5rem;
  color: #757879;
`;

const BoardValue = styled(CommonParagraph)`
  color: black;
`;

const DescriptionContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const GoToMyBoardButton = styled.button`
  height: 12vw;
  border-radius: 12px;
  font-size: 1.2rem;
  background-color: #fdc62e;
  border: none;
`;
