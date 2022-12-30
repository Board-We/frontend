import { useEffect } from "react";
import { useState } from "react";
import CameraIcon from "../../../../../assets/icons/camera.svg";
import { ReactComponent as Close } from "../../../../../assets/icons/close.svg";
import styled from "styled-components";
import TapBar from "../../../../../components/buttons/tapBar";
import TapButton from "../../../../../components/buttons/tapButton";
import { theme } from "../../../../../styles/theme";
import ColorPicker from "./colorPicker";
import { useRef } from "react";

const SelectModal = ({ open, onClose, title, option, board, setBoard }) => {
  const [color, setColor] = useState("#FFFFFF");
  const [selectedMemoIndex, setSelectedMemoIndex] = useState(0);
  const [selectedMenu, setSelectedMenu] = useState("bgImage");
  const $file = useRef();
  useEffect(() => {
    if (option === "메모지") {
      const memoTheme = board.memoThemes[selectedMemoIndex];
      setSelectedMenu(
        isImage(memoTheme.memoBackground) ? "bgImage" : "bgColor"
      );
    } else if (option === "배경") {
      setSelectedMenu(isImage(board.boardBackground) ? "bgImage" : "bgColor");
    }
  }, []);

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

  const onClickRemoveMemoTheme = (e, idx) => {
    e.stopPropagation();
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

  const onClickCameraIcon = () => {
    $file.current.click();
  };

  const getImageComponent = () => {
    return (
      <Camera
        htmlFor="bgFileInput"
        src={CameraIcon}
        onClick={onClickCameraIcon}
      />
    );
  };

  const isImage = (data) => {
    if (data.includes("http") || data.includes("base64")) return true;
    else return false;
  };

  useEffect(() => {
    console.log("selectedIdx?", selectedMemoIndex);
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
        default:
          break;
      }
    } else if (option === "배경") {
      setColor(
        board.boardBackground.includes("http") ? "#fff" : board.boardBackground
      );
    }
  }, [option, selectedMenu, selectedMemoIndex]);

  const getBackgroundImageContainer = () => {
    return (
      <BackgroundImageContainer>
        {option === "배경" ? (
          isImage(board.boardBackground) ? (
            <BackgroundImage
              src={board.boardBackground}
              onClick={onClickCameraIcon}
            />
          ) : (
            getImageComponent()
          )
        ) : isImage(board.memoThemes[selectedMemoIndex].memoBackground) ? (
          <BackgroundImage
            src={board.memoThemes[selectedMemoIndex].memoBackground}
            onClick={onClickCameraIcon}
          />
        ) : (
          getImageComponent()
        )}
        <ImageFileInput
          type="file"
          ref={$file}
          onChange={onChangeBackgroundImage}
        />
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
                  <Close onClick={(e) => onClickRemoveMemoTheme(e, i)} />
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
      {selectedMenu === "bgImage" && getBackgroundImageContainer()}
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
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BackgroundImage = styled.img`
  max-height: 12rem;
  max-width: 100%;
`;

const ImageFileInput = styled.input`
  display: none;
`;

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

const Camera = styled.img`
  width: 30%;
  height: 30%;
`;

export default SelectModal;
