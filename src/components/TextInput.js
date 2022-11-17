import React from "react";
import styled from "styled-components";

function TextInput({ commonSize, placeholder, type, onChange }) {
  return (
    <InputArea
      commonSize={commonSize}
      placeholder={placeholder}
      type={type}
      onChange={onChange}
    />
  );
}

export default TextInput;

const InputArea = styled.input`
  width: ${(props) => (props.commonSize === true ? "100%" : "40%")};
  height: 2.75rem;
  border: none;
  border-radius: 4px;
  background-color: #f3f3f3;
  margin-top: 1rem;
  &:focus {
    outline: none;
  }
`;
