import React from "react";
import styled from "styled-components";

const ChipButton = ({
  width,
  round,
  flat,
  fit = false,
  text,
  onClick,
  children,
}) => {
  return (
    <ComponentWrapper
      width={width}
      round={round}
      flat={flat}
      fit={fit}
      onClick={onClick}
    >
      {text}
      {children}
    </ComponentWrapper>
  );
};

const ComponentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${(props) => (props.fit ? `0.25rem 1.25rem` : `1.5rem 3rem`)};
  width: ${(props) => (props.width ? props.width : "fit-content")};
  height: 3rem;
  font-size: 1rem;
  color: ${(props) => props.theme.colors.black};
  border-radius: ${(props) =>
    props.round || props.round === undefined ? `1.5rem` : "0"};
  background-color: ${(props) => props.theme.colors.primary};
  box-shadow: ${(props) => (props.flat ? "" : "2px 2px 8px black")};
  user-select: none;
  cursor: pointer;
`;

export default ChipButton;
