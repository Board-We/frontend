import { useEffect } from "react";
import styled from "styled-components";
import Backdrop from "./backdrop";
import { ReactComponent as Alert } from "../../assets/icons/alert.svg";

const AlertModal = ({ open, onClickArray, buttonTextArray, text, onClose }) => {
  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflow = open ? "hidden" : "auto";
  });
  return (
    <>
      <ModalContainer open={open}>
        <div>
          <Alert />
        </div>
        <ModalDescription>{text}</ModalDescription>
        <ButtonContainer>
          {buttonTextArray.map((el, i) => {
            return (
              <ButtonStyle onClick={onClickArray[i]} key={el}>
                {el}
              </ButtonStyle>
            );
          })}
        </ButtonContainer>
      </ModalContainer>
      <Backdrop open={open} onClick={onClose}></Backdrop>
    </>
  );
};

export default AlertModal;

const ModalContainer = styled.div`
  width: 90%;
  max-width: 500px;
  height: 20%;
  background-color: white;
  position: fixed;
  bottom: 0;
  top: 0;
  right: 0;
  left: 0;
  margin: auto auto;
  z-index: 9999999;
  display: ${(props) => (props.open ? "flex" : "none")};
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.3rem;
  padding: 2rem;
`;

const ModalDescription = styled.div`
  color: ${(props) => props.theme.colors.black};
`;

const ButtonStyle = styled.div`
  background-color: #868686;
  padding: 0.8rem;
  border-radius: 12px;
  width: 160px;
  margin: 0.5rem;
  color: white;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  div:first-child {
    background-color: ${(props) => props.theme.colors.grey_50};
    color: ${(props) => props.theme.colors.black};
  }

  div:last-child {
    background-color: ${(props) => props.theme.colors.primary};
    color: ${(props) => props.theme.colors.black};
  }
`;
