import React from "react";
import styled from "styled-components";
import SmallTitle from "../../../components/label/smallTitle";
import LoadingImage from "../../../assets/images/loading.png";
import Description from "../../../components/label/description";

const Loading = () => {
  return (
    <PageWrapper>
      <BodyContainer>
        <TextContainer>
          <SmallTitle>잠시만 기다려주세요 🔍</SmallTitle>
          <Description>보드를 가져오는 중입니다</Description>
        </TextContainer>
        <OnEndImage />
      </BodyContainer>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
`;

const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  margin: auto auto;
`;

const OnEndImage = styled.div`
  width: 75vw;
  height: 75vw;
  max-width: 400px;
  max-height: 400px;
  background-image: url(${LoadingImage});
  background-size: contain;
`;

export default Loading;
