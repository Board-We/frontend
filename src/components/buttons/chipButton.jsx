import React from "react";
import styled from "styled-components";

const ChipButton = ({
  width,
  background = "grey",
  color = "white",
  round,
  flat,
  text,
  onClick,
}) => {
  return (
    <ComponentWrapper
      width={width}
      background={background}
      color={color}
      round={round}
      flat={flat}
      onClick={onClick}
    >
      {text}
    </ComponentWrapper>
  );
};

const ComponentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 3rem;
  width: ${(props) => (props.width ? props.width : "fit-content")};
  height: 3rem;
  font-size: 1rem;
  color: ${(props) => props.color};
  border-radius: ${(props) =>
    props.round || props.round === undefined ? `1.5rem` : "0"};
  background-color: ${(props) => props.background};
  box-shadow: ${(props) => (props.flat ? "" : "2px 2px 8px black")};
  user-select: none;
`;

export default ChipButton;
