import React, { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";

const Timer = ({ duedate, onTimeOver, text = "" }) => {
  const [timeRemain, setTimeRemain] = useState(100);
  const [date, setDate] = useState(0);
  const [hour, setHour] = useState(0);
  const [min, setMin] = useState(0);
  const [sec, setSec] = useState(0);
  const s = 60;
  const m = 60;
  const h = 24;
  const interval = useRef(null);

  useEffect(() => {
    const newTimeRemain =
      (new Date(duedate).getTime() - new Date().getTime()) / 1000;
    setTimeRemain(newTimeRemain);
  }, [duedate]);

  useEffect(() => {
    refreshTimePannel(timeRemain);
    if (timeRemain < 1) {
      timeOver();
    } else {
      if (interval.current === null) setTimer();
    }
  }, [timeRemain]);

  const setTimer = () => {
    initTimer();
    interval.current = setInterval(() => {
      timeCount();
    }, 1000);
  };

  const refreshTimePannel = (newTime) => {
    const newDate = Math.floor(newTime / s / m / h);
    const newHour = Math.floor((newTime / s / m) % h);
    const newMin = Math.floor((newTime / s) % m);
    const newSec = Math.floor(newTime % s);
    setDate(newDate);
    setHour(newHour);
    setMin(newMin);
    setSec(newSec);
  };

  const timeCount = () => {
    setTimeRemain((timeRemain) => timeRemain - 1);
  };

  const timeOver = () => {
    clearInterval(interval.current);
    interval.current = null;
    if (onTimeOver) onTimeOver();
  };

  const initTimer = () => {
    if (interval.current !== null) clearInterval(interval.current);
  };

  const getNumberpad = (number, string) => {
    let numberStr = number > 9 ? "" + number : "0" + number;
    if (number < 0) numberStr = "00";

    return (
      <NumberPad>
        {numberStr.split("").map((el, i) => {
          return <NumberPannel key={string + el + i}>{el}</NumberPannel>;
        })}
        {string}
      </NumberPad>
    );
  };

  return (
    <ComponentWrapper>
      {duedate ? (
        <NumberpadWrapper>
          {date > 0 ? getNumberpad(date, "일") : null}
          {getNumberpad(hour, "시")}
          {getNumberpad(min, "분")}
          {date < 1 ? getNumberpad(sec, "초") : null}
        </NumberpadWrapper>
      ) : null}
      <div>{text}</div>
    </ComponentWrapper>
  );
};

const ComponentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #373737;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1rem 0.5rem;
  background: rgba(255, 255, 255, 0.8);
  z-index: 1;
`;

const NumberpadWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const NumberPad = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const NumberPannel = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3rem;
  width: 2rem;
  font-size: 1.5rem;
  font-weight: 600;
  border-radius: 0.5rem;
  margin: 0.15rem;
  background: #464849;
  color: white;
`;

export default Timer;
