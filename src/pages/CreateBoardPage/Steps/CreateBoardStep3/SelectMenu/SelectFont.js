import { useState } from "react";
import styled from "styled-components";

const fonts = ["기본 서체", "배달의민족 서체", "노트 산스", "스포카 한산스"];

const SelectFont = () => {
  const [selectedFont, setSelectedFont] = useState("기본 서체");

  const handleClickFontBox = (e) => {
    setSelectedFont(e.target.innerText);
  };

  return (
    <SelectFontContainer>
      {fonts.map((font) => (
        <FontBox
          key={font}
          onClick={handleClickFontBox}
          selected={selectedFont === font}
        >
          {font}
        </FontBox>
      ))}
    </SelectFontContainer>
  );
};

export default SelectFont;

const SelectFontContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  padding: 1.5rem;
  gap: 1rem;
`;

const FontBox = styled.div`
  background-color: ${(props) => (props.selected ? "white" : "#EBEBEB")};
  padding: 0.8rem;
  border-radius: 0.5rem;
  cursor: pointer;
`;
