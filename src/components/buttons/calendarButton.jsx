import { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import styled, { keyframes, css } from "styled-components";
import { ReactComponent as Calendar } from "../../assets/calendar.svg";
import { boardState } from "../../store";
import { formattingDateObject } from "../../utils/setDefaultDay";

const CalendarButton = ({ open, isHidden }) => {
  const board = useRecoilValue(boardState);
  return (
    <ComponentWrapper>
      <CalendarContainer open={open} isHidden={isHidden}>
        {open ? (
          `${formattingDateObject(board.openEndTime)}에 공개됩니다.`
        ) : (
          <Calendar />
        )}
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
  display: ${(props) => (props.isHidden ? "none" : "flex")};
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
      : props.open &&
        css`
          ${collapseCalendarButton} 0.3s ease-in-out forwards
        `};
`;
