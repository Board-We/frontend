import { useEffect, useRef } from "react";
import styled, { keyframes, css } from "styled-components";
import { ReactComponent as Calendar } from "../../assets/calendar.svg";

const CalendarButton = ({ open }) => {
  return (
    <ComponentWrapper>
      <CalendarContainer open={open}>
        <Calendar />
      </CalendarContainer>
    </ComponentWrapper>
  );
};

export default CalendarButton;

const expandCalendarButton = keyframes`
  0%{
    width: 50px;
  } 
  100% {
    width: 100%;
  }

`;

const collapseCalendarButton = keyframes`
  from {
    width: 100%;
  } to {
    width: 50px;
  }

`;

const ComponentWrapper = styled.div`
  width: 600px;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto 0;
  padding: 1rem;
  z-index: 1800;
  display: flex;
  justify-content: end;
`;

const CalendarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  right: 0;
  width: 50px;
  height: 50px;
  padding: 1rem;
  border-radius: 25px;
  background-color: ${(props) => props.theme.colors.white};
  animation: ${(props) =>
    props.open
      ? css`
          ${expandCalendarButton} 0.3s ease-in-out forwards
        `
      : css`
          ${collapseCalendarButton} 0.3s ease-in-out forwards
        `};
`;
