import styled from "styled-components";
import BoardSlider from "./BoardSlider";

const ReccomendBoardSlide = ({ reccomendBoards }) => {
  return (
    <ReccomendBoardSlideContainer>
      <ReccomendBoardSlideHeader>
        <p>추천 보드</p>
        <p>공개한 보드는 랜덤으로 추천됩니다!</p>
      </ReccomendBoardSlideHeader>
      <ReccomendBoardSlideBody>
        <BoardSlider reccomendBoards={reccomendBoards} />
      </ReccomendBoardSlideBody>
    </ReccomendBoardSlideContainer>
  );
};

export default ReccomendBoardSlide;

const ReccomendBoardSlideContainer = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 104px;
`;

const ReccomendBoardSlideHeader = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 2rem;
  margin-bottom: 1.3rem;

  p:first-child {
    font-size: 1.5rem;
    font-weight: 600;
    margin: 0;
    color: ${(props) => props.theme.colors.black};
  }

  p:last-child {
    font-size: 0.8rem;
    margin: 0;
    margin-top: 0.2rem;
    color: ${(props) => props.theme.colors.grey_20};
  }
`;

const ReccomendBoardSlideBody = styled.div`
  width: 100%;
  height: 100%;
`;
