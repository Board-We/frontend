import styled from "styled-components";
import BoardSlider from "../ReccomendBoardSlide/BoardSlider";
import Slide from "../ReccomendBoardSlide/Slide";
import { ReactComponent as ChevronTop } from "../../../../assets/chevronTop.svg";

const SearchPage = ({ reccomendBoards, keyword, results }) => {
  const handleClickChevronTop = () => {
    window.scroll(0, 0);
  };
  return (
    <SearchPageBody>
      {results ? (
        results.length > 0 ? (
          <>
            <SearchResultSection>
              <p>{`${keyword}에 대한 검색결과 입니다.`}</p>
              <SearchResultList>
                {results.map((result) => (
                  <Slide
                    key={result.boardName}
                    boardLink={result.boardLink}
                    boardName={result.boardName}
                    boardViews={result.boardViews}
                    boardBackground={result.boardBackground}
                  />
                ))}
              </SearchResultList>
            </SearchResultSection>
            <ChevronTopButton onClick={handleClickChevronTop}>
              <ChevronTop />
            </ChevronTopButton>
          </>
        ) : (
          <NoResultsSection>
            <p>{`${keyword}에 대한 검색결과가 없습니다.`}</p>
            <p>대신 이런 인기보드는 어떠세요?</p>
          </NoResultsSection>
        )
      ) : (
        <ReccomendBoardSection>
          <p>인기 보드 추천</p>
          <BoardSlider reccomendBoards={reccomendBoards} />
        </ReccomendBoardSection>
      )}
    </SearchPageBody>
  );
};

export default SearchPage;

const SearchPageBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const NoResultsSection = styled.div`
  width: 100%;
  border-bottom: 0.1rem solid #c6c6c6;
  padding-bottom: 1rem;
  margin-bottom: 1rem;

  p {
    text-align: start;
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;
  }

  p:last-child {
    font-size: 1rem;
    font-weight: 400;
    margin-top: 0.5rem;
  }
`;

const ReccomendBoardSection = styled.div`
  width: 100%;
  height: 38vh;

  p {
    text-align: start;
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;
  }
`;

const SearchResultSection = styled.div`
  p {
    text-align: start;
    font-size: 1.1rem;
    font-weight: 600;
    margin: 0;
  }
`;

const SearchResultList = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 0fr);
  row-gap: 1rem;
  margin-top: 1rem;
`;

const ChevronTopButton = styled.button`
  position: fixed;
  bottom: 2vw;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.25));
  padding: 0.5rem;
  border-radius: 1.5rem;
  border: none;
  cursor: pointer;
`;
