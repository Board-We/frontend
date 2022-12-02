import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { boardState, setDateStepId } from "../../../../store";

const DayPicker = ({ date, time, setDate, setTime }) => {
  const [step, setStep] = useRecoilState(setDateStepId);
  const [board, setBoard] = useRecoilState(boardState);

  const handleDate = (e) => {
    setDate(e.target.value);
  };

  const handleTime = (e) => {
    setTime(e.target.value);
  };

  useEffect(() => {
    if (step === 1) {
      const boardState = {
        ...board.attachableTerm,
        start: `${date + " " + time}`,
      };
      setBoard((prev) => {
        return {
          ...prev,
          attachableTerm: boardState,
        };
      });
    } else if (step === 2) {
      const boardState = {
        ...board.attachableTerm,
        end: `${date + " " + time}`,
      };
      setBoard((prev) => {
        return {
          ...prev,
          attachableTerm: boardState,
        };
      });
    } else if (step === 3) {
      const boardState = {
        ...board.openTerm,
        start: `${date + " " + time}`,
      };
      setBoard((prev) => {
        return {
          ...prev,
          openTerm: boardState,
        };
      });
    } else if (step === 4) {
      const boardState = {
        ...board.openTerm,
        end: `${date + " " + time}`,
      };
      setBoard((prev) => {
        return {
          ...prev,
          openTerm: boardState,
        };
      });
    }
  }, [date, time, step]);

  return (
    <Container>
      <DatePicker type="date" value={date} onChange={handleDate} />
      <TimePicker type="time" value={time} onChange={handleTime} />
    </Container>
  );
};

export default DayPicker;

const Container = styled.div`
  width: 90%;
  display: flex;
  height: 5vh;
`;
const DatePicker = styled.input`
  width: 45%;
`;

const TimePicker = styled.input`
  width: 45%;
`;
