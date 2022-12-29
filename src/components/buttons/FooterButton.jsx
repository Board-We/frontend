import React from "react";
import styled, { ThemeProvider } from "styled-components";

const FooterButton = React.forwardRef(
  ({ color, fontColor, text, onClick, disabled }, ref) => (
    <ButtonWrapper ref={ref}>
      <Button
        color={color}
        fontColor={fontColor}
        onClick={disabled ? null : onClick}
        disabled={disabled}
      >
        {text}
      </Button>
    </ButtonWrapper>
  )
);

const ButtonWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
  width: 100vw;
  max-width: 600px;
  padding: 1.2rem;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  width: 100vw;
  max-width: 700px;
  border-radius: 0.5rem;
  font-size: 1.3rem;
  color: ${(props) =>
    props.disabled ? props.theme.colors.grey_20 : props.theme.colors.black};
  background-color: ${(props) =>
    props.disabled ? props.theme.colors.grey_40 : props.theme.colors.primary};
  /* opacity: ${(props) => (props.disabled ? "0.4" : null)}; */
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  user-select: none;
`;

export default FooterButton;
