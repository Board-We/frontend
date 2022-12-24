import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { boardState } from "../../../../store";
import { formattingDateObject } from "../../../../utils/setDefaultDay";
import Toast from "./components/toast";

const ModalContents = ({ boardURL }) => {
  const board = useRecoilValue(boardState);
  const [openToast, setOpenToast] = useState(false);

  const handleCopyUrlLink = () => {
    setOpenToast(true);
    // to do : 실제 URL 복사
    setTimeout(() => {
      setOpenToast(false);
    }, 3000);
  };

  return (
    <Container>
      <h1>🎉 보드가 완성되었어요! 🎉</h1>
      <p style={{ textAlign: "left", marginBottom: "0.3rem" }}>
        친구에게 알려주기
      </p>
      <BoardLinkBox>
        <BoardLinkUrlText>
          <p>{boardURL && boardURL}</p>
        </BoardLinkUrlText>
        <BoardLinkCopyButton onClick={handleCopyUrlLink}>
          공유
        </BoardLinkCopyButton>
      </BoardLinkBox>

      <DescriptionContainer>
        <CommonParagraph>롤링페이퍼 받는 기간</CommonParagraph>{" "}
        <BoardValue>
          {formattingDateObject(board.openStartTime)} 부터
        </BoardValue>
      </DescriptionContainer>
      <DescriptionContainer>
        <CommonParagraph>롤링페이퍼 확인 기간</CommonParagraph>{" "}
        <BoardValue>{formattingDateObject(board.openEndTime)} 까지</BoardValue>
      </DescriptionContainer>
      <DescriptionContainer>
        <CommonParagraph>비밀번호</CommonParagraph>{" "}
        <BoardValue>{board.password}</BoardValue>
      </DescriptionContainer>
      <GoToMyBoardButton>
        <Link to="/board/onWaitOpen" target="_blank" rel="noopener noreferrer">
          만든 보드 확인하기
        </Link>
      </GoToMyBoardButton>
      {openToast && <Toast text={"URL이 복사되었습니다."} />}
    </Container>
  );
};

export default ModalContents;

const Container = styled.div`
  position: relative;
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

const CommonParagraph = styled.p`
  text-align: left;
  margin-top: 0.7rem;
  margin-bottom: 0.25rem;
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
  background-color: ${(props) => props.theme.colors.primary};
  border: none;
  margin-top: 1.5rem;
  a {
    text-decoration: none;
    color: ${(props) => props.theme.colors.black};
  }
`;
