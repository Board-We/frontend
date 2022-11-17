import styled from "styled-components";

const Memo = ({ text }) => {
  return <MemoWrapper>{text}</MemoWrapper>;
};

export default Memo;

const MemoWrapper = styled.div`
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-radius: 0.5rem;
  aspect-ratio: 1 / 1;
`;
