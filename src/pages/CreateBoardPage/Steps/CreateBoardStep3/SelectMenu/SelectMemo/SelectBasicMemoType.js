import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

function SelectBasicMemoType() {
  const [color, setColor] = useState("#ffffff");
  const [buttonValue, setButtonValue] = useState();
  const [buttonFontValue, setFontButtonValue] = useState();

  const [memoColor1, setMemoColor1] = useState("");
  const [memoColor2, setMemoColor2] = useState("");
  const [memoColor3, setMemoColor3] = useState("");

  const [fontBackgrond, setFontBackground] = useState("");

  const inputMemoRef = useRef(null);
  const inputFontRef = useRef(null);

  const handlePicker = (e) => {
    inputMemoRef.current?.click();
    setButtonValue(e.target.value);
  };

  const handleFontPicker = (e) => {
    inputFontRef.current?.click();
    setFontButtonValue((prev) => {
      return e.target.value;
    });
  };

  const handleChangeColor = (e) => {
    setColor(e.target.value);
    if (buttonValue === "1") {
      setMemoColor1(e.target.value);
    } else if (buttonValue === "2") {
      setMemoColor2(e.target.value);
    } else if (buttonValue === "3") {
      setMemoColor3(e.target.value);
    }
  };

  useEffect(() => {
    if (buttonFontValue === "1") {
      setFontBackground((prev) => memoColor1);
    } else if (buttonFontValue === "2") {
      setFontBackground((prev) => memoColor2);
    } else if (buttonFontValue === "3") {
      setFontBackground((prev) => memoColor3);
    }
  }, [buttonFontValue]);

  return (
    <MemoSelectContainer>
      <p>최대 3개의 단색을 선택할 수 있어요.</p>
      <ColorPickerContainer>
        <ColorPickerPreview color={color} />
        <ColorPickerInput
          type="color"
          value={color}
          onChange={handleChangeColor}
          ref={inputMemoRef}
        />
      </ColorPickerContainer>
      <ColorPreviewContainer>
        <ColorPreviewBox1 color={memoColor1} value="1" onClick={handlePicker}>
          1
        </ColorPreviewBox1>
        <ColorPreviewBox2 color={memoColor2} value="2" onClick={handlePicker}>
          2
        </ColorPreviewBox2>
        <ColorPreviewBox3 color={memoColor3} value="3" onClick={handlePicker}>
          3
        </ColorPreviewBox3>
      </ColorPreviewContainer>
      <p>롤링페이퍼에 쓰여질 글자의 색상입니다.</p>
      <ColorPickerContainer>
        <FontPickerPreview backgrondColor={fontBackgrond}>
          <p>롤링페이퍼 남기기</p>
        </FontPickerPreview>
        {/* 
        <FontColorPickerInput
          type="color"
          value={color}
          onChange={handleChangeColor}
          ref={inputFontRef}
        /> */}
      </ColorPickerContainer>
      <ColorPreviewContainer>
        <FontPreviewBox1
          color={memoColor1}
          value="1"
          onClick={handleFontPicker}
        >
          1
        </FontPreviewBox1>
        <FontPreviewBox2
          color={memoColor2}
          value="2"
          onClick={handleFontPicker}
        >
          2
        </FontPreviewBox2>
        <FontPreviewBox3
          color={memoColor3}
          value="3"
          onClick={handleFontPicker}
        >
          3
        </FontPreviewBox3>
        {/* <ColorPreviewBox1 color={memoColor1} value="1" onClick={handlePicker}>
          1
        </ColorPreviewBox1>
        <ColorPreviewBox2 color={memoColor2} value="2" onClick={handlePicker}>
          2
        </ColorPreviewBox2>
        <ColorPreviewBox3 color={memoColor3} value="3" onClick={handlePicker}>
          3
        </ColorPreviewBox3> */}
      </ColorPreviewContainer>
    </MemoSelectContainer>
  );
}

export default SelectBasicMemoType;

const MemoSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  p {
    font-size: 0.9rem;
    text-align: left;
  }
`;

const ColorPickerPreview = styled.div.attrs((props) => {
  return {
    style: {
      background: props.color ? props.color : "white",
    },
  };
})`
  width: 10rem;
  height: 20vh;
  margin-right: 1rem;
  border-radius: 4px;
`;

const ColorPickerInput = styled.input`
  width: 25vw;
  height: 5vh;
  display: hidden;
`;

const ColorPickerContainer = styled.div`
  display: flex;
`;

const ColorPreviewContainer = styled.div`
  display: flex;
  width: 45vw;
  justify-content: space-around;
  margin-top: 2vh;
`;

const ColorPreviewBox1 = styled.button.attrs((props) => {
  return {
    style: {
      background: props.color ? props.color : "white",
    },
  };
})`
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

const ColorPreviewBox2 = styled(ColorPreviewBox1).attrs((props) => {
  return {
    style: {
      background: props.color ? props.color : "white",
    },
  };
})``;

const ColorPreviewBox3 = styled(ColorPreviewBox1).attrs((props) => {
  return {
    style: {
      background: props.color ? props.color : "white",
    },
  };
})``;

const FontPickerPreview = styled.div`
  width: 10rem;
  height: 20vh;
  margin-right: 1rem;
  border-radius: 4px;
  background-color: ${(props) =>
    props.backgrondColor ? props.backgrondColor : "white"};
  p {
    color: white;
  }
`;

const FontColorPickerInput = styled(ColorPickerInput)``;

const FontPreviewBox1 = styled(ColorPreviewBox1)``;

const FontPreviewBox2 = styled(FontPreviewBox1)``;

const FontPreviewBox3 = styled(FontPreviewBox1)``;
