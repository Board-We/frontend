import { useEffect } from "react";
import styled from "styled-components";

const Backdrop = ({ open, onClick }) => {
  useEffect(() => {
    const body = document.querySelector("body");
    body.style.overflow = open ? "hidden" : "auto";
  });
  return <BackDropOverlay onClick={onClick} />;
};

export default Backdrop;

const BackDropOverlay = styled.div`
  position: fixed;
  background: #000000;
  width: 100%;
  height: 100vh;
  opacity: 0.5;
  z-index: 999999;
`;
