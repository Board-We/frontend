import styled from "styled-components";
import CheckImage from "../../../assets/checkbox.png";
const CheckableMemo = ({ id, text, onChange }) => {
  return (
    <MemoWrapper>
      <Checkbox type="checkbox" onChange={onChange} value={id} id="checker" />
      <CheckLabel htmlFor="checker" />
      {text}
    </MemoWrapper>
  );
};

export default CheckableMemo;

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
  appearance: none;
  display: block;
  position: absolute;
  width: 1.2rem;
  height: 1.2rem;
  margin: 0.5rem;
  left: 0;
  top: 0;
  cursor: pointer;
  border: 1px solid ${(props) => props.theme.colors.grey_30};
  border-radius: 0.2rem;

  &:checked {
    border: none;
    background: url(${CheckImage}) no-repeat center center;
    background-size: 1.2rem 1.2rem;
  }
`;

const CheckLabel = styled.label``;
