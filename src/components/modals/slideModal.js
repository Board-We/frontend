import { React, forwardRef } from "react";
import styled from "styled-components";
import Backdrop from "./backdrop";

const SlideModal = forwardRef(
  ({ children, open, onClose, height, isBackdrop }, ref) => {
    return (
      <>
        <ModalContainer open={open} height={height} ref={ref}>
          {children}
        </ModalContainer>
        {/* {isBackdrop ? <Backdrop open={open} onClick={onClose} /> : null} */}
      </>
    );
  }
);

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
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  border: 1px solid ${(props) => props.theme.colors.grey_35};
  z-index: 1500;
  padding: 1.5rem;
  visibility: ${(props) => (props.open ? "visible" : "hidden")};
`;
