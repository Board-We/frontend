import styled from "styled-components";
import CheckImage from "../../../assets/checkbox.png";
const CheckableMemo = ({ id, text, onChange }) => {
  return (
    <MemoWrapper>
      <Checkbox type="checkbox" onChange={onChange} value={id} id="checker" />
      <CheckLabel htmlFor="checker" />
      <MemoContent>{text}</MemoContent>
    </MemoWrapper>
  );
};

export default CheckableMemo;

const MemoWrapper = styled.div`
  position: relative;
  width: 95%;
  background-color: white;
  padding: 0.5rem 0.5rem;
  border-radius: 0.5rem;
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

const MemoContent = styled.div`
  margin-left: 2rem;
  height: 100%;
  display: flex;
  text-align: left;
  padding: 1rem;
  padding-top: 0rem;
  padding-left: 0.5rem;
`;
