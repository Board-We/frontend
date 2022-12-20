import React, { useState } from "react";
import styled from "styled-components";
import DayPicker from "../Components/DayPicker";

const SetOpenEndTerm = () => {
  const [openEndDate, setOpenEndDate] = useState("");
  const [openEndTime, setOpenEndTime] = useState("");

  return (
    <Container>
      <DayPicker
        date={openEndDate}
        time={openEndTime}
        setTime={setOpenEndTime}
        setDate={setOpenEndDate}
      />
      <p style={{ color: "black" }}>까지</p>
    </Container>
  );
};

export default SetOpenEndTerm;

const Container = styled.div`
  display: flex;
  align-items: center;
  p {
    margin: 0;
    font-weight: 700;
    font-size: 1.2rem;
  }
`;
