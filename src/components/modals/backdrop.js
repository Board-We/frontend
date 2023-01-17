import styled from "styled-components";

const Backdrop = ({ open, onClick }) => {
  return <BackDropOverlay open={open} onClick={onClick} />;
};

export default Backdrop;

const BackDropOverlay = styled.div`
  position: fixed;
  display: ${(props) => (props.open ? "block" : "none")};
  top: 0;
  left: 0;
  background: #000000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  opacity: 0.5;
  z-index: 999;
`;
