import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { deleteBoard } from "../../api/boardsApi";
import ServiceNameHeader from "../../components/layout/headers/serviceNameHeader";
import Board404 from "./mode/Board404";
import BoardOnEnd from "./mode/BoardOnEnd";
import BoardOnOpen from "./mode/BoardOnOpen";
import BoardOnWaitOpen from "./mode/BoardOnWaitOpen";
import BoardOnWaitWrite from "./mode/BoardOnWaitWrite";
import BoardOnWrite from "./mode/BoardOnWrite";

const BoardPage = () => {
  const navigate = useNavigate();
  const [handleValidPassword, setHandleValidPassword] = useState(null);
  const [isOpenConfirmDeleteBoardModal, setIsOpenConfirmDeleteBoardModal] =
    useState(false);
  const [isDeleteMemoMode, setIsDeleteMemoMode] = useState(false);

  const handleConfirmDeleteBoard = async () => {
    console.log("delete");
    const deleted = await deleteBoard(); // param : {boardCode, password}
    if (deleted) handleValidPassword(null);
  };

  const handleClickDeleteBoard = () => {
    setHandleValidPassword(() => handleConfirmDeleteBoard);
  };

  const toggleDeleteMemoMode = () => {
    setIsDeleteMemoMode((prev) => !prev);
  };

  const handleClickDeleteMemo = () => {
    setHandleValidPassword(() => toggleDeleteMemoMode);
  };

  const configMenuSetting = {
    configMenu: ["보드 삭제", "메모 삭제"],
    configMenuHandler: [handleClickDeleteBoard, handleClickDeleteMemo],
  };

  return (
    <PageWrapper>
      <ServiceNameHeader
        isSearchMode={false}
        onSearch={() => {}}
        onShare={() => {}}
        onConfig={configMenuSetting}
      />
      <SlidesContainer>
        <Routes>
          <Route path="/onWaitWrite" element={<BoardOnWaitWrite />} />
          <Route path="/onWrite" element={<BoardOnWrite />} />
          <Route path="/onWaitOpen" element={<BoardOnWaitOpen />} />
          <Route
            path="/onOpen"
            element={
              <BoardOnOpen
                handleValidPassword={handleValidPassword}
                setHandleValidPassowrd={setHandleValidPassword}
                isOpenConfirmDeleteBoardModal={isOpenConfirmDeleteBoardModal}
                isDeleteMemoMode={isDeleteMemoMode}
              />
            }
          />
          <Route path="/onEnd" element={<BoardOnEnd />} />
          <Route path="/404" element={<Board404 />} />
        </Routes>
      </SlidesContainer>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const SlidesContainer = styled.div`
  height: 100%;
`;

export default BoardPage;
