import styled from "styled-components";
import { ReactComponent as Chevron } from "../../../assets/chevron.svg";

const StepHeader = ({ title, onClick }) => {
  return (
    <StepHeaderContainer>
      <GoBackStepButton onClick={onClick}>
        <Chevron />
      </GoBackStepButton>
      <StepHeaderTitle>{title}</StepHeaderTitle>
    </StepHeaderContainer>
  );
};

export default StepHeader;

const StepHeaderContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  padding: 1rem;
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
