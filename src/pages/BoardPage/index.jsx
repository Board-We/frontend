import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
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

  const handleClickDeleteBoard = () => {
    setPasswordModalState({
      ...passwordModalState,
      type: "deleteBoard",
      open: true,
    });
  };

  const handleClickDeleteMemo = () => {
    setPasswordModalState({
      ...passwordModalState,
      type: "deleteMemo",
      open: true,
    });
  };

  const configMenuSetting = {
    configMenu: ["보드 삭제", "메모 삭제"],
    configMenuHandler: [handleClickDeleteBoard, handleClickDeleteMemo],
  };

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
