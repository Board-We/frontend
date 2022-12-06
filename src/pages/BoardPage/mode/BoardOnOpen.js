import styled from "styled-components";
import { useState } from "react";
import BoardBackground from "../components/boardBackground";
import { useRecoilValue } from "recoil";
import { boardState } from "../../../store";

const BoardOnOpen = () => {
    useState(false);
  const board = useRecoilValue(boardState)


  return (
    <PageWrapper>
      <BoardBackground boardInfo={board}/>
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
`