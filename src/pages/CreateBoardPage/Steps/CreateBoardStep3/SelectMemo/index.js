import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { boardState } from "../../../../../store";
import SelectAllMemoColor from "./SelectAllMemoColor";

const SelectMemo = () => {
  const [memo, setMemo] = useState([]);
  const [idx, setIdx] = useState(0);
  const [memoIndex, setMemoIndex] = useState(0);

  const addMemo = () => {
    if (idx === 6) return;

    let memoState = [...memo];
    setIdx((prev) => prev + 1);
    memoState.push(`메모지 ${idx + 1}`);

    setMemo(memoState);
  };

  const setIndex = (e) => {
    setMemoIndex(e.target.value);
  };

  const renderPicker = () => {
    if (memo.length > 0) {
      return <Picker memoIndex={memoIndex} />;
    }
  };

  return (
    <div>
      <MemoButtonContainer>
        {memo?.map((item, idx) => {
          return (
            <React.Fragment key={item}>
              <Button
                onClick={setIndex}
                value={idx}
                className={idx == memoIndex ? " active" : ""}
              >
                {item}
              </Button>
            </React.Fragment>
          );
        })}
        <span onClick={addMemo}> {idx <= 5 ? "+ 메모지 추가" : null}</span>
      </MemoButtonContainer>
      {renderPicker()}
    </div>
  );
};

export default SelectMemo;

const MemoButtonContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  background-color: white;
  height: auto;
  padding: 0 0.7rem 0.7rem 0.7rem;
  span {
    margin-top: 0.7rem;
    margin-left: 1rem;
  }
`;

const Button = styled.button`
  background-color: #d2d2d2;
  border-radius: 40px;
  border: none;
  padding: 0.7rem;
  margin-left: 1rem;
  margin-top: 0.7rem;
  &.active {
    color: white;
    background-color: #626262;
  }
`;

const Picker = ({ memoIndex }) => {
  const [imageFile, setImageFile] = useState(null);
  const buttonValue = ["메모지 색", "글자 색"];
  const [board, setBoard] = useRecoilState(boardState);
  const [btnValue, setBtnValue] = useState("0");
  const fileInputRef = useRef(null);

  const handleFileInput = () => {
    fileInputRef.current?.click();
  };

  const uploadBackground = (e) => {
    const fileImage = e.target.files;
    const length = fileImage?.length;

    if (fileImage && fileImage[0]) {
      const url = URL.createObjectURL(fileImage[0]);

      setImageFile({
        file: fileImage[0],
        type: fileImage[0].type,
        thumbnail: url,
      });

      let memoImage = [...board.memoBackground];
      memoImage[memoIndex] = url;
      setBoard((prev) => {
        return {
          ...prev,
          memoBackground: memoImage,
        };
      });
    }
  };

  const handleButtonClick = (e) => {
    setBtnValue(e.target.value);
  };

  const renderModalContents = () => {
    switch (btnValue) {
      case "0":
      case "1":
        return (
          <SelectAllMemoColor memoIndex={memoIndex} isBackground={btnValue} />
        );
      default:
        break;
    }
  };

  return (
    <>
      <ButtonContainer>
        <button onClick={handleFileInput}>이미지</button>
        <div
          style={{
            width: "1px",
            height: "100%",
            backgroundColor: "white",
            marginLeft: "1rem",
            marginRight: "1rem",
          }}
        ></div>
        <ImageUploadInput
          type="file"
          id="image-upload"
          ref={fileInputRef}
          accept="image/jpg, image/png, image/jpeg"
          onChange={uploadBackground}
        />

        {buttonValue.map((item, idx) => {
          return (
            <React.Fragment key={item}>
              <TypeButton
                value={idx}
                onClick={handleButtonClick}
                className={idx == btnValue ? "active" : null}
              >
                {item}
              </TypeButton>
            </React.Fragment>
          );
        })}
      </ButtonContainer>

      {renderModalContents()}
    </>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: flex-start;
  padding: 1rem;
  width: 100%;
  button {
    width: 5rem;
    height: 2rem;
    background: #ffffff;
    opacity: 0.8;
    border-radius: 40px;
    border: none;
    cursor: pointer;
  }
`;

const ImageUploadInput = styled.input`
  display: none;
`;

const TypeButton = styled.button`
  width: 5rem;
  height: 2rem;
  background: #ffffff;
  opacity: 0.8;
  border-radius: 40px;
  border: none;
  margin-right: 1rem;
  cursor: pointer;
  &.active {
    color: white;
    background-color: #626262;
  }
`;
