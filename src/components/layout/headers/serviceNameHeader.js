import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { ReactComponent as Share } from "../../../assets/share.svg";
import { ReactComponent as Config } from "../../../assets/config.svg";
import { ReactComponent as Search } from "../../../assets/search.svg";
import { ReactComponent as ChevronLeft } from "../../../assets/chevronLeft.svg";
import DropDownMenu from "./dropDownMenu";

const ServiceNameHeader = ({
  searchModeType,
  setSearchModeType,
  setQuery,
  onKeyDownSearchInput,
  isDeleteMemoMode,
  onShare,
  onConfig,
  onSearch,
}) => {
  const [isOpenConfigMenu, setIsOpenConfigMenu] = useState(false);

  const handleClickChevronLeft = () => {
    setSearchModeType("");
  };

  const handleChangeHeaderInput = (e) => {
    setQuery(e.target.value);
  };

  const handleClickConfig = () => {
    setIsOpenConfigMenu((prev) => !prev);
  };

  return (
    <ComponentWrapper>
      <ServiceNameHeaderContainer>
        {!(searchModeType || isDeleteMemoMode) && (
          <ServiceNameHeaderTitle>Side project</ServiceNameHeaderTitle>
        )}
        {(searchModeType || isDeleteMemoMode) && (
          <ChevronLeftButton>
            <ChevronLeft onClick={handleClickChevronLeft} />
          </ChevronLeftButton>
        )}
        <ServiceNameHeaderButtonGroup>
          {onSearch ? (
            <SearchButton
              onClick={onSearch}
              searchModeType={searchModeType}
              isDeleteMemoMode={isDeleteMemoMode}
            >
              <Search />
            </SearchButton>
          ) : null}
          {onShare && !(searchModeType || isDeleteMemoMode) ? (
            <ShareButton onClick={onShare}>
              <Share />
            </ShareButton>
          ) : null}
          {onConfig && !(searchModeType || isDeleteMemoMode) ? (
            <ConfigButton onClick={handleClickConfig}>
              <Config />
              {isOpenConfigMenu && (
                <DropDownMenu
                  menuArray={onConfig.configMenu}
                  menuHandlerArray={onConfig.configMenuHandler}
                />
              )}
            </ConfigButton>
          ) : null}
        </ServiceNameHeaderButtonGroup>
        <HeaderInput
          onChange={handleChangeHeaderInput}
          searchModeType={searchModeType}
          isDeleteMemoMode={isDeleteMemoMode}
          placeholder={
            searchModeType === "board"
              ? "보드를 검색하세요."
              : searchModeType === "memo"
              ? "메모 내용을 검색하세요"
              : "내용을 검색하세요"
          }
          onKeyDown={onKeyDownSearchInput}
        />
        {isDeleteMemoMode ? (
          <UnselectButton isActive={true}>선택 해제</UnselectButton>
        ) : null}
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
    props.searchModeType || props.isDeleteMemoMode
      ? css`
          ${moveSearchButton} 0.3s linear
        `
      : ""};
  animation-fill-mode: forwards;
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
  background-color: rgba(118, 118, 128, 0.12);
  border: none;
  border-radius: 0.5rem;
  display: ${(props) =>
    props.searchModeType || props.isDeleteMemoMode ? "block" : "none"};
  animation: ${(props) =>
    props.searchModeType
      ? css`
          ${expandSearchInput} 0.3s linear
        `
      : props.isDeleteMemoMode
      ? css`
          ${expandDeleteMemoInput} 0.3s linear
        `
      : ""};
  animation-fill-mode: forwards;
`;

const UnselectButton = styled.button`
  color: ${(props) => (props.isActive ? "#757879" : "#757879")};
  background-color: transparent;
  border: none;
`;

export default ServiceNameHeader;
