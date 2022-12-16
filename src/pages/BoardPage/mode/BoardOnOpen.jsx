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
import AlertModal from "../../../components/modals/alertModal";

const BoardOnOpen = ({
  passwordModalState,
  setPasswordModalState,
  isDeleteMode,
  setIsDeleteMemoMode,
}) => {
  const board = useRecoilValue(boardState);
  const privateModeForTest = true;
  // const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [isOpenConfirmDeleteModal, setIsOpenConfirmDeleteModal] =
    useState(false);
  const [openToast, setOpenToast] = useState(true);
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

  const handleConfirmDeleteBoard = async () => {
    const deleted = await deleteBoard(); // param : {boardCode, password}
    if (deleted) setIsOpenConfirmDeleteModal(false);
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
    if (memoContainerObject.scrollTop > 0) setOpenToast(false);
    else if (memoContainerObject.scrollTop === 0) setOpenToast(true);

    if (
      memoContainerObject.scrollHeight ==
      memoContainerObject.offsetHeight + memoContainerObject.scrollTop
    )
      addVisibleMemos();
  };

  return (
    <PageWrapper>
      <BoardBackground boardInfo={board} backgroundRepeat={true} />
      <MemoContainer
        ref={$memoContainer}
        onScroll={onScrollMemoContainer}
        paddingTop={paddingTop}
      >
        {visibleMemos && privateModeForTest
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
      {isMemoLoading ? <Spinner /> : null}
      <Toast open={openToast}>스크롤해서 확인해보세요!</Toast>
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
