import { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";
import styled, { keyframes, css } from "styled-components";
import { ReactComponent as Calendar } from "../../assets/icons/calendar.svg";
import { boardState } from "../../store";
import { formattingDateObject } from "../../utils/setDefaultDay";
import { ReactComponent as ArrowRight } from "../../assets/icons/arrowRight.svg";

const CalendarButton = ({ openState, setOpenState }) => {
  const board = useRecoilValue(boardState);
  const dueDateRef = useRef();

  console.log(openState);
  useEffect(() => {
    if (openState.open) {
      setTimeout(() => {
        dueDateRef.current.innerText = `${formattingDateObject(
          board.openEndTime
        )}까지 공개됩니다.`;
      }, 250);
    }
  }, [openState.open, board.openEndTime]);

  return (
    <ComponentWrapper>
      <CalendarContainer
        open={openState.open}
        onClick={
          !openState.open
            ? () => setOpenState({ ...openState, open: true })
            : null
        }
      >
        {openState.open ? (
          <>
            <DueDateText ref={dueDateRef} />
            <ArrowRight
              onClick={() =>
                setOpenState({ ...openState, open: false, auto: false })
              }
            />
          </>
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
  max-width: 600px;
  position: absolute;
  bottom: 0;
  right: 0;
  left: 0;
  margin: auto 0;
  padding: 1rem;
  z-index: 500;
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
  padding: 0rem 1rem;
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

const DueDateText = styled.div`
  width: 100%;
`;
