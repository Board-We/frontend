import { useEffect } from "react";
import styled from "styled-components";
import Backdrop from "./backdrop";

const AlertModal = ({ open, onClose, text }) => {
  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflow = open ? "hidden" : "auto";
  });
  return (
    <>
      <ModalContainer>
        <ModalDescription>{text}</ModalDescription>
        <CloseButton onClick={onClose}>확인</CloseButton>
      </ModalContainer>
      <Backdrop onClick={onClose}></Backdrop>
    </>
  );
};

export default AlertModal;

const ModalContainer = styled.div`
  width: 90%;
  max-width: 600px;
  height: 20%;
  background-color: white;
  position: fixed;
  bottom: 0;
  top: 0;
  right: 0;
  left: 0;
  margin: auto auto;
  z-index: 1500;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.3rem;
  padding: 2rem;
`;

const ModalDescription = styled.div``;

const CloseButton = styled.div`
  background-color: #868686;
  padding: 0.5rem 3rem;
  border-radius: 0.3rem;
  color: white;
  cursor: pointer;
`;