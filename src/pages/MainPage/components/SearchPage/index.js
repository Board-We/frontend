import styled from "styled-components";
import Slide from "../BoardSlide/Slide";
import { ReactComponent as ChevronTop } from "../../../../assets/icons/chevronTop.svg";
import BoardSlide from "../BoardSlide";
import { useCallback, useEffect, useState } from "react";
import { requestHotBoardList } from "../../../../api/boardsApi";

const SearchPage = ({ keyword, searchResults }) => {
  const [hotBoardList, setHotBoardList] = useState([]);
  const handleClickChevronTop = () => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  };

  const getHotBoardsData = useCallback(async () => {
    const data = await requestHotBoardList();
    if (data) setHotBoardList(data);
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
              boards={hotBoardList}
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
                      sx={"margin: 0;"}
                    />
                  ))}
                </SearchResultList>
                <ButtonWrapper>
                  <ChevronTopButton onClick={handleClickChevronTop}>
                    <ChevronTop />
                  </ChevronTopButton>
                </ButtonWrapper>
              </>
            ) : (
              <HotBoardSection>
                <BoardSlide
                  title="지금 핫한 인기보드"
                  boards={hotBoardList}
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
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const HotBoardSection = styled.div`
  width: 100%;
  height: 80vh;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: transparent;
`;

const SearchResultHeader = styled.div`
  width: 100%;
  padding: 1rem;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  border-bottom: 1px solid ${(props) => props.theme.colors.grey_35};
  background-color: ${(props) => props.theme.colors.white};

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
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10rem;
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
  gap: 1rem;
  margin-top: 1rem;
  align-items: center;
  justify-items: center;
`;

const ButtonWrapper = styled.div`
  position: fixed;
  width: 100%;
  max-width: 600px;
  bottom: 2rem;
  display: flex;
  justify-content: end;
  padding-right: 1rem; ;
`;

const ChevronTopButton = styled.button`
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
