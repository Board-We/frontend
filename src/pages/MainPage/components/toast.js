import React from "react";
import styled from "styled-components";

const Toast = ({ text }) => {
  return (
    <Container>
      <p>{text}</p>
    </Container>
  );
};

export default Toast;

const Container = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 0px;
  z-index: 999;
  bottom: 10%;
  width: 100%;
  max-width: 500px;
  height: 2.75rem;
  background: rgba(58, 58, 58, 0.8);
  box-shadow: ${(props) => props.theme.shadows.shadow_2};
  border-radius: 18px;
  p {
    color: ${(props) => props.theme.colors.white};
  }
`;
