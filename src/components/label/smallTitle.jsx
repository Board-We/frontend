import React from "react";
import styled from "styled-components";

const SmallTitle = ({ text, color = "black", children, style }) => {
  return (
    <ComponentWrapper style={style} color={color}>
      {text}
      {children}
    </ComponentWrapper>
  );
};

const ComponentWrapper = styled.span`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${(props) => props.color};
  opacity: 1;
  margin-bottom: 0.2rem;
`;

export default SmallTitle;
