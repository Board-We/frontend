import React, { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { boardState } from "../../../../../store";

const SelectBackground = ({ setBoardURL }) => {
  const [board, setBoard] = useRecoilState(boardState);
  const [imageFile, setImageFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileInput = () => {
    fileInputRef.current?.click();
  };
  const handleBoardColor = (e) => {
    let setBgColor = { ...board, background: e.target.value };
    setBoard(setBgColor);
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
      setBoardURL(url);
    }
  };
  const showTumbnail = () => {
    if (!imageFile && imageFile == null) {
      return (
        <EmptyImageThumbnail onClick={handleFileInput}>
          <span>이미지를 업로드 해주세요.</span>
        </EmptyImageThumbnail>
      );
    }
    return (
      <ImageThumbnail
        src={imageFile.thumbnail}
        alt={imageFile.type}
        onClick={handleFileInput}
      />
    );
  };
  return (
    <BackgroundPickerContainer>
      <SubContainer>
        <h1>이미지 불러오기</h1>
        <p>원하는 이미지로 채울 수 있어요.</p>
        {showTumbnail()}
        <ImageUploadInput
          type="file"
          id="image-upload"
          ref={fileInputRef}
          accept="image/jpg, image/png, image/jpeg"
          onChange={uploadBackground}
        />
      </SubContainer>
      <SubContainer>
        <h1>색상으로 채우기</h1>
        <p>간단하게 단색으로 채울수 있어요.</p>
        <ColorPickerContainer>
          <ColorPickerPreview color={board.background} />
          <div style={{ display: "flex", flexDirection: "column" }}>
            {/*color picker 추후 교체 필요*/}
            <ColorPickerInput
              type="color"
              value={board.background}
              onChange={handleBoardColor}
            />
            <p>색상을 골라주세요.</p>
          </div>
        </ColorPickerContainer>
      </SubContainer>
    </BackgroundPickerContainer>
  );
};

export default SelectBackground;

const BackgroundPickerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: #eeeeee;
  margin-top: 2rem;
  height: 80vh;
`;

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

const ImageUploadInput = styled.input`
  display: none;
`;

const EmptyImageThumbnail = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20rem;
  background-color: #595959;
  height: 25vh;
  cursor: pointer;
  span {
    font-weight: 600;
    color: white;
  }
`;

const ImageThumbnail = styled.img`
  width: 20rem;
  height: 25vh;
  cursor: pointer;
`;

const ColorPickerInput = styled.input`
  width: 25vw;
  height: 10vh;
`;

const ColorPickerContainer = styled.div`
  display: flex;
`;

const ColorPickerPreview = styled.div.attrs((props) => {
  return {
    style: {
      background: props.color,
    },
  };
})`
  width: 10rem;
  height: 25vh;
  margin-right: 1rem;
  border-radius: 4px;
`;
