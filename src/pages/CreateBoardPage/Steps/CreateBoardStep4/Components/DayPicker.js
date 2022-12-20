import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import AlertModal from "../../../../../components/modals/alertModal";
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

  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  const handleDate = (e) => {
    const date = e.target.value.split("-");
    setDate(date);
  };

  const handleTime = (e) => {
    const time = e.target.value.split(":");
    setTime(time);
  };

  const calculateIsValidBoardDate = (d1, d2) => {
    const diffDate = d1.getTime() - d2.getTime();
    if (Math.abs(diffDate / (1000 * 3600 * 24)) <= 28) return true;
    return false;
  };

  const handleCloseAlertModal = () => {
    setIsAlertModalOpen(false);
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
        const userInputDate = new Date(
          Number(date[0]),
          Number(date[1]) - 1,
          Number(date[2]),
          Number(time[0]),
          0,
          0,
          0
        );
        if (calculateIsValidBoardDate(board.writingStartTime, userInputDate)) {
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
        } else {
          setIsAlertModalOpen(true);
          return;
        }
      } else if (step === 4) {
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
      } else if (step === 5) {
        const userInputDate = new Date(
          Number(date[0]),
          Number(date[1]) - 1,
          Number(date[2]),
          Number(time[0]),
          0,
          0,
          0
        );
        if (calculateIsValidBoardDate(board.openStartTime, userInputDate)) {
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
        } else {
          setIsAlertModalOpen(true);
          return;
        }
      }
    }
  }, [time, date, step]);

  console.log(board);

  return (
    <>
      <Container>
        <DatePicker type="date" value={defaultDate} onChange={handleDate} />
        <TimePicker type="time" value={defaultTime} onChange={handleTime} />
      </Container>
      <AlertModal
        open={isAlertModalOpen}
        onClickArray={[handleCloseAlertModal]}
        buttonTextArray={["확인"]}
        text="최대 한달까지 설정 가능합니다."
        onClose={handleCloseAlertModal}
      />
    </>
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
