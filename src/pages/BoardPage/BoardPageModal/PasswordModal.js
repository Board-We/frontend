import React, { useState } from "react";
import styled from "styled-components";
import SlideModal from "../../../components/modals/slideModal";

const PasswordModal = ({ open, onClose, onValid }) => {
  const [password, setPassword] = useState("");

  const handleOnChangePasswordInput = (e) => {
    setPassword(e.target.value);
  };
  const handleClickConfrimPassword = () => {
    // To do: 패스워드 확인 인증 로직

    // 올바른 패스워드 입력시
    onValid();
    setPassword("");
    onClose();
  };

  return (
    <SlideModal open={open} onClose={onClose} height="50vh">
      <PasswordModalDescription>
        비밀번호를 입력해주세요
      </PasswordModalDescription>
      <PasswordInputBox>
        <PasswordInput
          value={password}
          onChange={handleOnChangePasswordInput}
          type="text"
          pattern="[0-9]*"
          placeholder="비밀번호를 입력해주세요."
        />
        <ConfirmButton onClick={handleClickConfrimPassword}>확인</ConfirmButton>
      </PasswordInputBox>
    </SlideModal>
  );
};

export default PasswordModal;

const PasswordModalDescription = styled.div`
  margin-bottom: 3rem;
  font-weight: 600;
  font-size: 1.2rem;
`;

const PasswordInputBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  align-items: center;
`;

const PasswordInput = styled.input`
  display: flex;
  background-color: #f3f3f3;
  padding: 0.1rem 0.5rem 0.1rem 0.5rem;
  border: none;
  border-radius: 0.5rem;
  width: 100%;
  padding: 1rem;
`;

const ConfirmButton = styled.button`
  position: absolute;
  height: 100%;
  display: flex;
  justify-content: center;
  background-color: gray;
  color: white;
  align-items: center;
  font-size: 1.2rem;
  cursor: pointer;
  right: 0;
  top: 0;
  border: 0;
  padding: 0 1.2rem 0 1.2rem;
  border-radius: 0.5rem;
`;
