import React from "react";
import styled from "styled-components";
import { ReactComponent as Delete } from "../assets/delete.svg";
import { ReactComponent as AlertExclamation } from "../assets/alertExclamation.svg";

function TextInput({
  value,
  commonSize,
  placeholder,
  type,
  onChange,
  disabled,
  inputMaxLength,
  setTextState,
  isValidLength,
}) {
  const handleClickDeleteText = () => {
    setTextState("");
  };
  return (
    <InputContainer>
      <InputArea
        value={value}
        commonSize={commonSize}
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        disabled={disabled}
        maxLength={inputMaxLength}
      />
      {isValidLength ? (
        <DeleteButton onClick={handleClickDeleteText}>
          <Delete />
        </DeleteButton>
      ) : (
        <AlertExclamationWrapper>
          <AlertExclamation />
        </AlertExclamationWrapper>
      )}
    </InputContainer>
  );
}

export default TextInput;

const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-bottom: 0.1rem solid #b4b4b4;
  position: relative;
`;

const InputArea = styled.input`
  width: ${(props) => (props.commonSize === true ? "100%" : "40%")};
  height: 2.75rem;
  outline: none;
  border-style: hidden;
  border: none;
  margin-top: 1rem;
  font-size: 1.2rem;
  padding-right: 4rem;
  &:focus {
    outline: none;
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  right: 1%;
  top: 50%;
  margin: auto;
  transform: translate(-50%);
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
`;

const AlertExclamationWrapper = styled.div`
  position: absolute;
  right: 1%;
  top: 50%;
  margin: auto;
  transform: translate(-50%);
`;
