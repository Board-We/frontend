import React, { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { boardState } from "../../../../store";
import SelectBackground from "./SelectMenu/SelectBackground";
import SelectMemo from "./SelectMenu/SelectMemo";
import SelectTheme from "./SelectMenu/SelectTheme";

function CreateBoardStep3() {
  const [selectState, setSelectState] = useState("");
  const btnValue = ["테마", "배경", "메모지"];
  const [boardURL, setBoardURL] = useState("");
  const [board, setBoard] = useRecoilState(boardState);

  const selectCtrl = (e) => {
    setSelectState(e.target.value);
  };

  const renderingPicker = () => {
    switch (selectState) {
      case "0":
        return <SelectTheme />;
      case "1":
        return <SelectBackground setBoardURL={setBoardURL} />;
      case "2":
        return <SelectMemo />;
      default:
        break;
    }
  };

  return (
    <>
      <BoardArea>
        <h1>보드를 마음껏 꾸며주세요.</h1>
        <BoardCanvas />
      </BoardArea>
      <SelectButtonArea>
        {btnValue.map((value, idx) => {
          return (
            <React.Fragment key={idx}>
              <SelectButton
                value={idx}
                className={"btn" + (idx == selectState ? " active" : "")}
                onClick={selectCtrl}
              >
                {value}
              </SelectButton>
            </React.Fragment>
          );
        })}
      </SelectButtonArea>
      {renderingPicker()}
    </>
  );
}

export default CreateBoardStep3;

const BoardArea = styled.div`
  display: flex;
  flex-direction: column;
  h1 {
    font-size: 1.25rem;
    text-align: left;
    margin-bottom: 1.5rem;
  }
`;

const BoardCanvas = styled.div`
  width: 100%;
  height: 55vh;
  background-color: #d9d9d9;
  border-radius: 4px;
`;

const SelectButtonArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 2rem;
`;

const SelectButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  width: 7rem;
  height: 5vh;
  border: none;
  font-size: 0.9rem;
  background-color: #eeeeee;
  border-radius: 8px;
  user-select: none;
  cursor: pointer;
  &.active {
    color: white;
    background-color: #626262;
  }
`;
