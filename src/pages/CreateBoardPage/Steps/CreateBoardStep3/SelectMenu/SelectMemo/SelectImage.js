import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

function SelectImage() {
  const [images, setImages] = useState([]);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [fontColor, setFontColor] = useState(["", "", ""]);

  const [buttonValue, setButtonValue] = useState("1");

  const imageRef = useRef(null);
  const colorRef = useRef(null);

  const handleFileInput = () => {
    imageRef.current?.click();
  };

  const uploadImage = (e) => {
    const image = e.target.files;
    let urlLists = [...images];
    for (let i = 0; i < image.length; i++) {
      const currentImageUrl = URL.createObjectURL(image[i]);
      urlLists.push(currentImageUrl);
    }

    if (urlLists.length > 3) {
      urlLists = urlLists.slice(0, 3);
    }
    setImages(urlLists);
  };

  const deleteImage = (itemIndex) => {
    setImages(images.filter((_, idx) => idx !== itemIndex));
  };

  const handleButtonValue = (e) => {
    colorRef.current?.click();
    setButtonValue(e.target.value);
  };

  const handleChangeFontColor = (e) => {
    const copyArr = [...fontColor];
    if (buttonValue === "1") {
      copyArr[0] = e.target.value;
      setFontColor(copyArr);
    } else if (buttonValue === "2") {
      copyArr[1] = e.target.value;
      setFontColor(copyArr);
    } else if (buttonValue === "3") {
      copyArr[2] = e.target.value;
      setFontColor(copyArr);
    }
  };

  const renderFontPreview = () => {
    switch (buttonValue) {
      case "1":
        return (
          <ImageText1 color={fontColor[0]}>
            롤링 페이퍼
            <br /> 남기기
          </ImageText1>
        );
      case "2":
        return (
          <ImageText2 color={fontColor[1]}>
            롤링 페이퍼
            <br /> 남기기
          </ImageText2>
        );
      case "3":
        return (
          <ImageText3 color={fontColor[2]}>
            롤링 페이퍼
            <br /> 남기기
          </ImageText3>
        );
      default:
        break;
    }
  };

  useEffect(() => {
    if (buttonValue === "1" && images[0]) {
      setImagePreviewUrl(images[0]);
    } else if (buttonValue === "2" && images[1]) {
      setImagePreviewUrl(images[1]);
    } else if (buttonValue === "3" && images[2]) {
      setImagePreviewUrl(images[2]);
    }
  }, [buttonValue, images]);

  return (
    <ImageSelectContainer>
      <p>최대 3개의 이미지를 불러올 수 있어요.</p>
      <UploadButton onClick={handleFileInput}>
        이미지를 업로드 해주세요.
      </UploadButton>
      <ImageUploadInput
        type="file"
        id="image-upload"
        multiple
        ref={imageRef}
        accept="image/jpg, image/png, image/jpeg"
        onChange={uploadImage}
      />
      <div style={{ display: "flex" }}>
        {images.map((image, idx) => (
          <ImageContainer key={idx}>
            <img src={image} alt={`${image}-${idx}`} />
            <DeleteButton onClick={() => deleteImage(idx)}>X</DeleteButton>
          </ImageContainer>
        ))}
      </div>

      <p>롤링페이퍼에 쓰여질 글자의 색상입니다.</p>
      <ImageWrapper>
        <div style={{ display: "flex" }}>
          <ImagePreview url={imagePreviewUrl} />
          <ColorPickerInput
            type="color"
            ref={colorRef}
            onChange={handleChangeFontColor}
          />
        </div>
        {renderFontPreview()}
      </ImageWrapper>

      <ImagePreviewContainer>
        <ImagePreviewBox
          value="1"
          onClick={handleButtonValue}
          disabled={!images[0] ? true : false}
        >
          1
        </ImagePreviewBox>

        <ImagePreviewBox
          value="2"
          onClick={handleButtonValue}
          disabled={!images[1] ? true : false}
        >
          2
        </ImagePreviewBox>
        <ImagePreviewBox
          value="3"
          onClick={handleButtonValue}
          disabled={!images[2] ? true : false}
        >
          3
        </ImagePreviewBox>
      </ImagePreviewContainer>
    </ImageSelectContainer>
  );
}

export default SelectImage;

const ImageSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-left: 2rem;
  p {
    font-size: 0.9rem;
    text-align: left;
  }
`;
const UploadButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #595959;
  border-radius: 4px;
  height: 2rem;
  color: white;
  cursor: pointer;
`;

const ImageUploadInput = styled.input`
  display: none;
`;

const ImageContainer = styled.div`
  display: flex;
  margin-top: 1rem;
  img {
    width: 5rem;
    height: 5rem;
  }
`;

const DeleteButton = styled.button`
  width: 1.5rem;
  height: 1.5rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  &:hover {
    font-weight: 600;
    color: red;
  }
`;
const ImageWrapper = styled.div`
  position: relative;
`;
const ImageText1 = styled.span.attrs((props) => {
  return {
    style: {
      color: props.color ? props.color : "black",
    },
  };
})`
  position: absolute;
  top: 50%;
  left: 27%;
  transform: translate(-50%, -50%);
  font-size: 1.25rem;
  font-weight: 600;
`;

const ImageText2 = styled(ImageText1).attrs((props) => {
  return {
    style: {
      color: props.color ? props.color : "red",
    },
  };
})``;

const ImageText3 = styled(ImageText1).attrs((props) => {
  return {
    style: {
      color: props.color ? props.color : "red",
    },
  };
})``;

const ColorPickerInput = styled.input`
  width: 25vw;
  height: 5vh;
  display: hidden;
`;

const ImagePreview = styled.div`
  width: 10.5rem;
  height: 20vh;
  margin-right: 1rem;
  border-radius: 4px;
  background: url(${(props) => (props.url ? props.url : "")}) no-repeat;
  background-size: 10.5rem 20vh;
  background-color: white;
`;

const ImagePreviewContainer = styled.div`
  display: flex;
  width: 45vw;
  justify-content: space-around;
  margin-top: 2vh;
  p {
    position: absolute;
    top: 40%;
    left: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
  }
`;

const ImagePreviewBox = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 7rem;
  height: 3rem;
  background-color: white;
  margin-right: 1rem;
  border-radius: 4px;
  border: none;
  cursor: pointer;
`;
