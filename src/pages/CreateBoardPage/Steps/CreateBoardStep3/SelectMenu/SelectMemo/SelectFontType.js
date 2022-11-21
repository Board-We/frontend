import React, { useState } from "react";
import styled from "styled-components";

const SelectFontType = () => {
  const [fontType, setFontType] = useState([
    "폰트1",
    "폰트2",
    "폰트3",
    "폰트4",
  ]);
  return (
    <FontSelectContainer>
      <p>보드에 전부 적용될 서체입니다.</p>
      {fontType?.map((item, idx) => {
        return (
          <React.Fragment key={idx}>
            <FontItem>{item}</FontItem>
          </React.Fragment>
        );
      })}
    </FontSelectContainer>
  );
};

const FontSelectContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 2rem;
  p {
    font-size: 0.9rem;
    text-align: left;
  }
`;

const FontItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
  border-radius: 4px;

  width: 18.5rem;
  height: 2rem;
  margin-bottom: 1rem;
  cursor: pointer;
`;

export default SelectFontType;