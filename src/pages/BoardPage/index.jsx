import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { deleteBoard, requestBoard } from "../../api/boardsApi";
import { requestSearchMemo } from "../../api/memoApi";
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
    menu: [],
    configMenu: [],
    configMenuHandler: [],
    setQuery: null,
    onKeydown: null,
    checkedMemoList: [],
    setCheckedMemoList: null,
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

  const handleConfirmDeleteBoard = async () => {
    const deleted = await deleteBoard({ boardCode, password });
    if (deleted) {
      setIsOpenConfirmDeleteModal(false);
      navigate("/", { state: { isDeleted: true } });
    }
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
      setBoard(board);
    };
    accessBoard();
  }, [boardCode]);

  useEffect(()=>{
    const boardLifeCycle = getBoardLifeCycle(board);
    setBoardLifeCycle(boardLifeCycle);
  }, [board])

  useEffect(() => {
    setHeaderOption()
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
          setQuery,
          onKeydown: handleKeyDownSearchIput,
          checkedMemoList,
          setCheckedMemoList,
        });
        break;
      default:
        break;
    }
  }

  return (
    <PageWrapper>
      <ServiceNameHeader
        headerState={headerState}
        setHeaderState={setHeaderState}
      />
      {headerState.isSearchMode && headerState.searchType === "dleteMemo" && (
        <DeleteMemoSubHeader> 삭제할 메모를 선택하세요. </DeleteMemoSubHeader>
      )}
      <BodyContainer>
        <BoardPageFactory
          boardLifeCycle={boardLifeCycle}
          boardInfo={board}
          boardCode={boardCode}
          passwordModalState={passwordModalState}
          setPasswordModalState={setPasswordModalState}
          headerState={headerState}
          searchResults={searchResults}
        />
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
