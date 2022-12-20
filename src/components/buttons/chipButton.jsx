import React from "react";
import styled from "styled-components";

const ChipButton = ({
  width,
  flat,
  fit = false,
  text,
  onClick,
  children,
  backgroundGrey,
}) => {
  console.log(backgroundGrey);
  return (
    <ComponentWrapper
      width={width}
      flat={flat}
      fit={fit}
      onClick={onClick}
      backgroundGrey={backgroundGrey}
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
  padding: ${(props) => (props.fit ? `0.25rem 1.25rem` : `1.7rem 3rem`)};
  width: ${(props) => (props.width ? props.width : "fit-content")};
  height: 3rem;
  font-size: 1rem;
  color: ${(props) => props.theme.colors.black};
  border-radius: 12px;
  font-weight: 500;
  background-color: ${(props) =>
    props.backgroundGrey
      ? props.theme.colors.grey_50
      : props.theme.colors.primary};
  box-shadow: ${(props) => (props.flat ? "" : "2px 2px 8px black")};
  user-select: none;
  cursor: pointer;
`;

export default ChipButton;
