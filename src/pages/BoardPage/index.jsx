import React, { useEffect, useState } from "react";
import { useCallback } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { searchMemo } from "../../api/memoApi";
import { searchMemoResults } from "../../api/mockData";
import ServiceNameHeader from "../../components/layout/headers/serviceNameHeader";
import Board404 from "./mode/Board404";
import BoardOnEnd from "./mode/BoardOnEnd";
import BoardOnOpen from "./mode/BoardOnOpen";
import BoardOnWaitOpen from "./mode/BoardOnWaitOpen";
import BoardOnWaitWrite from "./mode/BoardOnWaitWrite";
import BoardOnWrite from "./mode/BoardOnWrite";

const BoardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [configMenuSetting, setConfigMenuSetting] = useState(null);
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState(null);
  const [passwordModalState, setPasswordModalState] = useState({
    type: "",
    open: false,
  });
  const [isDeleteMemoMode, setIsDeleteMemoMode] = useState(false);
  const [searchModeType, setSearchModeType] = useState("");

  const handleClickSearch = () => {
    setSearchModeType("memo");
  };

  const handleKeyDownSearchIput = async (e) => {
    console.log(query);
    if (e.code === "Enter" && !e.nativeEvent.isComposing) {
      const searchMemoResult = await searchMemo({});
      if (searchMemoResult) setSearchResults(searchMemoResult);
      setSearchResults(searchMemoResults.memos); // set mock data
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
    switch (currentPath) {
      case "/board/onWaitWrite":
      case "/board/onwrite":
      case "/board/onWaitOpen":
        setConfigMenuSetting({
          configMenu: ["보드 삭제"],
          configMenuHandler: [handleClickDeleteBoard],
        });
        break;
      case "/board/onOpen":
        setConfigMenuSetting({
          configMenu: ["보드 삭제", "메모 삭제"],
          configMenuHandler: [handleClickDeleteBoard, handleClickDeleteMemo],
        });
        break;
      default:
        setConfigMenuSetting({
          configMenu: [],
          configMenuHandler: [],
        });
    }
  }, [currentPath, handleClickDeleteBoard, handleClickDeleteMemo]);
  return (
    <PageWrapper>
      <ServiceNameHeader
        searchModeType={searchModeType}
        setSearchModeType={setSearchModeType}
        setQuery={setQuery}
        onKeyDownSearchInput={handleKeyDownSearchIput}
        isDeleteMemoMode={isDeleteMemoMode}
        onSearch={handleClickSearch}
        onShare={() => {}}
        onConfig={configMenuSetting}
      />
      <BodyContainer>
        <Routes>
          <Route path="/onWaitWrite" element={<BoardOnWaitWrite />} />
          <Route path="/onWrite" element={<BoardOnWrite />} />
          <Route path="/onWaitOpen" element={<BoardOnWaitOpen />} />
          <Route
            path="/onOpen"
            element={
              <BoardOnOpen
                passwordModalState={passwordModalState}
                setPasswordModalState={setPasswordModalState}
                isDeleteMemoMode={isDeleteMemoMode}
                setIsDeleteMemoMode={setIsDeleteMemoMode}
                searchModeType={searchModeType}
                searchResults={searchResults}
              />
            }
          />
          <Route path="/onEnd" element={<BoardOnEnd />} />
          <Route path="/404" element={<Board404 />} />
        </Routes>
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

export default BoardPage;
