import React from "react";
import styled, { ThemeProvider } from "styled-components";

const FooterButton = React.forwardRef(
  ({ color, fontColor, text, onClick, disabled, flat }, ref) => (
    <ButtonWrapper ref={ref} flat={flat}>
      <Button
        color={color}
        fontColor={fontColor}
        text={text}
        onClick={disabled ? null : onClick}
        disabled={disabled}
        flat={flat}
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
  padding: ${(props) => (props.flat ? null : "1.2rem")};
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  width: 100vw;
  max-width: 700px;
  border-radius: ${(props) => (props.flat ? null : "0.5rem")};
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
