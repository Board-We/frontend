import { useEffect } from "react";
import { useState } from "react";
import { ReactComponent as Camera } from "../../../../../assets/icons/camera.svg";
import { ReactComponent as Close } from "../../../../../assets/icons/close.svg";
import styled from "styled-components";
import TapBar from "../../../../../components/buttons/tapBar";
import TapButton from "../../../../../components/buttons/tapButton";
import { theme } from "../../../../../styles/theme";
import ColorPicker from "./colorPicker";

const SelectModal = ({ open, onClose, title, option, board, setBoard }) => {
  const [color, setColor] = useState("#FFFFFF");
  const [selectedMemoIndex, setSelectedMemoIndex] = useState(0);
  const [selectedMenu, setSelectedMenu] = useState("bgImage");

  useEffect(() => {
    if (option === "메모지") {
      const memoTheme = board.memoThemes[selectedMemoIndex];
      switch (selectedMenu) {
        case "fontColor":
          setColor(memoTheme.memoTextColor);
          break;
        case "bgColor":
          setColor(
            memoTheme.memoBackground.includes("http")
              ? "#fff"
              : memoTheme.memoBackground
          );
          break;
      }
    } else if (option === "배경") {
      setColor(
        board.boardBackground.includes("http") ? "#fff" : board.boardBackground
      );
    }
  }, [option, selectedMenu, selectedMemoIndex]);

  const onClickTapMenu = (e) => {
    setSelectedMenu(e);
  };

  const onClickTapBar = (e) => {
    setSelectedMemoIndex(e);
  };

  const onChangeBackgroundImage = (e) => {
    const inputImageFile = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64Image = reader.result;

      if (option === "메모지") {
        const newMemoThemes = [...board.memoThemes];
        const newMemoTheme = { ...newMemoThemes[selectedMemoIndex] };

        newMemoTheme.memoBackground = base64Image;
        newMemoThemes[selectedMemoIndex] = newMemoTheme;

        setBoard({ ...board, memoThemes: newMemoThemes });
      } else if (option === "배경") {
        setBoard({ ...board, boardBackground: base64Image });
      }
    };

    reader.readAsDataURL(inputImageFile);
  };

  const onClickAddMemoTheme = () => {
    const newMemoThemes = [...board.memoThemes];
    newMemoThemes.push({ memoBackground: "#FFF", memoTextColor: "#000" });
    setBoard({ ...board, memoThemes: newMemoThemes });
    setSelectedMemoIndex(newMemoThemes.length - 1);
  };

  const onClickRemoveMemoTheme = (idx) => {
    const newMemoThemes = [...board.memoThemes];
    const nextIdx =
      idx > selectedMemoIndex ? selectedMemoIndex : selectedMemoIndex - 1;
    newMemoThemes.splice(idx, 1);
    setSelectedMemoIndex(nextIdx);
    setBoard({ ...board, memoThemes: newMemoThemes });
  };

  const onChangeColor = (e) => {
    if (option === "배경") {
      if (selectedMenu === "bgColor")
        setBoard({ ...board, boardBackground: color });
    } else if (option === "메모지") {
      const newMemoThemes = [...board.memoThemes];
      const newMemoTheme = { ...newMemoThemes[selectedMemoIndex] };

      if (selectedMenu === "bgColor") newMemoTheme.memoBackground = color;
      else if (selectedMenu === "fontColor") newMemoTheme.memoTextColor = color;

      newMemoThemes[selectedMemoIndex] = newMemoTheme;
      setBoard({ ...board, memoThemes: newMemoThemes });
    }
    setColor(e);
  };

  const getBackgroundImageContainer = () => {
    return (
      <BackgroundImageContainer>
        {option === "배경" ? (
          board.boardBackground.includes("http") ? (
            <BackgroundImage src={board.boardBackground} />
          ) : (
            <>
              <Camera htmlFor="bgFileInput" />
              <ImageFileInput
                type="file"
                id="bgFileInput"
                onChange={onChangeBackgroundImage}
              />
            </>
          )
        ) : board.memoThemes[selectedMemoIndex].memoBackground.includes(
            "http"
          ) ? (
          <BackgroundImage
            src={board.memoThemes[selectedMemoIndex].memoBackground}
          />
        ) : (
          <>
            <Camera htmlFor="bgFileInput" />
            <ImageFileInput
              type="file"
              id="bgFileInput"
              onChange={onChangeBackgroundImage}
            />
          </>
        )}
      </BackgroundImageContainer>
    );
  };

  const getMemoOption = () => {
    return (
      <MemoOptionContainer>
        {board.memoThemes.map((el, i) => {
          return (
            <TapBar
              isSelected={selectedMemoIndex == i}
              text={`메모지${i + 1}`}
              onClick={() => onClickTapBar(i)}
              icon={
                board.memoThemes.length > 1 && (
                  <Close onClick={() => onClickRemoveMemoTheme(i)} />
                )
              }
              key={`메모지${i + 1}`}
            />
          );
        })}
        {board.memoThemes.length < 5 && (
          <TapBar onClick={onClickAddMemoTheme} text="+ 메모지 추가" />
        )}
      </MemoOptionContainer>
    );
  };

  console.log(board);

  return (
    <ComponentWrapper open={open}>
      {option === "메모지" && getMemoOption()}
      <MenuContainer>
        <TapButton
          text={`${option} 이미지`}
          isSelected={selectedMenu === "bgImage"}
          onClick={() => onClickTapMenu("bgImage")}
        />
        <TapButton
          text="배경 색"
          isSelected={selectedMenu === "bgColor"}
          onClick={() => onClickTapMenu("bgColor")}
        />
        {option === "배경" ? (
          <TapButton
            text="글자 종류"
            isSelected={selectedMenu === "font"}
            onClick={() => onClickTapMenu("font")}
          />
        ) : (
          <TapButton
            text="글자 색"
            isSelected={selectedMenu === "fontColor"}
            onClick={() => onClickTapMenu("fontColor")}
          />
        )}
      </MenuContainer>
      {(selectedMenu === "bgColor" || selectedMenu === "fontColor") && (
        <ColorPicker color={color} onChange={onChangeColor} />
      )}
      {selectedMenu == "bgImage" && getBackgroundImageContainer()}
      <Footer>
        <div onClick={onClose}>x</div>
        <div>{title}</div>
        <div onClick={onClose}>v</div>
      </Footer>
    </ComponentWrapper>
  );
};

const ComponentWrapper = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  background: #ffffff;
  visibility: ${(props) => (props.open ? `visible` : `hidden`)};
  z-index: 3;
`;

const MemoOptionContainer = styled.div`
  display: -webkit-box;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 0;
  border-bottom: 1px solid ${theme.colors.grey_40};
  width: 100%;
  padding-top: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  padding: 0.75rem;
`;

const BackgroundImageContainer = styled.div`
  width: 100%;
  height: max-content;
  max-height: 12rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BackgroundImage = styled.img`
  max-height: 12rem;
`;

const ImageFileInput = styled.input``;

const Footer = styled.div`
  background: transparent;
  width: 100%;
  height: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
`;

export default SelectModal;
