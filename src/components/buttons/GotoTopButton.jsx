import styled from "styled-components";
import { ReactComponent as ChevronTop } from "../../assets/icons/chevronTop.svg";

const GotoTopButton = ({ bottom, onClick }) => {
  return (
    <ButtonWrapper bottom={bottom}>
      <ChevronTopButton onClick={onClick}>
        <ChevronTop />
      </ChevronTopButton>
    </ButtonWrapper>
  );
};

export default GotoTopButton;

const ChevronTopButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  filter: drop-shadow(0px 4px 12px rgba(0, 0, 0, 0.25));
  padding: 0.5rem;
  border-radius: 1.5rem;
  border: none;
  cursor: pointer;
`;

const ButtonWrapper = styled.div`
  position: fixed;
  width: 100%;
  max-width: 600px;
  bottom: ${(props) => props.bottom};
  display: flex;
  justify-content: end;
  padding-right: 1rem;
  z-index: 600;
`;
