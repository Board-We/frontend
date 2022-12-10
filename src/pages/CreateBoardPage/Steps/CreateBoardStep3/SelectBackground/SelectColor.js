import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { boardState } from "../../../../../store";

const SelectColor = ({ setBoardURL }) => {
  const [board, setBoard] = useRecoilState(boardState);

  const handleBoardColor = (e) => {
    let setBgColor = { ...board, background: e.target.value };
    setBoard(setBgColor);
  };

  return (
    <SubContainer>
      <ColorPickerContainer>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {/*color picker 추후 교체 필요*/}
          <ColorPickerInput
            type="color"
            value={board.background}
            onChange={handleBoardColor}
          />
        </div>
      </ColorPickerContainer>
    </SubContainer>
  );
};

export default SelectColor;

const SubContainer = styled.div`
  margin-left: 1rem;
  margin-top: 1rem;
  h1 {
    text-align: left;
    font-size: 1rem;
    margin: 0.7rem 0;
  }
  p {
    text-align: left;
    font-weight: 500;
    font-size: 0.7rem;
    margin-bottom: 0.7rem;
    color: #797979;
  }
`;

const ColorPickerInput = styled.input`
  width: 25vw;
  height: 10vh;
`;

const ColorPickerContainer = styled.div`
  display: flex;
`;
