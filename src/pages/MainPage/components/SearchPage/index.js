import styled from "styled-components";
import BoardSlider from "../ReccomendBoardSlide/BoardSlider";

const SearchPage = () => {
  return (
    <SearchPageBody>
      <ReccomendBoardSection>
        <p>인기 보드 추천</p>
        <BoardSlider />
      </ReccomendBoardSection>
    </SearchPageBody>
  );
};

export default SearchPage;

const SearchPageBody = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const ReccomendBoardSection = styled.div`
  margin-top: 3rem;

  p {
    text-align: start;
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;
  }
`;
