import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getReccomendBoardsList, searchBoards } from "../../api/boardsApi";
import { reccomendBoardsData } from "../../api/mockData";
import ChipButton from "../../components/buttons/chipButton";
import ServiceNameHeader from "../../components/layout/headers/serviceNameHeader";
import AlertModal from "../../components/modals/alertModal";
import EnterLinkInput from "./components/EnterLinkInput";
import BoardSlide from "./components/BoardSlide/index";
import SearchPage from "./components/SearchPage";
import ServiceFooter from "./components/ServiceFooter";

const Main = () => {
  const navigate = useNavigate();
  const [reccomendBoards, setReccomendBoards] = useState(reccomendBoardsData);

  const [searchModeType, setSearchModeType] = useState("");
  const [query, setQuery] = useState(""); // input을 통해 실제로 backend로 전달되는 키워드 값
  const [keyword, setKeyword] = useState(""); // 결과창 키워드 표시를 위한 값
  const [searchResults, setSearchResults] = useState([]);

  const [isOpenInvalidLinkModal, setIsOpenInvalidLinkModal] = useState(false);

  const [isFooter, setIsFooter] = useState(false);
  const [mobileStartY, setMobileStartY] = useState(0);

  const handleClickCreateNewboard = () => {
    navigate("/board/new");
  };

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

  const handleClickSearch = () => {
    setSearchModeType("board");
  };

  const handleCloseInvalidLinkModal = () => {
    setIsOpenInvalidLinkModal(false);
  };

  const handleKeyDownSearchInput = async (e) => {
    if (e.code === "Enter" && !e.nativeEvent.isComposing) {
      setKeyword(query);
      const searchBoardsResult = await searchBoards({
        query,
      });

      if (searchBoardsResult) setSearchResults(searchBoardsResult);
    }
  };

  const getReccomendBoardsData = useCallback(async () => {
    const data = await getReccomendBoardsList();
    if (data) setReccomendBoards(data);
  }, []);

  useEffect(() => {
    getReccomendBoardsData();
  }, [getReccomendBoardsData]);

  return (
    <>
      <PageWrapper
        onWheel={handleWheelPage}
        onTouchStart={handleTouchStartPage}
        onTouchMove={handleTouchMovePage}
      >
        <MainPageContainer>
          <ServiceNameHeader
            searchModeType={searchModeType}
            setSearchModeType={setSearchModeType}
            setQuery={setQuery}
            onKeyDownSearchInput={handleKeyDownSearchInput}
            onSearch={handleClickSearch}
          />
          {!searchModeType ? (
            <>
              <ServiceMainImage>
                <ChipButton
                  text="새 보드 만들기"
                  width="100%"
                  onClick={handleClickCreateNewboard}
                  flat
                />
              </ServiceMainImage>
              <MainPageBody>
                <EnterLinkInput />
                <BoardSlide
                  title="추천 보드"
                  description="공개한 보드는 랜덤으로 추천됩니다!"
                  boards={reccomendBoards}
                  positionValue="70%"
                />
              </MainPageBody>
              {isFooter && <ServiceFooter />}
            </>
          ) : (
            <SearchPage keyword={keyword} searchResults={searchResults} />
          )}
        </MainPageContainer>
      </PageWrapper>

      {isOpenInvalidLinkModal && (
        <AlertModal
          open={isOpenInvalidLinkModal}
          text="유효하지 않은 링크입니다."
          buttonTextArray={["확인"]}
          onClickArray={[handleCloseInvalidLinkModal]}
          onClose={handleCloseInvalidLinkModal}
        />
      )}
    </>
  );
};

export default Main;

const PageWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  overflow: hidden;
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
`;
