import React, { useState } from "react";
import styled from "styled-components";
import SlideModal from "../../../components/modals/slideModal";
import { ReactComponent as Close } from "../../../assets/icons/close.svg";
import { requestLoginBoard } from "../../../api/boardsApi";
import { deleteBoard } from "../../../api/boardsApi";

const PasswordModal = ({
  password,
  setPassword,
  boardCode,
  open,
  onClose,
  onValid,
}) => {
  const handleOnChangePasswordInput = (e) => {
    setPassword(e.target.value);
  };

  const handleClickConfrimPassword = async () => {
    // boardCode는 임의로 처리
    // const isSuccess = await requestLoginBoard({ password, boardCode });

    // 해당 보드 비밀번호 검증 API 필요할듯
    // 검증 후 삭제 확인 모달

    if (true) {
      onValid();
      setPassword("");
      onClose();
    }
  };

  return (
    <SlideModal open={open} onClose={onClose} height="50vh">
      <ContentWrapper>
        <PasswordModalHeader>
          <PasswordModalDescription>
            비밀번호를 입력해주세요
          </PasswordModalDescription>
          <CloseButton onClick={onClose}>
            <Close />
          </CloseButton>
        </PasswordModalHeader>
        <PasswordInputBox>
          <PasswordInput
            value={password}
            onChange={handleOnChangePasswordInput}
            type="text"
            pattern="[0-9]*"
            placeholder="비밀번호를 입력해주세요."
          />
          <ConfirmButton
            disabled={password.length === 0}
            onClick={handleClickConfrimPassword}
          >
            확인
          </ConfirmButton>
        </PasswordInputBox>
      </ContentWrapper>
    </SlideModal>
  );
};

export default PasswordModal;

const ContentWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const PasswordModalHeader = styled.div`
  width: 100%;
  display: flex;
`;

const PasswordModalDescription = styled.div`
  margin-bottom: 3rem;
  font-weight: 600;
  font-size: 1.2rem;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 5%;
  top: 0;
  right: 0;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const PasswordInputBox = styled.div`
  display: flex;
  width: 100%;
  height: 4rem;
  justify-content: flex-start;
  align-items: center;
  padding: 0.5rem;
`;

const PasswordInput = styled.input`
  display: flex;
  background-color: #f3f3f3;
  padding: 0.1rem 0.5rem 0.1rem 0.5rem;
  border: none;
  border-radius: 0.5rem;
  width: 100%;
  height: 100%;
  padding: 1rem;
  margin-right: 0.3rem;
  flex: 8;
  &:focus {
    outline: none;
    border: 1px solid ${(props) => props.theme.colors.primary};
  }
`;

const ConfirmButton = styled.button`
  height: 100%;
  width: 100%;
  flex: 1;
  display: flex;
  justify-content: center;
  background-color: ${(props) =>
    props.disabled ? props.theme.colors.grey_40 : props.theme.colors.primary_2};
  color: ${(props) => props.theme.colors.gery_20};
  align-items: center;
  font-size: 1rem;
  cursor: pointer;
  right: 0;
  top: 0;
  border: 0;
  padding: 0 1.2rem 0 1.2rem;
  border-radius: 0.5rem;
`;
