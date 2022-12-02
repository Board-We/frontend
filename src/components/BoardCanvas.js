import React from "react";
import styled from "styled-components";

const BoardCanvas = ({ color }) => {
  return <BoardContainer color={color}></BoardContainer>;
};

export default BoardCanvas;

const BoardContainer = styled.div.attrs((props) => ({
  style: {
    background: props.color,
  },
}))`
  width: 100%;
  height: 50vh;
  border-radius: 4px;
`;
