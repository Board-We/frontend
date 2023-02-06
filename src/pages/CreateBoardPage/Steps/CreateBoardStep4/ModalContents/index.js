import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ReactComponent as Close } from "../../../../../assets/icons/close.svg";
import { boardState, setDateStepId } from "../../../../../store";
import DatePicker from "../Components/datePicker";

function ModalContents({ setModalOpen }) {
  const [step, setStep] = useRecoilState(setDateStepId);
  const [board, setBoard] = useRecoilState(boardState);
  const [selectedDatetime, setSelectedDatetime] = useState();

  useEffect(() => {
    if (step > 3) {
      setModalOpen(false);
    }
    setSelectedDatetime(getSelectedDateTime)
  }, [setModalOpen, setStep, step]);

  const getSetter = () => {
    if (step === 0) return setWritingStartTime;
    else if (step === 1) return setWritingEndTime;
    else if (step === 2) return setOpenStartTime;
    else if (step === 3) return setOpenEndTime;
  };

  const getDateTime = () => {
    if (step === 0) return new Date();
    else if (step === 1) return board.writingStartTime;
    else if (step === 2) return board.writingEndTime;
    else if (step === 3) return board.openStartTime;
  };

  const getSelectedDateTime = () => {
    if (step === 0) return board.writingStartTime;
    else if (step === 1) return board.writingEndTime;
    else if (step === 2) return board.openStartTime;
    else if (step === 3) return board.openEndTime;
  };

  const onClickConfirm = (selectedDatetime) => {
    getSetter()(selectedDatetime);
    setStep((prev) => prev + 1);
  };

  const setWritingStartTime = () => {
    setBoard({ ...board, writingStartTime: selectedDatetime });
  };

  const setWritingEndTime = () => {
    setBoard({ ...board, writingEndTime: selectedDatetime });
  };

  const setOpenStartTime = () => {
    setBoard({ ...board, openStartTime: selectedDatetime });
  };

  const setOpenEndTime = () => {
    setBoard({ ...board, openEndTime: selectedDatetime });
  };

  return (
    <ModalContainer>
      <StepDiscription step={step} setModalOpen={setModalOpen} />
      <DatePicker
        text={step % 2 === 0 ? `부터` : `까지`}
        datetime={getDateTime()}
        selectedDatetime={selectedDatetime}
        setSelectedDatetime={setSelectedDatetime}
        step={step}
      />
      <FooterButton onClick={onClickConfirm}>확인</FooterButton>
    </ModalContainer>
  );
}

const FooterButton = styled.button`
  width: 100%;
  height: 3.5rem;
  border-radius: 0.75rem;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5rem;
  margin: 1rem 0;
  color: ${(props) => props.theme.colors.black};
  background-color: ${(props) => props.theme.colors.primary};
  border: none;
  cursor: pointer;
`;

export default ModalContents;

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const StepDiscription = ({ step, setModalOpen }) => {
  return (
    <Container>
      <DiscriptionContainer>
        <p style={{ color: "black" }}>
          롤링 페이퍼 {step < 2 ? "받는" : "공개"} 기간
        </p>
        {step < 2 ? (
          <span>친구들이 롤링 페이퍼를 작성할 수 있어요.</span>
        ) : (
          <span>작성된 롤링페이퍼를 확인할 수 있어요.</span>
        )}
      </DiscriptionContainer>
      <CloseButton
        onClick={() => {
          setModalOpen(false);
        }}
      >
        <Close />
      </CloseButton>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  p {
    text-align: left;
    font-size: 1.5rem;
    font-weight: 700;
    margin: 0;
  }
  span {
    font-size: 1rem;
    color: #b1b1b1;
    padding-top: 0.5rem;
  }
`;

const DiscriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;
