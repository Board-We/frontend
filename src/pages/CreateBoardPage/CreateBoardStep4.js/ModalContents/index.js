import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";

function ModalContents() {
  // TO do

  const dateRef = useRef(null);
  const timeRef = useRef(null);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const today = new Date().toISOString().substring(0, 10);

  console.log(date);
  console.log(time);

  /* console.log(("0" + today2.getMinutes()).slice(-2));
  console.log(today); */
  const handleDate = (e) => {
    setDate(e.target.value);
  };
  const handleTime = (e) => {
    setTime(e.target.value);
  };
  /*  const filterTime = () => {
    const today = new Date();
    let hour = ("0" + today.getHours()).slice(-2);
    let min = ("0" + today.getMinutes()).slice(-2);
    if (min >= 50 && min <= 59) {
      hour += 2;
      setTime(`${hour}:00`);
    } else {
      hour += 1;
      setTime(`${hour}:00`);
    }
    console.log(time);
    return time;
  }; */

  return (
    <div style={{ display: "flex", width: "100%" }}>
      <DatePicker
        type="date"
        min={today}
        ref={dateRef}
        value={date}
        onChange={handleDate}
      />
      <TimePicker
        type="time"
        value={time}
        ref={timeRef}
        onChange={handleTime}
      />
    </div>
  );
}

export default ModalContents;

const DatePicker = styled.input`
  width: 50%;
`;

const TimePicker = styled.input`
  width: 50%;
`;
