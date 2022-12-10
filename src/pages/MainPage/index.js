import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ChipButton from "../../components/buttons/chipButton";
import ServiceNameHeader from "../../components/layout/headers/serviceNameHeader";
import AlertModal from "../../components/modals/alertModal";
import EnterLinkInput from "./components/EnterLinkInput";
import ReccomendBoardSlide from "./components/ReccomendBoardSlide/index";
import SearchPage from "./components/SearchPage";
import ServiceFooter from "./components/ServiceFooter";

const Main = () => {
  const navigate = useNavigate();

  const [isSearchMode, setIsSearchMode] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState([1]);

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
    console.log("asdfadsf");
    const deltaY = mobileStartY - e.touches[0].pageY;

    if (deltaY > 0) setIsFooter(true);
  };

  const handleClickSearch = () => {
    setIsSearchMode(true);
  };

  const handleCloseInvalidLinkModal = () => {
    setIsOpenInvalidLinkModal(false);
  };

  return (
    <>
      <PageWrapper
        onWheel={handleWheelPage}
        onTouchStart={handleTouchStartPage}
        onTouchMove={handleTouchMovePage}
      >
        <MainPageContainer>
          <ServiceNameHeader
            isSearchMode={isSearchMode}
            setIsSearchMode={setIsSearchMode}
            setKeyword={setKeyword}
            canShare={false}
            canConfig={false}
            canSearch={true}
            onClickSearch={handleClickSearch}
            onClickConfig={false}
            onClickShare={false}
          />
          {!isSearchMode ? (
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
                <ReccomendBoardSlide />
              </MainPageBody>
              {isFooter && <ServiceFooter />}
            </>
          ) : (
            <SearchPage results={results} />
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
  display: flex;
  flex-direction: column;
  padding: 1rem;
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