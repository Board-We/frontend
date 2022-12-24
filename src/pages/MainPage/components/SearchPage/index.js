import styled from "styled-components";
import Slide from "../BoardSlide/Slide";
import { ReactComponent as ChevronTop } from "../../../../assets/icons/chevronTop.svg";
import BoardSlide from "../BoardSlide";
import { useCallback, useEffect, useState } from "react";
import { getHotBoardsList } from "../../../../api/boardsApi";
import { reccomendBoardsData } from "../../../../api/mockData";

const SearchPage = ({ keyword, searchResults }) => {
  const [hotBoards, setHotBoards] = useState(reccomendBoardsData);

  const handleClickChevronTop = () => {
    window.scroll(0, 0);
  };

  const getHotBoardsData = useCallback(async () => {
    const data = await getHotBoardsList();
    if (data) setHotBoards(data);
  }, []);

  useEffect(() => {
    getHotBoardsData();
  }, [getHotBoardsData]);

  return (
    <>
      {keyword ? (
        <SearchResultHeader>
          {searchResults && searchResults.length > 0 ? (
            <div>
              "
              <KeywordBox>
                <span>{`${keyword}`}</span>
                <Highlight></Highlight>
              </KeywordBox>
              " 검색결과를 찾았어요 🔍
            </div>
          ) : searchResults && searchResults.length === 0 ? (
            <>
              <div>
                "
                <KeywordBox>
                  <span>{`${keyword}`}</span>
                  <Highlight></Highlight>
                </KeywordBox>
                " 검색결과가 없어요 😥
              </div>
              <p>대신 이런 인기보드는 어떠세요?</p>
            </>
          ) : null}
        </SearchResultHeader>
      ) : (
        <SearchPageHeader>
          <HotBoardSection>
            <BoardSlide
              title="지금 핫한 인기보드"
              boards={hotBoards}
              positionValue="5%"
            />
          </HotBoardSection>
        </SearchPageHeader>
      )}
      {keyword ? (
        <SearchPageBody>
          <SearchResultSection>
            {searchResults && searchResults.length > 0 ? (
              <>
                <SearchResultList>
                  {searchResults.map((result) => (
                    <Slide
                      key={result.boardName}
                      boardLink={result.boardLink}
                      boardName={result.boardName}
                      boardViews={result.boardViews}
                      boardBackground={result.boardBackground}
                    />
                  ))}
                </SearchResultList>

                <ChevronTopButton onClick={handleClickChevronTop}>
                  <ChevronTop />
                </ChevronTopButton>
              </>
            ) : (
              <HotBoardSection>
                <BoardSlide
                  title="지금 핫한 인기보드"
                  boards={hotBoards}
                  positionValue="0"
                />
              </HotBoardSection>
            )}
          </SearchResultSection>
        </SearchPageBody>
      ) : null}
    </>
  );
};

export default SearchPage;

const SearchPageBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.colors.grey_50}; ;
`;

const HotBoardSection = styled.div`
  width: 100%;
  height: 70vh;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const SearchResultHeader = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  border-bottom: 1px solid ${(props) => props.theme.colors.grey_35};

  p:first-child {
    font-size: 1.2rem;
    font-weight: 600;
  }
  p:last-child {
    font-size: 1rem;
    font-weight: 400;
    margin-top: 0.5rem;
    color: ${(props) => props.theme.colors.grey_20};
  }
`;

const SearchPageHeader = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
`;

const KeywordBox = styled.div`
  display: inline;
  width: fit-content;
  position: relative;
  z-index: 1;
`;

const Highlight = styled.div`
  display: inline;
  position: absolute;
  top: 40%;
  left: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.colors.primary_2};
`;

const SearchResultSection = styled.div`
  position: relative;

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
