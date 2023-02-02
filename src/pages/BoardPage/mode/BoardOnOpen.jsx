import styled from "styled-components";
import BoardBackground from "../components/boardBackground";
import { useRecoilValue } from "recoil";
import { boardState, deviceScreenState } from "../../../store";
import { useEffect, useRef, useState } from "react";
import Toast from "../components/toast";
import Spinner from "../components/spinner";
import {
  requestDeleteMemo,
  requestGetMemoList,
  requestGetMemoThemeList,
} from "../../../api/memoApi";
import CheckableMemo from "../components/CheckableMemo";
import CalendarButton from "../../../components/buttons/calendarButton";
import BlockAccessBoard from "../components/blockAccessBoard";
import Memo from "../../../components/memo";
import AlertModal from "../../../components/modals/alertModal";
import GotoTopButton from "../../../components/buttons/GotoTopButton";
import { parsingFontNumber } from "../../../utils/board";

const BoardOnOpen = ({
  boardCode,
  headerState,
  setHeaderState,
  isAccessble,
  setIsAccessble,
}) => {
  const board = useRecoilValue(boardState);

  const [isOpenDeleteMemoModal, setIsOpenDeleteMemoModal] = useState(false);
  const [openToast, setOpenToast] = useState(true);
  const [openDueDateState, setOpenDueDateState] = useState({
    open: false,
    auto: true,
  });

  const [memoList, setMemoList] = useState([]);
  const [memoThemeList, setMemoThemeList] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const deviceScreenSize = useRecoilValue(deviceScreenState);
  const [paddingTop, setPaddingTop] = useState(0);
  const [memoThemes, setMemoThemes] = useState({});
  const [visibleMemos, setVisibleMemos] = useState([]);
  const [isMemoLoading, setIsMemoLoading] = useState(true);
  const [memoSize, setMemoSize] = useState(0);
  const $memoContainer = useRef();

  useEffect(() => {
    getMemos();
    getMemoThemes();
  }, [boardCode]);

  const handleClickDeleteMemo = () => {
    setIsOpenDeleteMemoModal(true);
  };
  const handleCloseDeleteMemoModal = () => {
    setHeaderState({ ...headerState, isSearchMode: false });
  };

  const handleConfirmDeleteMemo = async () => {
    const deleted = await requestDeleteMemo({
      boardCode,
      memoIds: headerState.checkedMemoList,
    });
    if (deleted) {
      getMemos();
    }
    setIsOpenDeleteMemoModal(false);
  };

  const handleChangeCheckableMemo = (e) => {
    if (e.target.checked) {
      setHeaderState({
        ...headerState,
        checkedMemoList: [
          ...headerState.checkedMemoList,
          Number(e.target.value),
        ],
      });
    } else {
      const filteredCheckedMemoList = headerState.checkedMemoList.filter(
        (id) => id !== Number(e.target.value)
      );
      setHeaderState({
        ...headerState,
        checkedMemoList: filteredCheckedMemoList,
      });
    }
  };

  const getMemos = async () => {
    const newMemos = await requestGetMemoList({ boardCode });
    newMemos.forEach((el) => {
      el["index"] = Math.random();
    });
    newMemos.sort((o1, o2) => {
      return o1.index - o2.index;
    });

    if (newMemos) setMemoList(newMemos);
  };

  useEffect(() => {
    makeMemoThemes();
    makeVisibleMemos();
  }, [memoList, memoThemeList]);

  useEffect(() => {
    if (headerState.isEnterPress) {
      const results = memoList.filter((memo) =>
        memo.memoContent.includes(headerState.query)
      );
      setSearchResults(results);
      setHeaderState({ ...headerState, isEnterPress: false });
    }
  }, [headerState.isEnterPress, memoList]);

  useEffect(() => {
    if (!headerState.isSearchMode) {
      setSearchResults([]);
    }
  }, [headerState.isSearchMode]);

  useEffect(() => {
    // 14 = service header 3rem + top 9 rem + padding bottom 2rem
    const newPaddingTop =
      deviceScreenSize.y - Number(deviceScreenSize.rem.replace("px", "")) * 14;
    // 2.5 = padding left 1rem + padding right 1rem + gap between memo 0.5rem
    const newMemoSize =
      ($memoContainer.current.clientWidth -
        Number(deviceScreenSize.rem.replace("px", "")) * 2.5) /
      2;

    setMemoSize(newMemoSize);
    setPaddingTop(newPaddingTop);
  }, [deviceScreenSize]);

  const getMemoThemes = async () => {
    const memoThemes = await requestGetMemoThemeList({ boardCode });

    if (memoThemes) setMemoThemeList(memoThemes);
  };

  const makeMemoThemes = () => {
    const newMemoThemes = {};
    memoThemeList.forEach((el) => {
      newMemoThemes[el.memoThemeId] = el;
    });
    setMemoThemes(newMemoThemes);
  };

  const makeVisibleMemos = () => {
    setVisibleMemos(memoList.slice(0, 10));
    setIsMemoLoading(false);
  };

  const addVisibleMemos = () => {
    if (visibleMemos.length === memoList.length) return;

    setIsMemoLoading(true);
    setTimeout(() => {
      setVisibleMemos(memoList.slice(0, visibleMemos.length + 10));
      setIsMemoLoading(false);
    }, 750);
  };

  const onScrollMemoContainer = (e) => {
    const memoContainerObject = e.target;

    if (memoContainerObject.scrollTop > 0) {
      setOpenToast(false);
      if (openDueDateState.auto)
        setOpenDueDateState({ ...openDueDateState, open: true });
    } else if (memoContainerObject.scrollTop === 0) {
      setOpenToast(true);
      setOpenDueDateState({ ...openDueDateState, open: false });
    }

    if (
      memoContainerObject.scrollHeight - 10 <
      memoContainerObject.offsetHeight + memoContainerObject.scrollTop
    )
      addVisibleMemos();
  };

  const scrollToTop = () => {
    $memoContainer.current.style.scrollBehavior = "smooth";
    $memoContainer.current.scrollTop = 0;
  };

  return (
    <PageWrapper>
      {!(
        headerState.isSearchMode && headerState.searchType === "deleteMemo"
      ) && (
        <>
          <BoardBackground boardInfo={board} backgroundRepeat={true} />
          <MemoContainer
            ref={$memoContainer}
            onScroll={onScrollMemoContainer}
            paddingTop={paddingTop}
          >
            {visibleMemos && isAccessble && searchResults.length === 0
              ? visibleMemos.map((el, i) => {
                  // memoThemeId
                  const theme = memoThemes[el.memoThemeId];
                  return (
                    <Memo
                      size={memoSize + "px"}
                      key={`${el}${i}`}
                      text={el.memoContent}
                      background={theme?.memoBackground}
                      color={theme?.memoTextColor}
                      fontType={parsingFontNumber(board.boardFont)}
                    />
                  );
                })
              : null}
            {/* search memo results */}
            {searchResults &&
              searchResults.length > 0 &&
              searchResults.map((el, i) => {
                const theme = memoThemes[el.memoThemeId];
                return (
                  <Memo
                    size={memoSize + "px"}
                    key={`${el}${i}`}
                    text={el.memoContent}
                    background={theme?.memoBackground}
                    color={theme?.memoTextColor}
                  />
                );
              })}
            {!headerState.isSearchMode && isAccessble && (
              <GotoTopButton bottom="5rem" onClick={scrollToTop} />
            )}
          </MemoContainer>
        </>
      )}
      {/* delete memo */}
      {headerState.isSearchMode && headerState.searchType === "deleteMemo" && (
        <DeleteMemoContianer>
          {/* 1. search result delete memo */}
          {/* 2. default list and if result is empty */}
          {searchResults && searchResults.length > 0
            ? searchResults.map((el, i) => (
                <CheckableMemo
                  key={`${el}${i}`}
                  id={el.memoId}
                  text={el.memoContent}
                  onChange={handleChangeCheckableMemo}
                  checkedMemoList={headerState.checkedMemoList}
                />
              ))
            : visibleMemos.map((el, i) => (
                <CheckableMemo
                  key={`${el}${i}`}
                  id={el.memoId}
                  text={el.memoContent}
                  onChange={handleChangeCheckableMemo}
                  checkedMemoList={headerState.checkedMemoList}
                />
              ))}

          <DeleteMemoButton
            isExistCheckedmemo={headerState.checkedMemoList.length !== 0}
            onClick={handleClickDeleteMemo}
          >
            삭제하기
            {headerState.checkedMemoList.length !== 0 && (
              <span>{headerState.checkedMemoList.length}</span>
            )}
          </DeleteMemoButton>
        </DeleteMemoContianer>
      )}
      {isMemoLoading ? <Spinner /> : null}
      {!headerState.isSearchMode && isAccessble && (
        <>
          <Toast open={openToast}>스크롤해서 확인해보세요!</Toast>
          <CalendarButton
            openState={openDueDateState}
            setOpenState={setOpenDueDateState}
          />
        </>
      )}
      {!isAccessble && <BlockAccessBoard setIsAccessble={setIsAccessble} />}
      <AlertModal
        open={isOpenDeleteMemoModal}
        onClickArray={[handleCloseDeleteMemoModal, handleConfirmDeleteMemo]}
        buttonTextArray={["취소", "삭제하기"]}
        text="정말 삭제할까요?"
        subText="한번 삭제하면 되돌릴 수 없습니다"
        onClose={handleCloseDeleteMemoModal}
      />
    </PageWrapper>
  );
};

export default BoardOnOpen;

const PageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow: hidden;
  background-color: white;
`;

const MemoContainer = styled.div`
  position: absolute;
  top: 9rem;
  left: 0;
  padding-top: ${(props) => `${props.paddingTop}px`};
  padding-bottom: 2.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  width: 100%;
  height: 0;
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: 1fr 1fr;
  overflow-y: scroll;
  overflow-x: hidden;
  grid-gap: 0.5rem;
  z-index: 3;
  &::-webkit-scrollbar {
    width: 0;
  }
`;

const DeleteMemoButton = styled.button`
  position: fixed;
  bottom: 0;
  border: 0;
  color: ${(props) => (props.isExistCheckedmemo ? "black" : "#757879")};
  background-color: ${(props) =>
    props.isExistCheckedmemo ? "#FDC62E" : "#E1E5E6"};
  width: 90vw;
  max-width: 550px;
  margin: 1rem;
  padding: 1rem;
  border-radius: 1.2rem;
  cursor: pointer;

  span {
    color: #cf281f;
  }
`;

const DeleteMemoContianer = styled.div`
  position: absolute;
  background-color: ${(props) => props.theme.colors.grey_50};
  top: 0;
  left: 0;
  padding: 1.5rem 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  overflow-y: scroll;
  overflow-x: hidden;
  grid-gap: 1rem;
  z-index: 3;
  &::-webkit-scrollbar {
    width: 0;
  }
`;
