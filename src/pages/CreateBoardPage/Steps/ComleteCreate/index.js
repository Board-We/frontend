import React, { useState } from "react";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { postUserBoardState } from "../../../../api/boardsApi";
import SlideModal from "../../../../components/modals/slideModal";
import { boardState } from "../../../../store";
import { setDateISOstring } from "../../../../utils/setDefaultDay";
import ModalContents from "./ModalContents";

const CompleteCreate = () => {
  const board = useRecoilValue(boardState);
  const [modalOpen, setModalOpen] = useState(true);
  const [boardURL, setBoardURL] = useState("");

  const postCurrentBoardState = async () => {
    const memoBackgroundList = [];
    const memoTextColorsList = [];

    board.memoThemes.map((val) => {
      memoBackgroundList.push(val.memoBackground);
      memoTextColorsList.push(val.memoTextColor);
    });

    const currentBoardState = {
      boardName: board.name,
      boardDescription: board.description,
      tags: [...board.tags],
      writingStartTime: setDateISOstring(board.writingStartTime),
      writingEndTime: setDateISOstring(board.writingEndTime),
      openStartTime: setDateISOstring(board.openStartTime),
      openEndTime: setDateISOstring(board.openEndTime),
      password: board.password,
      openType: board.openType,
      boardThemeId: board.boardBackground ? undefined : board.boardThemeId,

      boardBackground: board.boardBackground,
      boardFont: board.boardFont,
      memoThemes: {
        backgrounds: memoBackgroundList,
        textColors: memoTextColorsList,
      },
    };

    const boardLinkRes = await postUserBoardState({
      boardState: currentBoardState,
    });
    setBoardURL(boardLinkRes);
  };

  useEffect(() => {
    postCurrentBoardState();
  }, []);

  return (
    <>
      <BoardContainer background={board.boardBackground}>
        <BoardDescriptionContainer>
          <h1>{board.name}</h1>
          <TagContainer>
            {board.tags?.map((item, idx) => {
              return (
                <React.Fragment key={`${item}${idx}`}>
                  <span>{`#${item}`}</span>
                </React.Fragment>
              );
            })}
          </TagContainer>
          <p>{board.description}</p>
        </BoardDescriptionContainer>
        <MemoContainer>
          <Memo1
            memoBackground={
              board.memoThemes[0] ? board.memoThemes[0].memoBackground : "white"
            }
            fontColor={
              board.memoThemes[0] ? board.memoThemes[0].memoTextColor : "black"
            }
          >
            <span>우리 내년에도 친하게 지내자</span>
          </Memo1>
          <Memo2
            memoBackground={
              board.memoThemes[1] ? board.memoThemes[1].memoBackground : "white"
            }
            fontColor={
              board.memoThemes[1] ? board.memoThemes[1].memoTextColor : "black"
            }
          >
            <span>마라탕 모임 언제 가나요^^</span>
          </Memo2>
          <Memo3
            memoBackground={
              board.memoThemes[2] ? board.memoThemes[2].memoBackground : "white"
            }
            fontColor={
              board.memoThemes[2] ? board.memoThemes[2].memoTextColor : "black"
            }
          >
            <span>크리스마스 파티해서 맛있는거 먹자~~! 파티룸 찾아둘께</span>
          </Memo3>
          <Memo4
            memoBackground={
              board.memoThemes[3] ? board.memoThemes[3].memoBackground : "white"
            }
            fontColor={
              board.memoThemes[3] ? board.memoThemes[3].memoTextColor : "black"
            }
          >
            <span>선물 뭐 갖고싶어? 다 말해 사줄께ㅎㅎ -민지-</span>
          </Memo4>
          <Memo5
            memoBackground={
              board.memoThemes[4] ? board.memoThemes[4].memoBackground : "white"
            }
            fontColor={
              board.memoThemes[4] ? board.memoThemes[4].memoTextColor : "black"
            }
          >
            <span>크리스마스 파티해서 맛있는거 먹자~~! 파티룸 찾아둘께</span>
          </Memo5>
          <Memo6
            memoBackground={
              board.memoThemes[5] ? board.memoThemes[5].memoBackground : "white"
            }
            fontColor={
              board.memoThemes[5] ? board.memoThemes[5].memoTextColor : "black"
            }
          >
            <span>선물 뭐 갖고싶어? 다 말해 사줄께ㅎㅎ -민지-</span>
          </Memo6>
        </MemoContainer>
      </BoardContainer>
      {modalOpen && (
        <SlideModal open={modalOpen} isBackdrop={false} height={"fit-content"}>
          <ModalContents boardURL={boardURL} />
        </SlideModal>
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
    props.background.includes("http")
      ? `url(${props.background})`
      : props.background};
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding: 1rem;
`;

const BoardDescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  h1 {
    font-weight: 600;
    color: ${(props) => props.theme.colors.black};
    font-size: 1.55rem;
    margin: 0;
  }
  p {
    font-weight: 400;
    color: ${(props) => props.theme.colors.black};
    font-size: 1.5rem;
    margin: 0;
  }
`;

const TagContainer = styled.div`
  display: flex;
  margin: 0.75rem 0 0.75rem 0;
  span {
    font-weight: 400;
    color: ${(props) => props.theme.colors.black};
    font-size: 1.5rem;
    margin-right: 0.8rem;
  }
`;

const MemoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 1.5rem;
`;

const Memo1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 43%;
  height: 14.5vh;
  background: ${(props) => props.memoBackground};
  background-image: ${(props) =>
    props.memoBackground.includes("base64")
      ? `url(${props.memoBackground})`
      : undefined};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  color: ${(props) => props.fontColor};
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
