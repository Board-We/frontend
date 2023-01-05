import styled from "styled-components";
import BoardBackground from "../components/boardBackground";
import { useRecoilValue } from "recoil";
import { boardState, deviceScreenState } from "../../../store";
import { useEffect, useRef, useState } from "react";
import Toast from "../components/toast";
import Spinner from "../components/spinner";
import { deleteBoard } from "../../../api/boardsApi";
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

const BoardOnOpen = ({
  boardCode,
  passwordModalState,
  setPasswordModalState,
  isDeleteMemoMode,
  setIsDeleteMemoMode,
  searchModeType,
  searchResults,
  checkedMemoList,
  setCheckedMemoList,
}) => {
  const board = useRecoilValue(boardState);
  const privateModeForTest = true;

  const [isOpenDeleteMemoModal, setIsOpenDeleteMemoModal] = useState(false);

  const [openToast, setOpenToast] = useState(true);
  const [openDueDate, setOpenDueDate] = useState(false);

  const [memoList, setMemoList] = useState([]);
  const [meemoThemeList, setMemoThemeList] = useState([]);

  const deviceScreenSize = useRecoilValue(deviceScreenState);
  const [paddingTop, setPaddingTop] = useState(0);
  const [memoThemes, setMemoThemes] = useState({});
  const [visibleMemos, setVisibleMemos] = useState([]);
  const [isMemoLoading, setIsMemoLoading] = useState(true);
  const [memoSize, setMemoSize] = useState(0);
  const $memoContainer = useRef();

  const handleClickDeleteMemo = () => {
    setIsOpenDeleteMemoModal(true);
  };
  const handleCloseDeleteMemoModal = () => {
    setIsDeleteMemoMode(false);
  };

  const handleConfirmDeleteMemo = async (boardCode) => {
    const deleted = await requestDeleteMemo({ boardCode, checkedMemoList });
    setIsOpenDeleteMemoModal(false);
  };

  const handleChangeCheckableMemo = (e) => {
    if (e.target.checked) {
      setCheckedMemoList([...checkedMemoList, e.target.value]);
    } else
      setCheckedMemoList(checkedMemoList.filter((id) => id !== e.target.value));
  };

  useEffect(() => {
    const getMemos = async () => {
      const memos = await requestGetMemoList({ boardCode });
      if (memos) setMemoList(memos);
    };
    getMemos();
  }, [boardCode]);

  useEffect(() => {
    const getMemoThemes = async () => {
      const memoThemes = await requestGetMemoThemeList({ boardCode });
      if (memoThemes) setMemoThemeList(memoThemes);
    };
    getMemoThemes();
  }, [boardCode]);

  useEffect(() => {
    makeMemoThemes();
    makeVisibleMemos();
  }, []);

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

  const makeMemoThemes = () => {
    const newMemoThemes = {};
    meemoThemeList.forEach((el) => {
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
      setOpenDueDate(true);
    } else if (memoContainerObject.scrollTop === 0) {
      setOpenToast(true);
      setOpenDueDate(false);
    }

    if (
      memoContainerObject.scrollHeight ==
      memoContainerObject.offsetHeight + memoContainerObject.scrollTop
    )
      addVisibleMemos();
  };

  return (
    <PageWrapper>
      {!isDeleteMemoMode && (
        <>
          <BoardBackground boardInfo={board} backgroundRepeat={true} />
          <MemoContainer
            ref={$memoContainer}
            onScroll={onScrollMemoContainer}
            paddingTop={paddingTop}
          >
            {visibleMemos &&
            privateModeForTest &&
            !isDeleteMemoMode &&
            !searchModeType
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
                    />
                  );
                })
              : null}{" "}
            {searchModeType &&
              searchResults &&
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
          </MemoContainer>
        </>
      )}

      {isDeleteMemoMode && (
        <DeleteMemoContianer>
          {visibleMemos.map((el, i) => (
            <CheckableMemo
              key={`${el}${i}`}
              id={`${el}${i}`}
              text={el.memoContent}
              onChange={handleChangeCheckableMemo}
              checkedMemoList={checkedMemoList}
            />
          ))}
          <DeleteMemoButton
            isExistCheckedmemo={checkedMemoList.length !== 0}
            onClick={handleClickDeleteMemo}
          >
            삭제하기{" "}
            {checkedMemoList.length !== 0 && (
              <span>{checkedMemoList.length}</span>
            )}
          </DeleteMemoButton>
        </DeleteMemoContianer>
      )}
      {isMemoLoading ? <Spinner /> : null}
      {!isDeleteMemoMode && privateModeForTest && (
        <>
          <Toast open={openToast}>스크롤해서 확인해보세요!</Toast>
          <CalendarButton open={openDueDate} />
        </>
      )}
      {!privateModeForTest && <BlockAccessBoard />}
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
