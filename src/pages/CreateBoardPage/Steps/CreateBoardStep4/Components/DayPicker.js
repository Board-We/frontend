import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { boardState, setDateStepId } from "../../../../../store";

const DayPicker = ({
  date,
  time,
  setDate,
  setTime,
  defaultDate,
  defaultTime,
}) => {
  const [step, setStep] = useRecoilState(setDateStepId);
  const [board, setBoard] = useRecoilState(boardState);

  const handleDate = (e) => {
    const date = e.target.value.split("-");
    setDate(date);
  };

  const handleTime = (e) => {
    const time = e.target.value.split(":");
    setTime(time);
  };

  useEffect(() => {
    if (time.length & date.length) {
      if (step === 1) {
        const boardState = {
          ...board,
          writingStartTime: new Date(
            Number(date[0]),
            Number(date[1]) - 1,
            Number(date[2]),
            Number(time[0]),
            0,
            0,
            0
          ),
        };
        setBoard(boardState);
      } else if (step === 2) {
        const boardState = {
          ...board,
          writingEndTime: new Date(
            Number(date[0]),
            Number(date[1]) - 1,
            Number(date[2]),
            Number(time[0]),
            0,
            0,
            0
          ),
        };
        setBoard(boardState);
      } else if (step === 3) {
        const boardState = {
          ...board,
          openStartTime: new Date(
            Number(date[0]),
            Number(date[1]) - 1,
            Number(date[2]),
            Number(time[0]),
            0,
            0,
            0
          ),
        };
        setBoard(boardState);
      } else if (step === 4) {
        const boardState = {
          ...board,
          openEndTime: new Date(
            Number(date[0]),
            Number(date[1]) - 1,
            Number(date[2]),
            Number(time[0]),
            0,
            0,
            0
          ),
        };
        setBoard(boardState);
      }
    }
  }, [time, date, step]);

  console.log(board);

  return (
    <Container>
      <DatePicker type="date" value={defaultDate} onChange={handleDate} />
      <TimePicker type="time" value={defaultTime} onChange={handleTime} />
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
