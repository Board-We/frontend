import { useEffect } from "react";
import styled from "styled-components";
import Backdrop from "./backdrop";

const SlideModal = ({ children, open, onClose, height, isBackdrop }) => {
  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflow = open ? "hidden" : "auto";
  });
  return (
    <>
      <ModalContainer open={open} height={height}>
        {children}
      </ModalContainer>
      {isBackdrop ? <Backdrop onClick={onClose}></Backdrop> : null}
    </>
  );
};

export default SlideModal;

const ModalContainer = styled.div`
  position: fixed;
  width: 100%;
  max-width: 600px;
  height: ${(props) => `${props.height}`};
  bottom: 0;
  right: 0;
  left: 0;
  margin: 0 auto;
  background-color: white;
  display: ${(props) => (props.open ? "flex" : "none")};
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  z-index: 1500;
  padding: 1.5rem;
`;
