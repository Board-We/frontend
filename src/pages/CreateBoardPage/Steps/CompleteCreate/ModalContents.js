import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import ChipButton from "../../../../components/buttons/chipButton";
import { boardState } from "../../../../store";
import { formattingDateObject } from "../../../../utils/setDefaultDay";
import Toast from "./components/toast";

const ModalContents = ({ boardURL }) => {
  const navigate = useNavigate();
  const board = useRecoilValue(boardState);
  const [openToast, setOpenToast] = useState(false);
  const handleCopyUrlLink = async (text) => {
    setOpenToast(true);
    await navigator.clipboard.writeText(text);

    setTimeout(() => {
      setOpenToast(false);
    }, 3000);
  };

  return (
    <ContentContainer>
      <h1>🎉 보드가 완성되었어요! 🎉</h1>
      <ContentBody>
        <span style={{ textAlign: "left", margin: 0 }}>친구에게 알려주기</span>
        <BoardLinkBox>
          <BoardLinkUrlText>
            <p style={{ margin: 0 }}>{boardURL && boardURL}</p>
          </BoardLinkUrlText>
          <BoardLinkCopyButton
            onClick={() => {
              handleCopyUrlLink(boardURL);
            }}
          >
            공유
          </BoardLinkCopyButton>
        </BoardLinkBox>
        <>
          <DescriptionContainer>
            <CommonParagraph>롤링페이퍼 받는 기간</CommonParagraph>{" "}
            <BoardValue>
              <span>{formattingDateObject(board.writingStartTime)} 부터</span>
              <span>{formattingDateObject(board.writingEndTime)} 까지</span>
            </BoardValue>
          </DescriptionContainer>
          <DescriptionContainer>
            <CommonParagraph>롤링페이퍼 확인 기간</CommonParagraph>{" "}
            <BoardValue>
              <span>{formattingDateObject(board.openStartTime)} 부터</span>
              <span>{formattingDateObject(board.openEndTime)} 까지</span>
            </BoardValue>
          </DescriptionContainer>
          <DescriptionContainer>
            <CommonParagraph>비밀번호</CommonParagraph>{" "}
            <BoardValue>{board.password}</BoardValue>
          </DescriptionContainer>
        </>
      </ContentBody>
      <ChipButton onClick={() => navigate(`${boardURL}`)}>
        만든 보드 확인하기
      </ChipButton>
      {openToast && <Toast text={"URL이 복사되었습니다."} />}
    </ContentContainer>
  );
};

export default ModalContents;

const ContentContainer = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  h1 {
    font-size: 1.2rem;
  }
`;

const ContentBody = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2.5rem;
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
  padding: 0.75rem;
  border-radius: 0.5rem;
`;

const BoardLinkCopyButton = styled.button`
  display: flex;
  width: 20%;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.colors.primary_2};
  border: none;
  padding: 0.75rem;
  font-size: 1rem;
  cursor: pointer;
  height: inherit;
  border-radius: 0.5rem;
`;

const CommonParagraph = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 0.9rem;
  text-align: left;
  margin: 0.5rem 0;
  color: #757879;
`;

const BoardValue = styled(CommonParagraph)`
  color: black;
  margin-left: 1rem;
  justify-content: flex-end;
`;

const DescriptionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
