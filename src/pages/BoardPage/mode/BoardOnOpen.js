import styled from "styled-components";
import Memo from "../../../components/memo";
import { useState } from "react";
import ChipButton from "../../../components/buttons/chipButton";
import AlertModal from "../../../components/modals/alertModal";
import ServiceNameHeader from "../../../components/layout/headers/serviceNameHeader";
import RemoveModeHeader from "../../../components/layout/headers/removeModeHeader";
import PasswordModal from "../BoardPageModal/PasswordModal";

const BoardOnOpen = () => {
  const [isOpenPasswordModal, setIsOpenPasswordModal] = useState(false);
  const [isOpenSuccessRemoveModal, setIsOpenSuccessRemoveModal] =
    useState(false);
  const [isRemoveMemoMode, setIsRemoveMemoMode] = useState(false);
  const [checkedList, setCheckedList] = useState([]);

  const handleClickShare = () => {
    // To do: 보드 링크 공유
  };

  const handleClickConfig = () => {
    setIsOpenPasswordModal(true);
  };
  const handleClosePasswordModal = () => {
    setIsOpenPasswordModal(false);
  };
  const handleSuccessPasswordModal = () => {
    setIsRemoveMemoMode(true);
  };
  
  const handleClickCancelRemoveMode = () => {
    setIsRemoveMemoMode(false);
  };

  const handleClickRemoveMemo = () => {
    // To Do: 메모 삭제 API 요청
    setIsOpenSuccessRemoveModal(true);
    setIsRemoveMemoMode(false);
  };
  const handleCloseConfirmRemoveModal = () => {
    setIsOpenSuccessRemoveModal(false);
  };

  const handleChangeCheckbox = (e) => {
    const checked = e.target.checked;
    if (checked) setCheckedList([...checkedList, e.target.value]);
    else setCheckedList(checkedList.filter((id) => id !== e.target.value));
  };
  console.log(checkedList);
  return (
    <PageWrapper>
      <BoardContainer>
        {isRemoveMemoMode ? (
          <RemoveModeHeader
            onClickCancel={handleClickCancelRemoveMode}
            onClickRemove={handleClickRemoveMemo}
          />
        ) : (
          <ServiceNameHeader
            canShare={true}
            canConfig={true}
            onClickShare={handleClickShare}
            onClickConfig={handleClickConfig}
          />
        )}
        <BoardBody>
          <BoardName>보드 이름</BoardName>
          <BoardDescription>보드 설명 보드 설명 어쩌구 저쩌구</BoardDescription>
          <BoardMemoGrid>
            <Memo
              key={1}
              id={1}
              text="메모 내용 어쩌구 저쩌구"
              isRemoveMode={isRemoveMemoMode}
              onChange={handleChangeCheckbox}
            />
            <Memo
              key={2}
              id={2}
              text="메모 내용 어쩌구 저쩌구"
              isRemoveMode={isRemoveMemoMode}
              onChange={handleChangeCheckbox}
            />
          </BoardMemoGrid>
          {!isRemoveMemoMode ? <ChipButton text="롤링페이퍼 붙이기" /> : null}
        </BoardBody>
      </BoardContainer>
      {isOpenPasswordModal && (
        <PasswordModal
          open={isOpenPasswordModal}
          onClose={handleClosePasswordModal}
          onSuccess={handleSuccessPasswordModal}
          height="50vh"
        />
      )}
      {isOpenSuccessRemoveModal && (
        <AlertModal
          open={[isOpenSuccessRemoveModal]}
          onClickArray={[handleCloseConfirmRemoveModal]}
          buttonTextArray={["확인"]}
          text="메모가 삭제되었습니다."
        />
      )}
    </PageWrapper>
  );
};

export default BoardOnOpen;

const PageWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  min-height: 100vh;
  justify-content: center;
  align-items: flex-start;
`;

const BoardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BoardBody = styled.div`
  width: 100%;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  padding: 0 1rem;
  padding-top: 5rem;
  background-color: #f3f3f3;
`;

const BoardMemoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  width: 100%;
  padding: 1rem;
`;

const BoardName = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
`;

const BoardDescription = styled.div``;

