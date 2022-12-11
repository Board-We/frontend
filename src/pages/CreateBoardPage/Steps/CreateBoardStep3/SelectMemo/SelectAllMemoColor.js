import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { boardState } from "../../../../../store";

const SelectAllMemoColor = ({ memoIndex, isBackground }) => {
  const [board, setBoard] = useRecoilState(boardState);

  const handleBoardColor = (e) => {
    if (isBackground === "0") {
      // 메모지 배경색
      let memoColor = [...board.memoTypes];
      memoColor[memoIndex] = e.target.value;
      setBoard((prev) => {
        return {
          ...prev,
          memoTypes: memoColor,
        };
      });
    } else {
      // 메모지 폰트색
      let fontColor = [...board.memoColors];
      fontColor[memoIndex] = e.target.value;
      setBoard((prev) => {
        return {
          ...prev,
          memoColors: fontColor,
        };
      });
    }
  };

  return (
    <ColorPickerContainer>
      {/*color picker 추후 교체 필요*/}
      <ColorPickerInput
        type="color"
        value={
          isBackground === "0"
            ? board.memoTypes[memoIndex]
            : board.memoColors[memoIndex]
        }
        onChange={handleBoardColor}
      />
    </ColorPickerContainer>
  );
};

export default SelectAllMemoColor;

const ColorPickerContainer = styled.div`
  display: flex;
  width: 100%;
  height: 15vw;
  justify-content: center;
`;

const ColorPickerInput = styled.input`
  width: 30%;
  height: inherit;
`;
