import { useEffect } from "react";
import styled from "styled-components";

const SelectModal = ({ children, open, onClose, height }) => {
  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflow = open ? "hidden" : "auto";
  });
  return (
    <>
      <ModalContainer height={height}>{children}</ModalContainer>
    </>
  );
};

export default SelectModal;

const ModalContainer = styled.div`
  position: fixed;
  width: 100%;
  max-width: 700px;
  height: ${(props) => `${props.height}`};
  bottom: 0;
  right: 0;
  left: 0;
  margin: 0 auto;
  background-color: #dcdcdc;
  display: flex;
  flex-direction: column;
  z-index: 1500;
  padding: 1rem;
`;
