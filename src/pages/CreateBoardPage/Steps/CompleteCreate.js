import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import BoardCanvas from "../../../components/BoardCanvas";
import { boardState } from "../../../store";

const CompleteCreate = () => {
  const [board, setBoard] = useRecoilState(boardState);

  const mockTag = ["1", "2", "3"];
  return (
    <>
      <FinalStepDescription>보드가 완성되었어요!</FinalStepDescription>
      <div>
        <BoardCanvas color={board.background} />
        <BoardDescriptionContainer>
          <p>{board.name}</p>
          <TagContainer>
            {mockTag.map((item) => {
              return (
                <React.Fragment>
                  <TagSpan>{`#${item}`}</TagSpan>
                </React.Fragment>
              );
            })}
          </TagContainer>
        </BoardDescriptionContainer>
      </div>

      <CommonParagraph>친구한테 공유하기</CommonParagraph>
      <BoardLinkBox>
        <BoardLinkUrlText>
          <p>www.어쩌구저쩌구</p>
        </BoardLinkUrlText>
        <BoardLinkCopyButton>공유</BoardLinkCopyButton>
      </BoardLinkBox>

      <CommonParagraph>
        비밀번호 <CommonSpan>{board.password}</CommonSpan>
      </CommonParagraph>
      <CommonParagraph>
        롤링페이퍼 작성 기간{" "}
        <CommonSpan>
          2022-11-27(일) 21:00 부터 ~ 2022-11-30(수) 21:00 까지
        </CommonSpan>
      </CommonParagraph>
      <CommonSpan>00부터 롤링페이퍼를 확인하세요!</CommonSpan>
    </>
  );
};

export default CompleteCreate;

const FinalStepDescription = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.7rem;
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
  background-color: transparent;
  border: 1px solid #000000;
  padding: 0rem 0.5rem 0rem 0.5rem;
  border-radius: 0.5rem;
`;

const BoardLinkCopyButton = styled.button`
  display: flex;
  width: 20%;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: 1px solid #000000;
  font-size: 1.2rem;
  cursor: pointer;
  height: inherit;
  border-radius: 0.5rem;
`;

const BoardDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 32rem;
  left: 3rem;
  P {
    margin: 0 0 0.2rem 0;
    text-align: left;
    font-size: 2rem;
  }
`;

const TagSpan = styled.span`
  margin-right: 1.3rem;
  font-size: 1.4rem;
  text-align: left;
`;

const TagContainer = styled.div`
  display: flex;
`;

const CommonParagraph = styled.p`
  text-align: left;
  margin-top: 0.7rem;
  margin-bottom: 0.5rem;
`;
const CommonSpan = styled.span`
  text-align: left;
  color: #959595;
`;
