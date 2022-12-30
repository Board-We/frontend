import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  requestReccomendBoardList,
  requestSearchBoard,
} from "../../api/boardsApi";
import ChipButton from "../../components/buttons/chipButton";
import ServiceNameHeader from "../../components/layout/headers/serviceNameHeader";
import AlertModal from "../../components/modals/alertModal";
import EnterLinkInput from "./components/EnterLinkInput";
import BoardSlide from "./components/BoardSlide/index";
import SearchPage from "./components/SearchPage";
import ServiceFooter from "./components/ServiceFooter";
import mainImage from "../../assets/images/mainImage.png";
import { theme } from "../../styles/theme";
import { boardState } from "../../store";
import { useRecoilState } from "recoil";

const Main = () => {
  const navigate = useNavigate();
  const [reccomendBoardList, setReccomendBoardList] = useState([]);
  const [board, setBoard] = useRecoilState(boardState);
  const [searchModeType, setSearchModeType] = useState("");
  const [query, setQuery] = useState(""); // input을 통해 실제로 backend로 전달되는 키워드 값
  const [keyword, setKeyword] = useState(""); // 결과창 키워드 표시를 위한 값
  const [searchResults, setSearchResults] = useState([]);

  const [isOpenInvalidLinkModal, setIsOpenInvalidLinkModal] = useState(false);

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

  const handleKeyDownSearchInput = async (e) => {
    if (e.code === "Enter" && !e.nativeEvent.isComposing) {
      setKeyword(query);
      const searchBoardsResult = await requestSearchBoard({
        query,
      });

      if (searchBoardsResult) setSearchResults(searchBoardsResult);
    }
  };

  const initBoard = () => {
    const initialBoardForm = {
      name: "",
      description: "",
      tags: [],
      writingStartTime: new Date(),
      writingEndTime: new Date(new Date().getTime() + 1209600000),
      openStartTime: new Date(new Date().getTime() + 1209601000),
      openEndTime: new Date(new Date().getTime() + 2419200000),
      password: undefined,
      openType: "",
      boardThemeId: 0,
      boardBackground: theme.colors.defaultBoardBg,
      boardFont: "san-serif",
      memos: [],
      memoThemes: [
        {
          memoBackground: theme.colors.defaultMemoBg,
          memoTextColor: theme.colors.black,
        },
      ],
    };
    setBoard(initialBoardForm);
  };

  const getReccomendBoardList = useCallback(async () => {
    const data = await requestReccomendBoardList();
    if (data) setReccomendBoardList(data);
  }, []);

  useEffect(() => {
    getReccomendBoardList();
  }, [getReccomendBoardList]);

  useEffect(() => {
    initBoard();
  }, []);

  return (
    <>
      <PageWrapper
        onWheel={handleWheelPage}
        onTouchStart={handleTouchStartPage}
        onTouchMove={handleTouchMovePage}
        noSearchResult={searchModeType && searchResults.length === 0}
      >
        <MainPageContainer>
          <ServiceNameHeader
            searchModeType={searchModeType}
            setSearchModeType={setSearchModeType}
            setQuery={setQuery}
            onKeyDownSearchInput={handleKeyDownSearchInput}
            onSearch={() => setSearchModeType("board")}
          />
          {!searchModeType ? (
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
        {isOpenInvalidLinkModal && (
          <AlertModal
            open={isOpenInvalidLinkModal}
            text="유효하지 않은 링크입니다."
            buttonTextArray={["확인"]}
            onClickArray={[() => setIsOpenInvalidLinkModal(false)]}
            onClose={() => setIsOpenInvalidLinkModal(false)}
          />
        )}
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
  background-image: url(${mainImage});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;
