import { useEffect, useState } from "react";
import { useRef } from "react";
import styled from "styled-components";

const Memo = ({
  text,
  onChangeText,
  color = "black",
  background = "white",
  size,
  fontType,
  children,
}) => {
  const $memo = useRef();
  const prevMemo = useRef();
  const [memoText, setMemoText] = useState("");
  const [sizeUnit, setSizeUnit] = useState(0);
  const [heightTA, setHeightTA] = useState(0);

  useEffect(() => {
    const newSizeUnit = $memo.current.clientWidth / 17;
    setSizeUnit(newSizeUnit);
    setHeightTA(newSizeUnit * 2.5);
    setMemoText(text);
  }, [size]);

  useEffect(() => {
    if (memoText.length > 100 || memoText.split("\n").length > 5) {
      setMemoText(prevMemo.current);
      return;
    } else {
      if (onChangeText) onChangeText(memoText);
    }
  }, [memoText]);

  const onChangeMemoTextTA = (e) => {
    prevMemo.current = text;
    const newText = e.target.value;
    const newHeight = e.target.scrollHeight;

    setHeightTA(newHeight);
    setMemoText(newText);
  };

  return (
    <ComponentWrapper
      ref={$memo}
      background={background}
      size={size}
      sizeUnit={sizeUnit}
    >
      {onChangeText ? (
        <MemoTextTA
          value={memoText}
          color={color}
          onChange={onChangeMemoTextTA}
          fontSize={sizeUnit}
          fontType={fontType}
          placeholder={"남기고 싶은 내용을\n마음껏 작성해주세요!"}
          height={heightTA}
        />
      ) : (
        <MemoText color={color} fontSize={sizeUnit}>
          {text}
        </MemoText>
      )}
      {children}
    </ComponentWrapper>
  );
};

const ComponentWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) =>
    props.background.includes("http" || "base64")
      ? `url(${props.background})`
      : props.background};
  background-position: center;
  background-size: cover;
  width: ${(props) => props.size};
  height: ${(props) => props.size};
  padding: ${(props) => props.sizeUnit * 3.2}px;
  border-radius: ${(props) => props.sizeUnit}px;
`;

const MemoTextTA = styled.textarea`
  width: 100%;
  height: ${(props) => props.height}px;
  border: 0;
  vertical-align: middle;
  resize: none;
  text-align: center;
  font-family: ${(props) => props.fontType};
  font-size: ${(props) => props.fontSize}px;
  background: transparent;
  color: ${(props) => props.color};
  overflow: hidden;
  :disabled {
    background-color: inherit;
    color: inherit;
  }
  :focus {
    border: 0;
    outline: 0;
  }
`;

const MemoText = styled.div`
  font-size: ${(props) => props.fontSize}px;
  color: ${(props) => props.color};
`;

export default Memo;
