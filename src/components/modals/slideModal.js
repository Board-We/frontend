import { useState } from "react";
import { React, forwardRef } from "react";
import styled from "styled-components";
import { ReactComponent as Vector } from "../../assets/icons/Vector.svg";
import Backdrop from "./backdrop";

const SlideModal = forwardRef(
  ({ children, open, onClose, height, isBackdrop, type }, ref) => {
    const [toggleUp, setToggleUp] = useState(false);

    const handleClickToggle = () => {
      if (!toggleUp) {
        setToggleUp(true);
        ref.current.style.height = "3.25rem";
      } else {
        setToggleUp(false);
        // ref.current.style.height = "";
      }
    };

    return (
      <>
        <ModalContainer open={open} height={height} ref={ref} type={type}>
          {type === "slide-up" && (
            <div>
              {!toggleUp ? (
                <ToggleBtn onClick={handleClickToggle} toggle={toggleUp}>
                  <Vector />
                </ToggleBtn>
              ) : (
                <ToggleBtn onClick={handleClickToggle} toggle={toggleUp}>
                  <Vector />
                </ToggleBtn>
              )}
            </div>
          )}

          {children}
        </ModalContainer>
        {isBackdrop ? <Backdrop open={open} onClick={onClose} /> : null}
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
  padding-top: ${(props) => props.type === "slide-up" && 0};
  visibility: ${(props) => (props.open ? "visible" : "hidden")};
`;

const ToggleBtn = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  transform: ${(props) => (props.toggle ? "rotate(180deg)" : "rotate(0deg)")};
  svg {
    width: 1.5rem;
    height: 1.5rem;
  }
  path {
    fill: #bcbcbc;
  }
`;
