import React, { useState } from "react";
import styled from "styled-components";
import DayPicker from "../Components/DayPicker";

const SetOpenStartTerm = () => {
  const [openStartDate, setOpenStartDate] = useState("");
  const [openStartTime, setOpenStartTime] = useState("");

  return (
    <Container>
      <DayPicker
        date={openStartDate}
        time={openStartTime}
        setTime={setOpenStartTime}
        setDate={setOpenStartDate}
      />
      <p style={{ color: "black" }}>부터</p>
    </Container>
  );
};

export default SetOpenStartTerm;

const Container = styled.div`
  display: flex;
  align-items: center;
  p {
    margin: 0;
    font-weight: 700;
    font-size: 1.2rem;
  }
`;
