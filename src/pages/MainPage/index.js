import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  requestReccomendBoardList,
  requestSearchBoard,
} from "../../api/boardsApi";
import ChipButton from "../../components/buttons/chipButton";
import ServiceNameHeader from "../../components/layout/headers/serviceNameHeader";
import EnterLinkInput from "./components/EnterLinkInput";
import BoardSlide from "./components/BoardSlide/index";
import SearchPage from "./components/SearchPage";
import ServiceFooter from "./components/ServiceFooter";
import mainPageImage from "../../assets/images/mainPageImage.jpg";
import Toast from "./components/toast";

const Main = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [reccomendBoardList, setReccomendBoardList] = useState([]);
  const [isBoardDeleted, setIsBoardDeleted] = useState(false);

  const [keyword, setKeyword] = useState(""); // 결과창 키워드 표시를 위한 값
  const [searchResults, setSearchResults] = useState(null);

  const [headerState, setHeaderState] = useState({
    isSearchMode: false,
    searchType: null, // board | memo | deleteMemo
    isEnterPress: false,
    menu: [],
    configMenu: [],
    configMenuHandler: [],
    query: "",
    checkedMemoList: [],
  });

  const [isFooter, setIsFooter] = useState(false);
  const [mobileStartY, setMobileStartY] = useState(0);

  const handleWheelPage = (e) => {
    if (e.deltaY > 0) setIsFooter(true);
  };

  // mobile event handlers
  const handleTouchStartPage = (e) => {
    const startY = e.touches[0].pageY;
    setMobileStartY(startY);
  };

  const handleTouchMovePage = (e) => {
    const deltaY = mobileStartY - e.touches[0].pageY;
    if (deltaY > 0) setIsFooter(true);
  };

  const getReccomendBoardList = useCallback(async () => {
    const data = await requestReccomendBoardList();
    if (data) setReccomendBoardList(data);
  }, []);

  useEffect(() => {
    const getReccomendBoardList = async () => {
      const data = await requestReccomendBoardList();
      if (data) setReccomendBoardList(data);
    };
    getReccomendBoardList();
  }, [getReccomendBoardList]);

  useEffect(() => {
    const searchBoard = async () => {
      setKeyword(headerState.query);
      const searchBoardsResult = await requestSearchBoard({
        query: headerState.query,
      });

      if (searchBoardsResult) setSearchResults(searchBoardsResult);
    };

    if (headerState.isEnterPress) {
      searchBoard();
      setHeaderState({ ...headerState, isEnterPress: false });
    }
  }, [headerState.isEnterPress]);

  useEffect(() => {
    if (!headerState.isSearchMode) {
      setSearchResults(null);
      setKeyword("");
    }
  }, [headerState.isSearchMode]);

  useEffect(() => {
    if (location.state && location.state.isDeleted) {
      setIsBoardDeleted(true);
      navigate("/", { replace: true });
      setTimeout(() => {
        setIsBoardDeleted(false);
      }, 3000);
    }
  }, []);

  return (
    <>
      <PageWrapper
        onWheel={handleWheelPage}
        onTouchStart={handleTouchStartPage}
        onTouchMove={handleTouchMovePage}
        noSearchResult={
          headerState.isSearchMode &&
          searchResults &&
          searchResults.length === 0
        }
      >
        <MainPageContainer>
          <ServiceNameHeader
            headerState={{
              ...headerState,
              menu: ["search"],
              searchType: "board",
            }}
            setHeaderState={setHeaderState}
          />
          {!headerState.isSearchMode ? (
            <>
              <ServiceMainImage />
              <ChipButton fixed onClick={() => navigate("/board/new")}>
                새 보드 만들기
              </ChipButton>
              <MainPageBody>
                <EnterLinkInput />
                <BoardSlide
                  title="추천 보드"
                  description="공개한 보드는 랜덤으로 추천됩니다!"
                  boards={reccomendBoardList}
                  positionValue="70%"
                />
              </MainPageBody>
              {isFooter && <ServiceFooter />}
            </>
          ) : (
            <SearchPage keyword={keyword} searchResults={searchResults} />
          )}
        </MainPageContainer>
        {isBoardDeleted && <Toast text="보드가 삭제되었습니다." />}
      </PageWrapper>
    </>
  );
};

export default Main;

const PageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: ${(props) => props.noSearchResult && "100vh"};
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow: hidden;
  background-color: ${(props) =>
    props.noSearchResult && props.theme.colors.grey_50};
`;

const MainPageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MainPageBody = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 32px 16px;
`;

const ServiceMainImage = styled.div`
  width: 100%;
  height: 96vh;
  background-color: #d9d9d9;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  background-image: url(${mainPageImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;
