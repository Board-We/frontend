import styled from "styled-components";
import { ReactComponent as Chevron } from "../../../assets/chevron.svg";
import { ReactComponent as Close } from "../../../assets/close.svg";

const StepHeader = ({ title, onClick, isFinalStep }) => {
  return (
    <StepHeaderContainer>
      {isFinalStep || (
        <GoBackStepButton onClick={onClick}>
          <Chevron />
        </GoBackStepButton>
      )}
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
  position: relative;
  display: flex;
  justify-content: center;
  padding: 1.5rem 0;
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
