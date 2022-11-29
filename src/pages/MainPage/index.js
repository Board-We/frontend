import styled from "styled-components";
import ChipButton from "../../components/buttons/chipButton";
import ServiceNameHeader from "../../components/layout/headers/serviceNameHeader";
import EnterWithLink from "./components/EnterWithLink";
import ReccomendBoard from "./components/ReccomendBoard";

const Main = () => {
  return (
    <PageWrapper>
      <MainPageContainer>
        <ServiceNameHeader
          canShare={false}
          canConfig={false}
          onClickConfig={false}
          onClickShare={false}
        />
        <ServiceMainImage />
        <MainPageBody>
          <EnterWithLink />
          <ReccomendBoard />
          <ChipButton text="새 보드 만들기" width="100%" />
        </MainPageBody>
      </MainPageContainer>
    </PageWrapper>
  );
};

export default Main;

const PageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
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
  height: 40rem;
  background-color: #d9d9d9;
`;

const PageFooter = styled.div`
  width: 100%;
  height: 10rem;
  background-color: #f0f0f0;
`;
