import styled from "styled-components";
import BoardSlider from "./BoardSlider";

const ReccomendBoardSlide = () => {
  return (
    <ReccomendBoardSlideContainer>
      <ReccomendBoardSlideHeader>
        <p>인기 보드 추천</p>
        <p>공개한 보드는 랜덤으로 추천됩니다!</p>
      </ReccomendBoardSlideHeader>
      <ReccomendBoardSlideBody>
        <BoardSlider />
      </ReccomendBoardSlideBody>
    </ReccomendBoardSlideContainer>
  );
};

export default ReccomendBoardSlide;

const ReccomendBoardSlideContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
`;

const ReccomendBoardSlideHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 1rem;

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

const ReccomendBoardSlideBody = styled.div`
  width: 100%;
  height: 100%;
`;
