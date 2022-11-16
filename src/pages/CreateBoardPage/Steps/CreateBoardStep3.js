import React, { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { boardState } from "../../../store";

function CreateBoardStep3() {
  const [selectState, setSelectState] = useState("");

  const [board, setBoard] = useRecoilState(boardState);

  const selectCtrl = (e) => {
    setSelectState(e.target.value);
  };

  const renderingPicker = () => {
    switch (selectState) {
      /* case "theme":
        return <SelectTheme />; */
      case "bgColor":
        return <SelectColor />;
      case "font":
        return <SelectFont />;
      default:
        break;
    }
  };

  return (
    <>
      <BoardArea>
        <h1>* 보드를 꾸며 주세요</h1>
        <BoardCanvas color={board.background} />
      </BoardArea>
      <SelectButtonArea>
        <SelectButton value="theme" onClick={selectCtrl}>
          테마
        </SelectButton>

        <SelectImage htmlFor="image-upload">
          <input
            type="file"
            id="image-upload"
            accept="image/jpg, image/png, image/jpeg"
            onChange={(e) => console.log(e.target.files[0])}
          />
          배경 이미지
        </SelectImage>

        <SelectButton value="bgColor" onClick={selectCtrl}>
          배경 색상
        </SelectButton>
        <SelectButton value="font" onClick={selectCtrl}>
          글자
        </SelectButton>
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

const BoardCanvas = styled.div.attrs((props) => ({
  style: {
    background: props.color,
  },
}))`
  width: 100%;
  height: 55vh;
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
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 15%;
  height: 5vh;
  border: none;
  font-size: 0.9rem;
  background-color: #eeeeee;
  border-radius: 8px;
  user-select: none;
  cursor: pointer;
`;

const SelectImage = styled(SelectButton.withComponent("label"))`
  font-size: 0.9rem;
  input {
    display: none;
  }
`;

const SelectColor = () => {
  const [board, setBoard] = useRecoilState(boardState);

  const handleBoardColor = (e) => {
    let setBgColor = { ...board, background: e.target.value };
    setBoard(setBgColor);
  };

  return (
    <ColorPickerContainer>
      <label htmlFor="pick-color">배경 컬러를 선택해주세요.</label>
      <input
        type="color"
        id="pick-color"
        value={board.background}
        onChange={handleBoardColor}
      />
    </ColorPickerContainer>
  );
};

const ColorPickerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #eeeeee;
  width: 100%;
  margin-top: 2rem;
  height: 15vh;
  label {
    margin-bottom: 0.5rem;
  }
  input {
    width: 30%;
    height: 8vh;
    border-radius: 5px;
  }
`;

const SelectFont = () => {
  return <div>폰트 고르기</div>;
};
