import React, { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { boardState } from "../../../../../store";
import SelectColor from "./SelectColor";
import SelectFont from "./SelectFont";

const SelectBackground = () => {
  const [imageFile, setImageFile] = useState(null);
  const buttonValue = ["배경 색", "글자 종류"];
  const [board, setBoard] = useRecoilState(boardState);
  const [btnValue, setBtnValue] = useState("");
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

      const boardState = { ...board, background: url };
      setBoard(boardState);
    }
  };

  const handleButtonClick = (e) => {
    setBtnValue(e.target.value);
  };

  const renderModalContents = () => {
    switch (btnValue) {
      case "0":
        return <SelectColor />;
      case "1":
        return <SelectFont />;
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
              <Button
                value={idx}
                onClick={handleButtonClick}
                className={idx == btnValue ? "active" : ""}
              >
                {item}
              </Button>
            </React.Fragment>
          );
        })}
      </ButtonContainer>
      {renderModalContents()}
    </>
  );
};

export default SelectBackground;

const ButtonContainer = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: flex-start;
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

const Button = styled.button`
  width: 5rem;
  height: 2rem;
  background: #ffffff;
  opacity: 0.8;
  border-radius: 40px;
  border: none;
  margin-right: 1rem;
  &.active {
    color: white;
    background-color: #626262;
  }
`;
