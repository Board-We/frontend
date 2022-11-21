import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

function SelectBasicMemoType() {
  const [color, setColor] = useState("#ffffff"); // for preview

  const [memoColor, setMemoColor] = useState(["", "", ""]);
  const [fontColor, setFontColor] = useState(["", "", ""]);

  const [buttonValue, setButtonValue] = useState();
  const [buttonFontValue, setFontButtonValue] = useState();

  const [fontBackgrond, setFontBackground] = useState("");

  const inputMemoRef = useRef(null);
  const inputFontRef = useRef(null);

  const handleBgPicker = (e) => {
    inputMemoRef.current?.click();
    setButtonValue(e.target.value);
  };

  const handleFontPicker = (e) => {
    inputFontRef.current?.click();
    setFontButtonValue((prev) => {
      return e.target.value;
    });
  };

  const handleChangeBgColor = (e) => {
    setColor(e.target.value);
    const copyArr = [...memoColor];
    if (buttonValue === "1") {
      copyArr[0] = e.target.value;
      setMemoColor(copyArr);
    } else if (buttonValue === "2") {
      copyArr[1] = e.target.value;
      setMemoColor(copyArr);
    } else if (buttonValue === "3") {
      copyArr[2] = e.target.value;
      setMemoColor(copyArr);
    }
  };

  const handleChangeFontColor = (e) => {
    const copyArr = [...fontColor];
    if (buttonFontValue === "1") {
      copyArr[0] = e.target.value;
      setFontColor(copyArr);
    } else if (buttonFontValue === "2") {
      copyArr[1] = e.target.value;
      setFontColor(copyArr);
    } else if (buttonFontValue === "3") {
      copyArr[2] = e.target.value;
      setFontColor(copyArr);
    }
  };

  const renderFontPreview = () => {
    switch (buttonFontValue) {
      case "1":
        return (
          <FontPreview1 color={fontColor[0]}>롤링 페이퍼 남기기</FontPreview1>
        );
      case "2":
        return (
          <FontPreview2 color={fontColor[1]}>롤링 페이퍼 남기기</FontPreview2>
        );
      case "3":
        return (
          <FontPreview3 color={fontColor[2]}>롤링 페이퍼 남기기</FontPreview3>
        );
      default:
        break;
    }
  };

  useEffect(() => {
    if (buttonFontValue === "1") {
      setFontBackground((prev) => memoColor[0]);
    } else if (buttonFontValue === "2") {
      setFontBackground((prev) => memoColor[1]);
    } else if (buttonFontValue === "3") {
      setFontBackground((prev) => memoColor[2]);
    }
  }, [buttonFontValue, memoColor]);

  return (
    <MemoSelectContainer>
      <p>최대 3개의 단색을 선택할 수 있어요.</p>
      <ColorPickerContainer>
        <ColorPickerPreview color={color} />
        <ColorPickerInput
          type="color"
          value={color}
          onChange={handleChangeBgColor}
          ref={inputMemoRef}
        />
      </ColorPickerContainer>
      <ColorPreviewContainer>
        <ColorPreviewBox1
          color={memoColor[0]}
          value="1"
          onClick={handleBgPicker}
        >
          1
        </ColorPreviewBox1>
        <ColorPreviewBox2
          color={memoColor[1]}
          value="2"
          onClick={handleBgPicker}
        >
          2
        </ColorPreviewBox2>
        <ColorPreviewBox3
          color={memoColor[2]}
          value="3"
          onClick={handleBgPicker}
        >
          3
        </ColorPreviewBox3>
      </ColorPreviewContainer>
      <p>롤링페이퍼에 쓰여질 글자의 색상입니다.</p>
      <ColorPickerContainer>
        <FontPickerPreview backgrondColor={fontBackgrond}>
          {renderFontPreview()}
        </FontPickerPreview>

        <FontColorPickerInput
          type="color"
          onChange={handleChangeFontColor}
          ref={inputFontRef}
        />
      </ColorPickerContainer>
      <ColorPreviewContainer>
        <FontPreviewBox1
          color={memoColor[0]}
          value="1"
          onClick={handleFontPicker}
          disabled={!memoColor[0] ? true : false}
        >
          1
        </FontPreviewBox1>
        <FontPreviewBox2
          color={memoColor[1]}
          value="2"
          onClick={handleFontPicker}
          disabled={!memoColor[1] ? true : false}
        >
          2
        </FontPreviewBox2>
        <FontPreviewBox3
          color={memoColor[2]}
          value="3"
          onClick={handleFontPicker}
          disabled={!memoColor[2] ? true : false}
        >
          3
        </FontPreviewBox3>
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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10rem;
  height: 20vh;
  margin-right: 1rem;
  border-radius: 4px;
  background-color: ${(props) =>
    props.backgrondColor ? props.backgrondColor : "white"};
`;

const FontColorPickerInput = styled(ColorPickerInput)``;

const FontPreview1 = styled.p.attrs((props) => {
  return {
    style: {
      color: props.color ? props.color : "white",
    },
  };
})``;

const FontPreview2 = styled(FontPreview1)``;

const FontPreview3 = styled(FontPreview1)``;

const FontPreviewBox1 = styled(ColorPreviewBox1)``;

const FontPreviewBox2 = styled(FontPreviewBox1)``;

const FontPreviewBox3 = styled(FontPreviewBox1)``;
