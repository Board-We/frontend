import React, { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { boardState } from "../../../../../store";
import DayPicker from "../Components/DayPicker";

const SetAttachableStartTerm = () => {
  const [attachableStartDate, setAttachableStartDate] = useState("");
  const [attachableStartTime, setAttachableStartTime] = useState("");

  return (
    <Container>
      <DayPicker
        date={attachableStartDate}
        time={attachableStartTime}
        setTime={setAttachableStartTime}
        setDate={setAttachableStartDate}
      />
      <p style={{ color: "black" }}>부터</p>
    </Container>
  );
};

export default SetAttachableStartTerm;

const Container = styled.div`
  display: flex;
  align-items: center;
  p {
    margin: 0;
    font-weight: 700;
    font-size: 1.2rem;
  }
`;
