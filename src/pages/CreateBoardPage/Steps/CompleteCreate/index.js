import React, { useRef, useState } from "react";
import { useEffect } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import styled from "styled-components";
import { postUserBoardState } from "../../../../api/boardsApi";
import SlideModal from "../../../../components/modals/slideModal";
import { boardState, deviceScreenState } from "../../../../store";
import { setDateISOstring } from "../../../../utils/setDefaultDay";
import { theme } from "../../../../styles/theme";
import ModalContents from "./ModalContents";
import { useLocation } from "react-router-dom";

const CompleteCreate = () => {
  const board = useRecoilValue(boardState);
  const location = useLocation();
  const resetBaord = useResetRecoilState(boardState);
  const [modalOpen, setModalOpen] = useState(true);
  const [boardURL, setBoardURL] = useState("");

  const [heightOfMemoGrid, setHeightOfMemoGrid] = useState(0);

  const [memos, setMemos] = useState([]);

  const modalRef = useRef(null);
  const desciprtionComponentRef = useRef(null);
  const mainComponentRef = useRef(null);

  const deviceScreenSize = useRecoilValue(deviceScreenState);

  useEffect(() => {
    const bottomOfDescription =
      desciprtionComponentRef.current.offsetTop +
      desciprtionComponentRef.current.clientHeight;
    const heightOfModalArea = modalRef.current.clientHeight;
    const marginTop = Number(deviceScreenSize.rem.replace("px", "")) * 0.5;
    setHeightOfMemoGrid(
      deviceScreenSize.y -
        bottomOfDescription -
        heightOfModalArea -
        marginTop +
        2
    );
  }, [
    deviceScreenSize,
    mainComponentRef.current,
    desciprtionComponentRef.current,
    modalRef.current,
  ]);

  const getMemos = () => {
    const result = [];
    const sampleText = [
      "우리 내년에도 친하게 지내자",
      "마라탕 모임 언제 가나요^^",
      "크리스마스 파티해서 맛있는거 먹자~~! 파티룸 찾아둘께",
      "선물 뭐 갖고싶어? 다 말해 사줄께ㅎㅎ -민지-",
      "크리스마스 파티해서 맛있는거 먹자~~! 파티룸 찾아둘께",
      "선물 뭐 갖고싶어? 다 말해 사줄께ㅎㅎ -민지-",
    ];

    board.memoThemes.forEach((el, i) => {
      result.push(
        <Memo1
          memoBackground={el.memoBackground}
          fontColor={el.memoTextColor}
          key={el + i}
        >
          {sampleText[i]}
        </Memo1>
      );
    });

    for (let i = 0; i < 6 - board.memoThemes.length; i++) {
      result.push(
        <Memo1
          memoBackground={theme.colors.defaultMemoBg}
          fontColor={theme.colors.black}
          key={`sampleMemo${i}`}
        >
          {sampleText[i + board.memoThemes.length]}
        </Memo1>
      );
    }

    return result;
  };

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

  useEffect(() => {
    setMemos(getMemos());
  }, []);

  useEffect(() => {
    return () => {
      resetBaord();
    };
  }, []);

  return (
    <>
      <BoardContainer background={board.boardBackground} ref={mainComponentRef}>
        <BoardDescriptionContainer ref={desciprtionComponentRef}>
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
        <MemoContainer height={heightOfMemoGrid}>{memos}</MemoContainer>
      </BoardContainer>
      {modalOpen && (
        <SlideModal
          open={modalOpen}
          isBackdrop={false}
          height={"fit-content"}
          ref={modalRef}
        >
          <ModalContents boardURL={boardURL} />
        </SlideModal>
      )}
    </>
  );
};

export default CompleteCreate;

const BoardContainer = styled.div`
  width: 100%;
  height: 80vh;
  border-radius: 4px;
  background: ${(props) =>
    props.background.includes("base64")
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
  height: ${(props) => props.height}px;
  overflow-y: scroll;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 1.5rem;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Memo1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 42%;
  height: 15vh;
  background: ${(props) =>
    props.memoBackground.includes("base64")
      ? `url(${props.memoBackground})`
      : props.memoBackground};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  color: ${(props) => props.fontColor};
  margin-bottom: 1.5rem;
  border-radius: 4px;
  border: 1px solid ${theme.colors.grey_40};
  padding: 0.75rem;
  span {
    padding: 0.5rem;
  }
`;
