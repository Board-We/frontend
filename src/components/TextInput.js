import React from "react";
import styled from "styled-components";

function TextInput({
  commonSize,
  placeholder,
  type,
  onChange,
  disabled,
  maxLength,
}) {
  return (
    <InputArea
      commonSize={commonSize}
      placeholder={placeholder}
      type={type}
      onChange={onChange}
      disabled={disabled}
      maxLength={maxLength}
    />
  );
}

export default TextInput;

const InputArea = styled.input`
  width: ${(props) => (props.commonSize === true ? "100%" : "40%")};
  height: 2.75rem;
  outline: none;
  border-style: hidden;
  border-bottom: 0.1rem solid #b4b4b4;
  margin-top: 1rem;
  font-size: 1.2rem;

  &:focus {
    outline: none;
  }
`;
