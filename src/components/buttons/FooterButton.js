import React from "react";
import styled from "styled-components";

const FooterButton = ({ color, fontColor, text, onClick, disabled }) => {
  return (
    <ButtonWrapper>
      <Button
        color={color}
        fontColor={fontColor}
        text={text}
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </Button>
    </ButtonWrapper>
  );
};
const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1.2rem;
`;
const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.2rem;
  width: 100%;
  border-radius: 0.5rem;
  font-size: 1.3rem;

  color: ${(props) => (props.fontColor ? props.fontColor : "white")};
  background-color: ${(props) => (props.disabled ? "#D6D6D6" : "black")};
  opacity: ${(props) => (props.disabled ? "0.4" : null)};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  user-select: none;
`;

export default FooterButton;
