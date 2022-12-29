import React from "react";
import styled from "styled-components";

const ChipButton = ({ width, onClick, children, style = {} }) => {
  return (
    <ComponentWrapper width={width} onClick={onClick} style={style}>
      {children}
    </ComponentWrapper>
  );
};

const ComponentWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 1.7rem 3rem;
  max-width: ${(props) => (props.width ? props.width : "600px")};
  height: 3rem;
  font-size: 1rem;
  border-radius: 12px;
  font-weight: 500;
  user-select: none;
  cursor: pointer;
  ${(props) => (props.style ? props.style : null)};
  background-color: ${(props) =>
    props.style.backgroundColor
      ? props.theme.colors[props.style.backgroundColor]
      : props.theme.colors.primary};
`;

export default ChipButton;
