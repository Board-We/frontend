import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { Route, Routes, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import { deleteBoard, requestBoard } from "../../api/boardsApi";
import { requestSearchMemo } from "../../api/memoApi";
import { searchMemoResults } from "../../api/mockData";
import ServiceNameHeader from "../../components/layout/headers/serviceNameHeader";
import AlertModal from "../../components/modals/alertModal";
import { getBoardState } from "../../utils/board";
import BoardPageFactory from "./BoardPageFactory";
import PasswordModal from "./BoardPageModal/PasswordModal";
import BoardOnEnd from "./mode/BoardOnEnd";

const BoardPage = () => {
  const { boardCode } = useParams();
  const [board, setBoard] = useState(null);
  const [boardState, setBoardState] = useState(null);

  const location = useLocation();
  const [headerMenuSetting, setheaderMenuSetting] = useState({
    search: null,
    share: null,
    config: null,
  });
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [passwordModalState, setPasswordModalState] = useState({
    type: "",
    open: false,
  });

  const [isOpenConfirmDeleteModal, setIsOpenConfirmDeleteModal] =
    useState(false);
  const [checkedMemoList, setCheckedMemoList] = useState([]);
  const [isDeleteMemoMode, setIsDeleteMemoMode] = useState(false);
  const [searchModeType, setSearchModeType] = useState("");

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
    const deleted = await deleteBoard({ boardCode, password });
    setIsOpenConfirmDeleteModal(false);
  };

  const handleClickSearch = () => {
    setSearchModeType("memo");
  };

  const handleKeyDownSearchIput = async (e) => {
    if (e.code === "Enter" && !e.nativeEvent.isComposing) {
      const searchMemoResult = await requestSearchMemo({ boardCode, query });
      if (searchMemoResult) setSearchResults(searchMemoResult);
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
      const boardState = getBoardState(board);
      setBoardState(boardState);
      setBoard(board);
      console.log(board);
    };
    accessBoard();
  }, [boardCode]);

  useEffect(() => {
    switch (boardState) {
      case "onWaitWrite":
      case "onWrite":
      case "onWaitOpen":
        setheaderMenuSetting({
          search: null,
          share: () => {},
          config: {
            configMenu: ["보드 삭제"],
            configMenuHandler: [handleClickDeleteBoard],
          },
        });
        break;
      case "onOpen":
        setheaderMenuSetting({
          search: handleClickSearch,
          share: () => {},
          config: {
            configMenu: ["보드 삭제", "메모 삭제"],
            configMenuHandler: [handleClickDeleteBoard, handleClickDeleteMemo],
          },
        });
        break;
      default:
        setheaderMenuSetting({
          search: null,
          share: null,
          cofig: {
            configMenu: [],
            configMenuHandler: [],
          },
        });
    }
  }, [boardState, handleClickDeleteBoard, handleClickDeleteMemo]);
  return (
    <PageWrapper>
      <ServiceNameHeader
        searchModeType={searchModeType}
        setSearchModeType={setSearchModeType}
        setQuery={setQuery}
        onKeyDownSearchInput={handleKeyDownSearchIput}
        isDeleteMemoMode={isDeleteMemoMode}
        onSearch={headerMenuSetting.search}
        onShare={headerMenuSetting.share}
        onConfig={headerMenuSetting.config}
        checkedMemoList={checkedMemoList}
        setCheckedMemoList={setCheckedMemoList}
      />
      {isDeleteMemoMode && (
        <DeleteMemoSubHeader> 삭제할 메모를 선택하세요. </DeleteMemoSubHeader>
      )}
      <BodyContainer>
        <BoardPageFactory
          boardState={boardState}
          boardCode={boardCode}
          passwordModalState={passwordModalState}
          setPasswordModalState={setPasswordModalState}
          isDeleteMemoMode={isDeleteMemoMode}
          setIsDeleteMemoMode={setIsDeleteMemoMode}
          searchModeType={searchModeType}
          searchResults={searchResults}
          checkedMemoList={checkedMemoList}
          setCheckedMemoList={setCheckedMemoList}
        />

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
