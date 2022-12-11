import { useEffect } from "react";
import styled from "styled-components";
import { ReactComponent as Close } from "../../../../../assets/close.svg";
import { ReactComponent as Check } from "../../../../../assets/check.svg";

const SelectModal = ({ children, open, onClose, isBackground, height }) => {
  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflow = open ? "hidden" : "auto";
  });

  return (
    <>
      <ModalContainer height={height} isBackground={isBackground}>
        {children}
        <FooterContainer>
          <Button onClick={onClose}>
            <Close />
          </Button>
          {isBackground ? "배경" : "메모지"}
          <Button onClick={onClose}>
            <Check />
          </Button>
        </FooterContainer>
      </ModalContainer>
    </>
  );
};

export default SelectModal;

const ModalContainer = styled.div`
  position: fixed;
  width: 100%;
  max-width: 600px;
  height: ${(props) => `${props.height}`};
  bottom: 0;
  right: 0;
  left: 0;
  margin: 0 auto;
  background-color: #dcdcdc;
  display: flex;
  flex-direction: column;
  z-index: 1500;
  padding: ${(props) => (props.isBackground ? "2rem" : 0)};
`;

const FooterContainer = styled.div`
  width: 100%;
  max-width: 600px;
  width: 100%;
  height: 6.5vh;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  cursor: pointer;
  border: none;
  background-color: transparent;
`;
