import { useEffect } from "react";
import { useState } from "react";
import CameraIcon from "../../../../../assets/icons/camera.svg";
import closeIcon from "../../../../../assets/icons/close.svg";
import confirmIcon from "../../../../../assets/icons/confirm.svg";
import styled from "styled-components";
import TapBar from "../../../../../components/buttons/tapBar";
import TapButton from "../../../../../components/buttons/tapButton";
import { theme } from "../../../../../styles/theme";
import ColorPicker from "./colorPicker";
import { useRef } from "react";

const SelectModal = ({
  open,
  onClose,
  title,
  option,
  board,
  setBoard,
  selectedTab,
  setSelectedTab,
  selectedMemoIndex,
  setSelectedMemoIndex,
  selectedMemoMenu,
  setSelectedMemoMenu,
  selectedBgMenu,
  setSelectedBgMenu,
}) => {
  const [color, setColor] = useState("#FFFFFF");
  const [fontButtonValue, setFontButtonValue] = useState();
  const $file = useRef();

  const font = [
    { buttonText: "기본 글씨체", fontType: "Pretendard" },
    { buttonText: "에스코어 드림체", fontType: "SCDream" },
    { buttonText: "강원교육모두체", fontType: "강원교육모두" },
    { buttonText: "코트라희망체", fontType: "KOTRAHOPE" },
  ];

  useEffect(() => {
    if (option === "메모지") {
      const memoTheme = board.memoThemes[selectedMemoIndex];
      const menu = isImage(memoTheme.memoBackground) ? "bgImage" : "bgColor";
      const newSelectedMemoMenu = [...selectedMemoMenu];
      newSelectedMemoMenu.splice(selectedMemoIndex, 1, menu);
      setSelectedTab("memo");
      setSelectedMemoMenu(newSelectedMemoMenu);
    } else if (option === "배경") {
      setSelectedTab("bg");
      const menu = isImage(board.boardBackground) ? "bgImage" : "bgColor";
      setSelectedBgMenu(menu);
    }
  }, []);

  useEffect(() => {
    if (option === "메모지") {
      const memoTheme = board.memoThemes[selectedMemoIndex];
      switch (selectedMemoMenu[selectedMemoIndex]) {
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
  }, [option, selectedMemoMenu, selectedMemoIndex]);

  useEffect(() => {
    if (fontButtonValue === "기본 글씨체") {
      setBoard({ ...board, boardFont: "Pretendard" });
    } else if (fontButtonValue === "에스코어 드림체") {
      setBoard({ ...board, boardFont: "SCDream" });
    } else if (fontButtonValue === "강원교육모두체") {
      setBoard({ ...board, boardFont: "강원교육모두" });
    } else if (fontButtonValue === "코트라희망체") {
      setBoard({ ...board, boardFont: "KOTRAHOPE" });
    }
  }, [fontButtonValue]);

  const onClickTapMenu = (e) => {
    if (selectedTab === "bg") {
      setSelectedBgMenu(e);
    } else if (selectedTab === "memo") {
      const newSelectedMemoMenu = [...selectedMemoMenu];
      newSelectedMemoMenu.splice(selectedMemoIndex, 1, e);
      setSelectedMemoMenu(newSelectedMemoMenu);
    }
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
    const newSelectedMemoMenu = [...selectedMemoMenu];
    newSelectedMemoMenu.push("bgImage");
    setSelectedMemoMenu(newSelectedMemoMenu);
  };

  const onClickRemoveMemoTheme = (e, idx) => {
    e.stopPropagation();
    const newMemoThemes = [...board.memoThemes];
    const nextIdx =
      idx > selectedMemoIndex ? selectedMemoIndex : selectedMemoIndex - 1;
    newMemoThemes.splice(idx, 1);
    setSelectedMemoIndex(nextIdx);
    setBoard({ ...board, memoThemes: newMemoThemes });
    const newSelectedMenu = [...selectedMemoMenu];
    newSelectedMenu.pop();
    setSelectedMemoMenu(newSelectedMenu);
  };

  const onClickSetFontOption = (e) => {
    setFontButtonValue(e.target.value);
  };

  const onChangeColor = (e) => {
    if (option === "배경") {
      if (selectedBgMenu === "bgColor")
        setBoard({ ...board, boardBackground: color });
    } else if (option === "메모지") {
      const newMemoThemes = [...board.memoThemes];
      const newMemoTheme = { ...newMemoThemes[selectedMemoIndex] };

      if (selectedMemoMenu[selectedMemoIndex] === "bgColor")
        newMemoTheme.memoBackground = color;
      else if (selectedMemoMenu[selectedMemoIndex] === "fontColor")
        newMemoTheme.memoTextColor = color;

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
              isSelected={selectedMemoIndex === i}
              text={`메모지${i + 1}`}
              onClick={() => onClickTapBar(i)}
              icon={
                board.memoThemes.length > 1 && (
                  <IconContainer
                    src={closeIcon}
                    onClick={(e) => onClickRemoveMemoTheme(e, i)}
                  />
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
          isFill={true}
          isSelected={
            (selectedTab === "memo" &&
              selectedMemoMenu[selectedMemoIndex] === "bgImage") ||
            (selectedTab === "bg" && selectedBgMenu === "bgImage")
          }
          onClick={() => onClickTapMenu("bgImage")}
        />
        <TapButton
          text="배경 색"
          isFill={true}
          isSelected={
            (selectedTab === "memo" &&
              selectedMemoMenu[selectedMemoIndex] === "bgColor") ||
            (selectedTab === "bg" && selectedBgMenu === "bgColor")
          }
          onClick={() => onClickTapMenu("bgColor")}
        />
        {option === "배경" ? (
          <TapButton
            text="글자 종류"
            isFill={true}
            isSelected={selectedBgMenu === "font"}
            onClick={() => onClickTapMenu("font")}
          />
        ) : (
          <TapButton
            text="글자 색"
            isSelected={selectedMemoMenu[selectedMemoIndex] === "fontColor"}
            isFill={true}
            onClick={() => onClickTapMenu("fontColor")}
          />
        )}
      </MenuContainer>
      {((selectedTab === "memo" &&
        (selectedMemoMenu[selectedMemoIndex] === "bgColor" ||
          selectedMemoMenu[selectedMemoIndex] === "fontColor")) ||
        (selectedTab === "bg" && selectedBgMenu === "bgColor")) && (
        <ColorPicker color={color} onChange={onChangeColor} />
      )}
      {((selectedTab === "memo" &&
        selectedMemoMenu[selectedMemoIndex] === "bgImage") ||
        (selectedTab === "bg" && selectedBgMenu === "bgImage")) &&
        getBackgroundImageContainer()}
      {selectedTab === "bg" && selectedBgMenu === "font" && (
        <SetFontArea>
          {font.map((val, idx) => {
            return (
              <SetFontButton
                className={val.fontType == board.boardFont ? "active" : ""}
                onClick={onClickSetFontOption}
                value={val.buttonText}
                fontType={val.fontType}
              >
                {val.buttonText}
              </SetFontButton>
            );
          })}
        </SetFontArea>
      )}
      <Footer>
        <div onClick={onClose} style={{ cursor: "pointer" }}>
          <img src={closeIcon} />
        </div>
        <div>{title}</div>
        <div onClick={onClose} style={{ cursor: "pointer" }}>
          <img src={confirmIcon} />
        </div>
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
  height: 3rem;
  font-weight: 500;
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

const IconContainer = styled.img`
  width: 1.25rem;
  height: 1.25rem;
`;

const SetFontArea = styled.div`
  display: flex;
  flex-direction: column;
  height: 20vh;
  overflow-y: scroll;
  width: 100%;
  padding: 1rem;
`;
const SetFontButton = styled.button`
  display: flex;
  align-items: center;
  text-align: left;
  height: 2.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  border: none;
  font-family: ${(props) => props.fontType};
  background-color: ${theme.colors.grey_50};
  &.active {
    background-color: ${theme.colors.white};
    border: 1px solid ${theme.colors.primary};
  }
`;

export default SelectModal;
