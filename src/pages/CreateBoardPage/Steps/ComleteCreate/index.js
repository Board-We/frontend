import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import SlideModal from "../../../../components/modals/slideModal";
import { boardState } from "../../../../store";
import ModalContents from "./ModalContents";

const CompleteCreate = () => {
  const board = useRecoilValue(boardState);
  const [modalOpen, setModalOpen] = useState(true);

  return (
    <>
      <BoardContainer background={board.theme}>
        <MemoContainer>
          <Memo1
            memoBackground={
              board.memoBackground[0] ? board.memoBackground[0] : "white"
            }
            fontColor={board.memoColors[0]}
          >
            <span>우리 내년에도 친하게 지내자</span>
          </Memo1>
          <Memo2
            memoBackground={
              board.memoBackground[1] ? board.memoBackground[1] : "white"
            }
            fontColor={board.memoColors[1]}
          >
            <span>마라탕 모임 언제 가나요^^</span>
          </Memo2>
          <Memo3
            memoBackground={
              board.memoBackground[2] ? board.memoBackground[2] : "white"
            }
            fontColor={board.memoColors[2]}
          >
            <span>크리스마스 파티해서 맛있는거 먹자~~! 파티룸 찾아둘께</span>
          </Memo3>
          <Memo4
            memoBackground={
              board.memoBackground[3] ? board.memoBackground[3] : "white"
            }
            fontColor={board.memoColors[3]}
          >
            <span>선물 뭐 갖고싶어? 다 말해 사줄께ㅎㅎ -민지-</span>
          </Memo4>
          <Memo5
            memoBackground={
              board.memoBackground[4] ? board.memoBackground[4] : "white"
            }
            fontColor={board.memoColors[4]}
          >
            <span>크리스마스 파티해서 맛있는거 먹자~~! 파티룸 찾아둘께</span>
          </Memo5>
          <Memo6
            memoBackground={
              board.memoBackground[5] ? board.memoBackground[5] : "white"
            }
            fontColor={board.memoColors[5]}
          >
            <span>선물 뭐 갖고싶어? 다 말해 사줄께ㅎㅎ -민지-</span>
          </Memo6>
        </MemoContainer>
      </BoardContainer>
      {modalOpen && (
        <SlideModal
          open={modalOpen}
          isBackdrop={false}
          height={"40vh"}
          children={<ModalContents />}
        />
      )}
    </>
  );
};

export default CompleteCreate;

const BoardContainer = styled.div`
  width: 100%;
  height: 60vh;
  border-radius: 4px;
  background: ${(props) =>
    props.background.boardBackgroundImage.includes("http")
      ? `url(${props.background.boardBackgroundImage})`
      : props.background.boardBackgroundColor};
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding: 1rem;
`;

const MemoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 1.5rem;
`;

const Memo1 = styled.div.attrs((props) => {
  return {
    style: {
      background: props.memoBackground.includes("http")
        ? `url(${props.memoBackground})`
        : props.memoBackground,
      color: props.fontColor ? props.fontColor : "black",
      backgroundPosition: props.memoBackground.includes("http")
        ? "center"
        : undefined,
      backgroundSize: props.memoBackground.includes("http")
        ? "100% 100%"
        : undefined,
      backgroundRepeat: props.memoBackground.includes("http")
        ? "no-repeat"
        : undefined,
    },
  };
})`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 43%;
  height: 14.5vh;
  background-color: white;
  margin-bottom: 1.5rem;
  border-radius: 4px;
  span {
    padding: 0.5rem;
  }
`;

const Memo2 = styled(Memo1)``;

const Memo3 = styled(Memo1)``;

const Memo4 = styled(Memo1)``;

const Memo5 = styled(Memo1)``;

const Memo6 = styled(Memo1)``;
