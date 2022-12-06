import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import ServiceNameHeader from "../../components/layout/headers/serviceNameHeader";
import { boardState } from "../../store";

function LinkAccessPage() {
  const [board, setBoard] = useRecoilState(boardState);

  console.log(board);

  const handleShare = () => {
    console.log("share");
  };
  const handleConfig = () => {
    console.log("config");
  };
  const tag = ["1", "2", "3"];
  return (
    <PageWrapper>
      <ServiceNameHeader
        canConfig={true}
        canShare={true}
        onClickConfig={handleConfig}
        onClickShare={handleShare}
      />
      <BoardContainer>
        <BoardStateArea>
          <div>dfdfdfdfd</div>
          <div>dfdfdfdfd</div>
          <div>dfdfdfdfd</div>
          <div>dfdfdfdfd</div>
        </BoardStateArea>
        <BoardDescriptionArea>
          <BoardTitle>{board.name}</BoardTitle>
          <p>{board.description}</p>
          <TagContainer>
            {tag.map((item) => {
              return (
                <React.Fragment>
                  <span>{`#${item}`}</span>
                </React.Fragment>
              );
            })}
          </TagContainer>
        </BoardDescriptionArea>
      </BoardContainer>
    </PageWrapper>
  );
}

export default LinkAccessPage;

const PageWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const BoardContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BoardStateArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 100vw;
  height: 70%;
`;

const BoardDescriptionArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-width: 100vw;
  height: 30%;
`;

const BoardTitle = styled.h1``;

const TagContainer = styled.div`
  display: flex;
`;
