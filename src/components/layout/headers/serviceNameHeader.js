import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import { ReactComponent as Share } from "../../../assets/share.svg";
import { ReactComponent as Config } from "../../../assets/config.svg";
import { ReactComponent as Search } from "../../../assets/search.svg";
import { ReactComponent as ChevronLeft } from "../../../assets/chevronLeft.svg";
import DropDownMenu from "./dropDownMenu";

const ServiceNameHeader = ({
  isSearchMode,
  setIsSearchMode,
  setQuery,
  onKeyDownSearchInput,
  onShare,
  onConfig,
  onSearch,
}) => {
  const [isOpenConfigMenu, setIsOpenConfigMenu] = useState(false);

  const handleClickChevronLeft = () => {
    setIsSearchMode(false);
  };

  const handleChangeSearchInput = (e) => {
    setQuery(e.target.value);
  };

  const handleClickConfig = () => {
    setIsOpenConfigMenu((prev) => !prev);
  };

  return (
    <ComponentWrapper>
      <ServiceNameHeaderContainer>
        {!isSearchMode && (
          <ServiceNameHeaderTitle>Side project</ServiceNameHeaderTitle>
        )}
        {isSearchMode && (
          <ChevronLeftButton>
            <ChevronLeft onClick={handleClickChevronLeft} />
          </ChevronLeftButton>
        )}
        <ServiceNameHeaderButtonGroup>
          {onSearch ? (
            <SearchButton onClick={onSearch} isSearchMode={isSearchMode}>
              <Search />
            </SearchButton>
          ) : null}
          {onShare && !isSearchMode ? (
            <ShareButton onClick={onShare}>
              <Share />
            </ShareButton>
          ) : null}
          {onConfig && !isSearchMode ? (
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
        <SearchInput
          onChange={handleChangeSearchInput}
          isSearchMode={isSearchMode}
          placeholder="보드를 검색하세요."
          onKeyDown={onKeyDownSearchInput}
        />
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
    props.isSearchMode
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

const ConfigMenuList = styled.div`
  background-color: white;
  width: 500%;
  position: absolute;
  z-index: 9999;
  box-shadow: 0px 2px 12px rgba(73, 72, 72, 0.25);
  border-radius: 0.5rem;
  padding: 0.5rem;
`;

const ConfigMenu = styled.div`
  text-align: end;
  padding: 0.5rem;
  &:hover {
    background-color: #d2d2d2;
  }
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

const SearchInput = styled.input`
  position: absolute;
  right: 0;
  width: 0;
  margin: 0.5rem;
  padding: 0.5rem;
  padding-left: 2.5rem;
  background-color: rgba(118, 118, 128, 0.12);
  border: none;
  border-radius: 0.5rem;
  display: ${(props) => (props.isSearchMode ? "block" : "none")};
  animation: ${(props) =>
    props.isSearchMode
      ? css`
          ${expandSearchInput} 0.3s linear
        `
      : ""};
  animation-fill-mode: forwards;
`;

export default ServiceNameHeader;
