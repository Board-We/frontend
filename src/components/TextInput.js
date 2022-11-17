import React from "react";
import styled from "styled-components";

function TextInput({ commonSize, placeholder, type, onChange, disabled }) {
  return (
    <InputArea
      commonSize={commonSize}
      placeholder={placeholder}
      type={type}
      onChange={onChange}
      disabled={disabled}
    />
  );
}

export default TextInput;

const InputArea = styled.input`
  width: ${(props) => (props.commonSize === true ? "100%" : "200px")};
  height: 2.75rem;
  padding: 1rem;
  border: none;
  border-radius: 4px;
  background-color: #f3f3f3;
  &:focus {
    outline: none;
  }
`;
