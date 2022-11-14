import styled from "styled-components";

const NextStepButton = ({ onClick }) => {
  return <BottomButton onClick={onClick}>다음</BottomButton>;
};

export default NextStepButton;

const BottomButton = styled.button`
  width: 100%;
  background-color: black;
  color: white;
  padding: 1.5rem;
  border: none;
  cursor: pointer;
`;
