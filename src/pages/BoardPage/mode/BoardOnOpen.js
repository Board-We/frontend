import styled from "styled-components";
import BoardBackground from "../components/boardBackground";
import { useRecoilValue } from "recoil";
import { boardState } from "../../../store";
import MemoPaper from "../../../components/memoPaper";
import PasswordModal from "../BoardPageModal/PasswordModal";
import { useState } from "react";
import AlertModal from "../../../components/modals/alertModal";

const BoardOnOpen = ({
  handleValidPassword,
  setHandleValidPassword,
  isOpenConfirmDeleteBoardModal,
  isDeleteMemoMode,
}) => {
  const board = useRecoilValue(boardState);
  const privateModeForTest = true;

  const handleClosePasswordModal = () => {
    setHandleValidPassword(null);
  };

  const handleCloseConfirmDeleteBoardModal = () => {
    setHandleValidPassword(null);
  };

  console.log(handleValidPassword);
  return (
    <PageWrapper>
      <BoardBackground boardInfo={board} backgroundRepeat={true} />
      <MemoContainer>
        {board.memos &&
          privateModeForTest &&
          board.memos.map((el, i) => {
            return <MemoPaper key={`${el}${i}`} text={el.memoContent} />;
          })}
      </MemoContainer>
      <PasswordModal
        open={true}
        onClose={handleClosePasswordModal}
        onValid={handleValidPassword}
      />
      <AlertModal
        open={isOpenConfirmDeleteBoardModal}
        onClickArray={[handleCloseConfirmDeleteBoardModal, handleValidPassword]}
        buttonTextArray={["취소", "삭제하기"]}
        text="보드를 삭제하면 되돌릴 수 없습니다."
        onClose={handleCloseConfirmDeleteBoardModal}
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
`;

const MemoContainer = styled.div`
  position: absolute;
  bottom: 0;
  padding-top: 100%;
  padding-bottom: 3rem;
  width: 100%;
  display: grid;
  height: 1px;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  overflow: scroll;
  gap: 1rem;
  z-index: 3;
  &::-webkit-scrollbar {
    width: 0;
  }
`;

const Dummy = styled.div`
  display: inline-block;
  height: 40vh;
`;
