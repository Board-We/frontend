import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { requestDeleteBoard, requestBoard } from "../../api/boardsApi";
import ServiceNameHeader from "../../components/layout/headers/serviceNameHeader";
import AlertModal from "../../components/modals/alertModal";
import { boardState } from "../../store";
import { getBoardLifeCycle } from "../../utils/board";
import BoardPageFactory from "./BoardPageFactory";
import PasswordModal from "./BoardPageModal/PasswordModal";

const BoardPage = () => {
  const { boardCode } = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useRecoilState(boardState);
  const [boardLifeCycle, setBoardLifeCycle] = useState(null);
  const [password, setPassword] = useState("");
  const [headerState, setHeaderState] = useState({
    isSearchMode: false,
    searchType: null, // board | memo | deleteMemo
    isEnterPress: false,
    menu: [],
    configMenu: [],
    configMenuHandler: [],
    query: "",
    checkedMemoList: [],
  });

  const [passwordModalState, setPasswordModalState] = useState({
    type: "",
    open: false,
  });

  const [isOpenConfirmDeleteModal, setIsOpenConfirmDeleteModal] =
    useState(false);
  const [isOpenInvalidLinkModal, setIsOpenInvalidLinkModal] = useState(false);

  const handleClosePasswordModal = () => {
    setPasswordModalState({ ...passwordModalState, open: false });
  };

  const handleValidPassword = () => {
    if (passwordModalState.type === "deleteBoard")
      setIsOpenConfirmDeleteModal(true);
    else if (passwordModalState.type === "deleteMemo")
      setHeaderState({
        ...headerState,
        isSearchMode: true,
        searchType: "deleteMemo",
      });
    else if (passwordModalState.type === "privateBoard")
      console.log("진입 허가");
  };

  const handleCloseConfirmDeleteModal = () => {
    setIsOpenConfirmDeleteModal(false);
  };

  const handleCloseInvalidLinkModal = () => {
    setIsOpenInvalidLinkModal(false);
    navigate("/");
  };
  const handleConfirmDeleteBoard = async () => {
    const deleted = await requestDeleteBoard({ boardCode, password });
    if (deleted) {
      setIsOpenConfirmDeleteModal(false);
      navigate("/", { state: { isDeleted: true } });
    }
  };

  const handleClickDeleteBoard = useCallback(() => {
    setPasswordModalState({
      ...passwordModalState,
      type: "deleteBoard",
      open: true,
    });
  }, [passwordModalState]);

  const handleClickDeleteMemo = useCallback(() => {
    setPasswordModalState({
      ...passwordModalState,
      type: "deleteMemo",
      open: true,
    });
  }, [passwordModalState]);

  useEffect(() => {
    const accessBoard = async () => {
      const board = await requestBoard(boardCode);
      console.log(board);
      if (board) setBoard(board);
      else setIsOpenInvalidLinkModal(true);
    };
    accessBoard();
  }, [boardCode]);

  useEffect(() => {
    if (board.boardStatus) {
      const boardLifeCycle = getBoardLifeCycle(board);
      setBoardLifeCycle(boardLifeCycle);
    }
  }, [board]);

  useEffect(() => {
    setHeaderOption();
  }, [boardLifeCycle]);

  const setHeaderOption = () => {
    switch (boardLifeCycle) {
      case "onWaitWrite":
      case "onWrite":
      case "onWaitOpen":
        setHeaderState({
          ...headerState,
          menu: ["share", "config"],
          configMenu: ["보드 삭제"],
          configMenuHandler: [handleClickDeleteBoard],
        });
        break;
      case "onOpen":
        setHeaderState({
          ...headerState,
          searchType: "memo",
          menu: ["search", "share", "config"],
          configMenu: ["보드 삭제", "메모 삭제"],
          configMenuHandler: [handleClickDeleteBoard, handleClickDeleteMemo],
        });
        break;
      default:
        break;
    }
  };

  return (
    <PageWrapper>
      <ServiceNameHeader
        headerState={headerState}
        setHeaderState={setHeaderState}
      />
      {headerState.isSearchMode && headerState.searchType === "deleteMemo" && (
        <DeleteMemoSubHeader> 삭제할 메모를 선택하세요. </DeleteMemoSubHeader>
      )}
      <BodyContainer>
        {boardLifeCycle && (
          <BoardPageFactory
            boardLifeCycle={boardLifeCycle}
            boardInfo={board}
            boardCode={boardCode}
            headerState={headerState}
            setHeaderState={setHeaderState}
          />
        )}
        <PasswordModal
          password={password}
          setPassword={setPassword}
          boardCode={boardCode}
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
        {isOpenInvalidLinkModal && (
          <AlertModal
            open={isOpenInvalidLinkModal}
            text="정확한 링크를 입력해주십시오."
            buttonTextArray={["확인"]}
            onClickArray={[handleCloseInvalidLinkModal]}
            onClose={handleCloseInvalidLinkModal}
          />
        )}
      </BodyContainer>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const BodyContainer = styled.div`
  height: 100%;
`;

const DeleteMemoSubHeader = styled.div`
  border-top: ${(props) => `1px solid ${props.theme.colors.grey_40}`};
  padding: 0.7rem;
  color: ${(props) => props.theme.colors.grey_20};
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: ${(props) => props.theme.shadows.shodow_1};
`;

export default BoardPage;
