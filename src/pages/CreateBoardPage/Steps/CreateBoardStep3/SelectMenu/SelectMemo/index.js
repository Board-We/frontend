import React, { useState } from "react";
import styled from "styled-components";
import SelectBasicMemoType from "./SelectBasicMemoType";
import SelectFontType from "./SelectFontType";
import SelectImage from "./SelectImage";

function SelectMemo() {
  const [buttonSelect, setButtonSelect] = useState("0");
  const buttonValue = ["기본 메모지", "이미지", "글자 종류"];

  const handleClick = (e) => {
    setButtonSelect(e.target.value);
  };

  const renderMemoType = () => {
    switch (buttonSelect) {
      case "0":
        return <SelectBasicMemoType />;
      case "1":
        return <SelectImage />;
      case "2":
        return <SelectFontType />;
      default:
        break;
    }
  };
  return (
    <MemoPickerContainer>
      <ButtonContainer>
        {buttonValue.map((item, idx) => {
          return (
            <React.Fragment key={idx}>
              <SelectButton
                value={idx}
                className={"btn" + (idx == buttonSelect ? " active" : "")}
                onClick={handleClick}
              >
                {item}
              </SelectButton>
            </React.Fragment>
          );
        })}
      </ButtonContainer>
      {renderMemoType()}
    </MemoPickerContainer>
  );
}

export default SelectMemo;

const MemoPickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #eeeeee;
  margin-top: 2rem;
  height: 90vh;
`;

const ButtonContainer = styled.div`
  margin-top: 2rem;
  margin-left: 2rem;
`;
const SelectButton = styled.button`
  border: none;
  cursor: pointer;
  margin-right: 2rem;
  &.active {
    font-weight: 600;
  }
`;
