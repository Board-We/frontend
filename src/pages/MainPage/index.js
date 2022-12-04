import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ChipButton from "../../components/buttons/chipButton";
import ServiceNameHeader from "../../components/layout/headers/serviceNameHeader";
import EnterLinkInput from "./components/EnterLinkInput";
import ReccomendBoardSlide from "./components/ReccomendBoardSlide/index";
import ServiceFooter from "./components/ServiceFooter";

const Main = () => {
  const navigate = useNavigate();
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

  return (
    <PageWrapper
      onWheel={handleWheelPage}
      onTouchStart={handleTouchStartPage}
      onTouchMove={handleTouchMovePage}
    >
      <MainPageContainer>
        <ServiceNameHeader
          canShare={false}
          canConfig={false}
          onClickConfig={false}
          onClickShare={false}
        />
        <ServiceMainImage />
        <MainPageBody>
          <EnterLinkInput />
          <ReccomendBoardSlide />
          <ChipButton
            text="새 보드 만들기"
            width="100%"
            onClick={handleClickCreateNewboard}
          />
        </MainPageBody>

        {isFooter && <ServiceFooter />}
      </MainPageContainer>
    </PageWrapper>
  );
};

export default Main;

const PageWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const MainPageContainer = styled.div`
  width: 100%;
  height: 100%;
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
  height: 40vh;
  background-color: #d9d9d9;
`;
