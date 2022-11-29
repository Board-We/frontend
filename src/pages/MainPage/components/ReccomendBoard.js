import styled from "styled-components";
import Slider from "./Slider";

const ReccomendBoard = () => {
  return (
    <ReccomendBoardContainer>
      <ReccomendBoardHeader>
        <p>인기 보드 추천</p>
        <p>공개한 보드는 랜덤으로 추천됩니다!</p>
      </ReccomendBoardHeader>
      <ReccomendBoardBody>
        <Slider />
      </ReccomendBoardBody>
    </ReccomendBoardContainer>
  );
};

export default ReccomendBoard;

const ReccomendBoardContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
`;

const ReccomendBoardHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  p:first-child {
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;
  }

  p:last-child {
    font-size: 0.8rem;
    margin: 0;
    margin-top: 0.2rem;
    color: #4e4e4e;
  }
`;

const ReccomendBoardBody = styled.div`
  width: 100%;
  height: 100%;
`;
