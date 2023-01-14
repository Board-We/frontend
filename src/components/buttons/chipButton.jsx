import React from "react";
import styled from "styled-components";

const ChipButton = ({ fixed, onClick, children, background }) => {
  return (
    <ComponentWrapper fixed={fixed}>
      <ButtonContainer onClick={onClick} background={background}>
        {children}
      </ButtonContainer>
    </ComponentWrapper>
  );
};

const ComponentWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  ${(props) =>
    props.fixed
      ? ` position: fixed;
  bottom: 1.5%;
  z-index: 99999;`
      : null};
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 90%;
  align-items: center;
  justify-content: center;
  padding: 1.7rem 3rem;
  height: 3rem;
  font-size: 1rem;
  border-radius: 12px;
  font-weight: 500;
  user-select: none;
  left: 0;
  right: 0;
  margin: 0 auto;
  cursor: pointer;
  ${(props) => (props.style ? props.style : null)};
  background-color: ${(props) =>
    props.background
      ? props.background
      : props.theme.colors.primary};
`;

export default ChipButton;
