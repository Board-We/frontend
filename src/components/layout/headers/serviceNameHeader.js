import React from "react";
import styled from "styled-components";
import { ReactComponent as Share } from "../../../assets/share.svg";
import { ReactComponent as Config } from "../../../assets/config.svg";

const ServiceNameHeader = ({
  canShare,
  canConfig,
  onClickShare,
  onClickConfig,
}) => {
  return (
    <ComponentWrapper>
      <ServiceNameHeaderContainer>
        <ServiceNameHeaderTitle>Side project</ServiceNameHeaderTitle>
        <ServiceNameHeaderButtonGroup>
          {canShare && (
            <ShareButton onClick={onClickShare}>
              <Share />
            </ShareButton>
          )}
          {canConfig && (
            <ConfigButton onClick={onClickConfig}>
              <Config />
            </ConfigButton>
          )}
        </ServiceNameHeaderButtonGroup>
      </ServiceNameHeaderContainer>
    </ComponentWrapper>
  );
};

const ComponentWrapper = styled.div`
  width: 100vw;
  max-width: 700px;
  height: 4rem;
  position: fixed;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 1rem;
  background-color: white;
`;

const ServiceNameHeaderTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  display: flex;
  align-items: center;
`;

const ServiceNameHeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const ServiceNameHeaderButtonGroup = styled.div`
  display: flex;
  align-items: center;
`;

const ShareButton = styled.button`
  border: none;
  background-color: transparent;
  margin-right: 1rem;
  cursor: pointer;
`;

const ConfigButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

export default ServiceNameHeader;
