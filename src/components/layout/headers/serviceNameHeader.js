import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { ReactComponent as Share } from "../../../assets/icons/share.svg";
import { ReactComponent as Config } from "../../../assets/icons/config.svg";
import { ReactComponent as Search } from "../../../assets/icons/search.svg";
import { ReactComponent as ChevronLeft } from "../../../assets/icons/chevronLeft.svg";
import DropDownMenu from "./dropDownMenu";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { createBoardStepId } from "../../../store";

const ServiceNameHeader = ({
  headerState = {
    isSearchMode: false,
    searchType: null,
    menu: [],
    configMenu: [],
    configMenuHandler: [],
    setQuery: null,
    onKeydown: null,
    checkedMemoList: [],
    setCheckedMemoList: null,
  },
  setHeaderState,
}) => {
  const navigate = useNavigate();
  const [isOpenConfigMenu, setIsOpenConfigMenu] = useState(false);
  const [step, setStep] = useRecoilState(createBoardStepId);
  const [inputText, setInputText] = useState("");

  const handleClickChevronLeft = () => {
    setHeaderState((prev) =>
      prev.searchType === "deleteMemo"
        ? { ...headerState, isSearchMode: false, searchType: "memo" }
        : { ...headerState, isSearchMode: false }
    );
    setInputText("");
    headerState.setQuery("");
  };

  const handleChangeHeaderInput = (e) => {
    setInputText(e.target.value);
    headerState.setQuery(e.target.value);
  };

  const handleClickSearch = () => {
    setHeaderState({
      ...headerState,
      isSearchMode: true,
    });
  };

  const handleClickConfig = () => {
    setIsOpenConfigMenu((prev) => !prev);
  };

  const handleClickUnselect = () => {
    headerState.setCheckedMemoList([]);
  };

  const onClickTitle = () => {
    setStep(1);
    navigate("/");
  };

  return (
    <ComponentWrapper>
      <ServiceNameHeaderContainer>
        {!headerState.isSearchMode && (
          <ServiceNameHeaderTitle onClick={onClickTitle}>
            보드미
          </ServiceNameHeaderTitle>
        )}
        {headerState.isSearchMode && (
          <ChevronLeftButton>
            <ChevronLeft onClick={handleClickChevronLeft} />
          </ChevronLeftButton>
        )}
        <ServiceNameHeaderButtonGroup>
          {headerState.menu.includes("search") && (
            <SearchButton
              onClick={handleClickSearch}
              isSearchMode={headerState.isSearchMode}
            >
              <Search />
            </SearchButton>
          )}
          {headerState.menu.includes("share") && !headerState.isSearchMode && (
            <ShareButton onClick={() => {}}>
              <Share />
            </ShareButton>
          )}
          {headerState.menu.includes("config") && !headerState.isSearchMode && (
            <ConfigButton onClick={handleClickConfig}>
              <Config />
              {isOpenConfigMenu && (
                <DropDownMenu
                  menuArray={headerState.configMenu}
                  menuHandlerArray={headerState.configMenuHandler}
                />
              )}
            </ConfigButton>
          )}
        </ServiceNameHeaderButtonGroup>
        <HeaderInput
          value={inputText}
          onChange={handleChangeHeaderInput}
          isSearchMode={headerState.isSearchMode}
          searchType={headerState.searchType}
          onKeyDown={headerState.onKeyDown}
          placeholder={
            headerState.searchType === "board"
              ? "보드를 검색하세요."
              : headerState.searchType === "memo"
              ? "메모 내용을 검색하세요"
              : "내용을 검색하세요"
          }
        />
        {headerState.searchType === "deleteMemo" &&
          headerState.isSearchMode && (
            <UnselectButton
              disabled={headerState.checkedMemoList.length === 0}
              onClick={handleClickUnselect}
            >
              선택 해제
            </UnselectButton>
          )}
      </ServiceNameHeaderContainer>
    </ComponentWrapper>
  );
};

const ComponentWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  height: 3rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0.5rem;
  background-color: white;
`;

const ServiceNameHeaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;

const ServiceNameHeaderTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  left: 0;
  color: ${(props) => props.theme.colors.black};
  cursor: pointer;
`;

const ServiceNameHeaderButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ChevronLeftButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  position: relative;
`;

const moveSearchButton = keyframes`
0% {
  position: absolute;
 right:0;
}
100% {
  position: absolute;
  right: 87%;
}
`;

const SearchButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  right: 0;
  animation: ${(props) =>
    props.isSearchMode
      ? css`
          ${moveSearchButton} 0.3s linear
        `
      : ""};
  animation-fill-mode: forwards;
  z-index: 1;
`;

const ShareButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const ConfigButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  position: relative;
  direction: rtl;
`;

const expandSearchInput = keyframes`
0% {
 display: block;
}
100% {
  display: block;
  width: 92%;
}
`;

const expandDeleteMemoInput = keyframes`
0% {
 display: block;
}
100% {
  display: block;
  width: 78%;
  right: 14%;
}
`;

const HeaderInput = styled.input`
  position: absolute;
  right: 0;
  width: 0;
  margin: 0.5rem;
  padding: 0.5rem;
  padding-left: 2.5rem;
  background-color: ${(props) => props.theme.colors.grey_50};
  border: none;
  border-radius: 0.5rem;
  display: ${(props) => (props.isSearchMode ? "block" : "none")};
  z-index: 0;

  &:focus {
    outline: none;
    border: 1px solid ${(props) => props.theme.colors.primary};
  }

  animation: ${(props) =>
    props.searchType !== "deleteMemo"
      ? css`
          ${expandSearchInput} 0.3s linear
        `
      : props.searchType === "deleteMemo"
      ? css`
          ${expandDeleteMemoInput} 0.3s linear
        `
      : ""};
  animation-fill-mode: forwards;
`;

const UnselectButton = styled.button`
  color: ${(props) =>
    props.disabled ? props.theme.colors.grey_20 : props.theme.colors.black};
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export default ServiceNameHeader;
