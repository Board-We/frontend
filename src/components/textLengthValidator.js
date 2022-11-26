import styled from "styled-components";

const TextLengthValidator = ({ maxLength, text }) => {
  return (
    <TextCounter isOverLegth={text.length > maxLength}>
      {text.length} / {maxLength}
    </TextCounter>
  );
};

export default TextLengthValidator;

const TextCounter = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  color: ${(props) => (props.isOverLegth ? "red" : "gray")};
  p {
    font-size: 0.8rem;
  }
`;
