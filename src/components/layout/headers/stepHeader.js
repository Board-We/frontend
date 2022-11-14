import styled from "styled-components";

const StepHeader = ({ title, onClick }) => {
  return (
    <StepHeaderContainer>
      <GoBackStepButton onClick={onClick}>{"<"}</GoBackStepButton>
      <StepHeaderTitle>{title}</StepHeaderTitle>
    </StepHeaderContainer>
  );
};

export default StepHeader;

const StepHeaderContainer = styled.div`
  width: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  padding: 1rem;
  box-sizing: border-box;
`;

const StepHeaderTitle = styled.div`
  font-size: 1.2rem;
  width: 100%;
`;

const GoBackStepButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;
