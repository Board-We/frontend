import React from "react";
import styled from "styled-components";

const FooterButton = ({ color, fontColor, text, onClick, disabled }) => {
  return (
    <ButtonWrapper>
      <Button color={color} fontColor={fontColor} text={text} onClick={onClick} disabled={disabled}>
        {text}
      </Button>
    </ButtonWrapper>
  );
};
const ButtonWrapper = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 0 0.75rem 0;
  width: 100%;
  max-width: 700px;
  height: 3rem;
  font-size: 1.2rem;
  color: ${(props) => (props.fontColor ? props.fontColor : "white")};
  background-color: ${(props) => (props.color ? props.color : "grey")};
  opacity: ${(props) => props.disabled ? '0.4' : null};
  cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointer'};
  user-select: none;
`;

export default FooterButton;
