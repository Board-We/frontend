import styled from "styled-components";
import BoardBackground from "../components/boardBackground";
import { useRecoilValue } from "recoil";
import { boardState, deviceScreenState } from "../../../store";
import PasswordModal from "../BoardPageModal/PasswordModal";
import { useEffect, useRef, useState } from "react";
import Toast from "../components/toast";
import MemoOnBoard from "../components/memoOnBoard";
import Spinner from "../components/spinner";
import { deleteBoard } from "../../../api/boardsApi";
import { deleteMemo } from "../../../api/memoApi";
import AlertModal from "../../../components/modals/alertModal";
import CheckableMemo from "../components/CheckableMemo";
import CalendarButton from "../../../components/buttons/calendarButton";

const BoardOnOpen = ({
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

  const [isOpenConfirmDeleteModal, setIsOpenConfirmDeleteModal] =
    useState(false);

  const [openToast, setOpenToast] = useState(true);
  const [openDueDate, setOpenDueDate] = useState(false);
  const deviceScreenSize = useRecoilValue(deviceScreenState);
  const [paddingTop, setPaddingTop] = useState(0);
  const [memoThemes, setMemoThemes] = useState({});
  const [visibleMemos, setVisibleMemos] = useState([]);
  const [isMemoLoading, setIsMemoLoading] = useState(true);
  const $memoContainer = useRef();

  const handleClosePasswordModal = () => {
    setPasswordModalState({ ...passwordModalState, open: false });
  };

  const handleValidPassword = () => {
    if (passwordModalState.type === "deleteBoard")
      setIsOpenConfirmDeleteModal(true);
    else if (passwordModalState.type === "deleteMemo")
      setIsDeleteMemoMode(true);
    else if (passwordModalState.type === "privateBoard")
      console.log("진입 허가");
  };

  const handleCloseConfirmDeleteModal = () => {
    setIsOpenConfirmDeleteModal(false);
  };

  const handleConfirmDeleteBoard = async ({ boardCode, password }) => {
    const deleted = await deleteBoard({ boardCode, password }); // param : {boardCode, password}
    setIsOpenConfirmDeleteModal(false);
  };

  const handleChangeCheckableMemo = (e) => {
    if (e.target.checked) {
      setCheckedMemoList([...checkedMemoList, e.target.value]);
    } else
      setCheckedMemoList(checkedMemoList.filter((id) => id !== e.target.value));
  };

  const handleClickDeleteMemo = async (boardCode) => {
    const deleted = await deleteMemo({ boardCode, checkedMemoList });
    setIsDeleteMemoMode(false);
  };

  useEffect(() => {
    makeMemoThemes();
    makeVisibleMemos();
  }, []);

  useEffect(() => {
    // 14 = service header 3rem + top 9 rem + padding bottom 2rem
    const newPaddingTop =
      deviceScreenSize.y - Number(deviceScreenSize.rem.replace("px", "")) * 14;
    setPaddingTop(newPaddingTop);
  }, [deviceScreenSize]);

  const makeMemoThemes = () => {
    const newMemoThemes = {};
    board.memoThemes.forEach((el) => {
      newMemoThemes[el.memoThemeId] = el;
    });
    setMemoThemes(newMemoThemes);
  };

  const makeVisibleMemos = () => {
    setVisibleMemos(board.memos.slice(0, 10));
    setIsMemoLoading(false);
  };

  const addVisibleMemos = () => {
    if (visibleMemos.length === board.memos.length) return;

    setIsMemoLoading(true);
    setTimeout(() => {
      setVisibleMemos(board.memos.slice(0, visibleMemos.length + 10));
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
                    <MemoOnBoard
                      size={$memoContainer.current.clientWidth * 0.4}
                      key={`${el}${i}`}
                      text={el.memoContent}
                      background={theme?.memoBackground}
                      color={theme?.memoTextColor}
                      marginOption={i % 2 === 0}
                    />
                  );
                })
              : null}{" "}
            {searchModeType &&
              searchResults &&
              searchResults.map((el, i) => {
                const theme = memoThemes[el.memoThemeId];
                return (
                  <MemoOnBoard
                    size={$memoContainer.current.clientWidth * 0.4}
                    key={`${el}${i}`}
                    text={el.memoContent}
                    background={theme?.memoBackground}
                    color={theme?.memoTextColor}
                    marginOption={i % 2 === 0}
                  />
                );
              })}
            <PasswordModal
              open={passwordModalState.open}
              onClose={handleClosePasswordModal}
              onValid={handleValidPassword}
            />
            <AlertModal
              open={isOpenConfirmDeleteModal}
              onClickArray={[
                handleCloseConfirmDeleteModal,
                handleConfirmDeleteBoard,
              ]}
              buttonTextArray={["취소", "삭제하기"]}
              text="보드를 삭제하면 되돌릴 수 없습니다."
              onClose={handleCloseConfirmDeleteModal}
            />
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
      {!isDeleteMemoMode && (
        <Toast open={openToast}>스크롤해서 확인해보세요!</Toast>
      )}
      <CalendarButton
        open={openDueDate}
        isHidden={
          passwordModalState.open ||
          isDeleteMemoMode ||
          isOpenConfirmDeleteModal
        }
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
  background-color: ${(props) => props.theme.colors.grey_50};
`;

const MemoContainer = styled.div`
  position: absolute;
  top: 9rem;
  left: 0;
  padding-top: ${(props) => `${props.paddingTop}px`};
  padding-bottom: 2.5rem;
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
  top: 1rem;
  left: 0;
  padding-top: ${(props) => `${props.paddingTop}px`};
  padding-bottom: 2.5rem;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  overflow-y: scroll;
  overflow-x: hidden;
  grid-gap: 0.5rem;
  z-index: 3;
  &::-webkit-scrollbar {
    width: 0;
  }
`;
