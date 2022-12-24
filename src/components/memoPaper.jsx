import React from "react";
import styled from "styled-components";

const MemoPaper = ({ text, background = "", color, isSelected }) => {
  return (
    <ComponentWrapper
      background={background}
      color={color}
      isSelected={isSelected}
    >
      {text}
    </ComponentWrapper>
  );
};

const ComponentWrapper = styled.div`
  background: ${(props) =>
    props.background.includes("http")
      ? `url(${props.background})`
      : props.background};
  color: ${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  justify-self: center;
  width: 6rem;
  height: 6rem;
  font-size: 1rem;
  font-weight: 400;
  border-radius: 0.25rem;
  border: ${(props) =>
    props.isSelected
      ? `2px solid ${props.theme.colors.primary}`
      : `0.5px solid #EEEEEE`};
`;

export default MemoPaper;
