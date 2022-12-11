import React from "react";
import styled, { keyframes, css } from "styled-components";
import { ReactComponent as Share } from "../../../assets/share.svg";
import { ReactComponent as Config } from "../../../assets/config.svg";
import { ReactComponent as Search } from "../../../assets/search.svg";
import { ReactComponent as ChevronLeft } from "../../../assets/chevronLeft.svg";

const ServiceNameHeader = ({
  isSearchMode,
  setIsSearchMode,
  setQuery,
  onKeyDownSearchInput,
  canShare,
  canConfig,
  canSearch,
  onClickSearch,
  onClickShare,
  onClickConfig,
}) => {
  const handleClickChevronLeft = () => {
    setIsSearchMode(false);
  };

  const handleChangeSearchInput = (e) => {
    setQuery(e.target.value);
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
          {canSearch && (
            <SearchButton onClick={onClickSearch} isSearchMode={isSearchMode}>
              <Search />
            </SearchButton>
          )}
          {canShare && (
            <ShareButton onClick={onClickShare}>
              <Share />
            </ShareButton>
          )}
          {canConfig && (
            <ConfigButton onClick={onClickConfig}>
              <Config />
            </ConfigButton>
          )}
        </ServiceNameHeaderButtonGroup>
        {isSearchMode && (
          <SearchInput
            onChange={handleChangeSearchInput}
            isSearchMode={isSearchMode}
            placeholder="보드를 검색하세요."
            onKeyDown={onKeyDownSearchInput}
          />
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
  position: relative;
  display: flex;
  align-items: center;
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
  align-items: center;
`;

const ChevronLeftButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const moveSearchButton = keyframes`
0% {
 right:0;
}


100% {
  right: 87%;
}


`;

const SearchButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  right: 0;
  position: absolute;
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
  margin-right: 1rem;
  cursor: pointer;
`;

const ConfigButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
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
