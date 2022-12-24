import styled from "styled-components";
import { ReactComponent as ChevronRight } from "../../../assets/icons/chevronRight.svg";
import { ReactComponent as Close } from "../../../assets/icons/close.svg";

const StepHeader = ({ title, onClick, isFinalStep, stepId }) => {
  return (
    <StepHeaderContainer>
      {stepId === 1 ? (
        <GoBackStepButton onClick={onClick}>
          <Close />
        </GoBackStepButton>
      ) : !isFinalStep ? (
        <GoBackStepButton onClick={onClick}>
          <ChevronRight />
        </GoBackStepButton>
      ) : null}
      <StepHeaderTitle>{title}</StepHeaderTitle>
      {isFinalStep && (
        <CloseButton>
          <Close />
        </CloseButton>
      )}
    </StepHeaderContainer>
  );
};

export default StepHeader;

const StepHeaderContainer = styled.div`
  width: 100%;
  height: 3rem;
  min-height: 3rem;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.25rem;
  font-weight: 500;
`;

const StepHeaderTitle = styled.div`
  width: 100%;
  font-size: 1.2rem;
`;

const GoBackStepButton = styled.button`
  position: absolute;
  left: 5%;
  top: 0;
  bottom: 0;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

const CloseButton = styled.button`
  position: absolute;
  right: 5%;
  top: 0;
  bottom: 0;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;
