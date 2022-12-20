import React, { useState } from "react";
import styled from "styled-components";
import DayPicker from "../Components/DayPicker";

function SetAttachableEndTerm() {
  const [attachableEndDate, setAttachableEndDate] = useState("");
  const [attachableEndTime, setAttachableEndTime] = useState("");

  return (
    <Container>
      <DayPicker
        date={attachableEndDate}
        time={attachableEndTime}
        setTime={setAttachableEndTime}
        setDate={setAttachableEndDate}
      />
      <p style={{ color: "black" }}>까지</p>
    </Container>
  );
}

export default SetAttachableEndTerm;

const Container = styled.div`
  display: flex;
  align-items: center;
  p {
    margin: 0;
    font-weight: 700;
    font-size: 1.2rem;
  }
`;
