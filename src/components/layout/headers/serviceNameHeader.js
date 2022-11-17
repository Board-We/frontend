import React from "react";
import styled from "styled-components";

const ServiceNameHeader = () => {
  return (
    <ComponentWrapper>
      <ServiceNameHeaderContainer>
        <ServiceNameHeaderTitle>Side project</ServiceNameHeaderTitle>
      </ServiceNameHeaderContainer>
    </ComponentWrapper>
  );
};

const ComponentWrapper = styled.div`
  width: 100vw;
  max-width: 700px;
  position: fixed;
  display: flex;
  justify-content: flex-start;
  padding: 1rem;
  background-color: white;
`;

const ServiceNameHeaderTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
`;

const ServiceNameHeaderContainer = styled.div``;

export default ServiceNameHeader;
