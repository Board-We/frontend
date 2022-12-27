import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { ReactComponent as Close } from "../../../../../assets/icons/close.svg";
import { setDateStepId } from "../../../../../store";
import DatePicker from "../Components/datePicker";
import SetAttachableEndTerm from "./SetAttachableEndTerm";
import SetAttachableStartTerm from "./SetAttachableStartTerm";
import SetOpenEndTerm from "./SetOpenEndTerm";
import SetOpenStartTerm from "./SetOpenStartTerm";
function ModalContents({ setModalOpen }) {
  const [step, setStep] = useRecoilState(setDateStepId);

  const handleStepClick = () => {
    setStep((prev) => prev + 1);
  };

  const renderModalBody = (stepId) => {
    switch (stepId) {
      case 1:
        return <SetAttachableStartTerm />;
      case 2:
        return <SetAttachableEndTerm />;
      case 4:
        return <SetOpenStartTerm />;
      case 5:
        return <SetOpenEndTerm />;
      default:
        break;
    }
  };

  useEffect(() => {
    if (step === 3 || step === 6) {
      setModalOpen(false);
      setStep(1);
    }
  }, [setModalOpen, setStep, step]);

  return (
    <ModalContainer>
      <StepDiscription
        step={step}
        setStep={setStep}
        setModalOpen={setModalOpen}
      />
      <DatePicker />
      <FooterButton onClick={handleStepClick}>확인</FooterButton>
    </ModalContainer>
  );
}

const FooterButton = styled.button`
  width: 100%;
  height: 5vh;
  border-radius: 12px;
  font-size: 1.5rem;
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

const StepDiscription = ({ step, setStep, setModalOpen }) => {
  return (
    <Container>
      <DiscriptionContainer>
        <p style={{ color: "black" }}>
          롤링 페이퍼 {step <= 2 ? "받는" : "공개"} 기간
        </p>
        {step <= 2 ? (
          <span>친구들이 롤링 페이퍼를 작성할 수 있어요.</span>
        ) : (
          <span>작성된 롤링페이퍼를 확인할 수 있어요.</span>
        )}
      </DiscriptionContainer>
      <CloseButton
        onClick={() => {
          setModalOpen(false);
          setStep(1);
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
