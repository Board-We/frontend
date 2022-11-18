import styled from "styled-components";

const Memo = ({ id, text, isRemoveMode, onChange }) => {
  return (
    <MemoWrapper>
      {isRemoveMode && (
        <Checkbox type="checkbox" onChange={onChange} value={id} />
      )}
      {text}
    </MemoWrapper>
  );
};

export default Memo;

const MemoWrapper = styled.div`
  position: relative;
  width: 100%;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  border-radius: 0.5rem;
  aspect-ratio: 1 / 1;
`;

const Checkbox = styled.input`
  position: absolute;
  width: 1.2rem;
  height: 1.2rem;
  top: 0;
  left: 0;
  margin: 0.5rem;
`;
