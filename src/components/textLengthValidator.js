import styled from "styled-components";

const TextLengthValidator = ({ maxLength, text, isValidLength }) => {
  return (
    <TextLengthValidatorContainer>
      {!isValidLength && (
        <InvalidMessageText>{`${maxLength}자 이내로 작성해주세요`}</InvalidMessageText>
      )}
      <TextCounter isOverLength={!isValidLength}>
        {text.length} / {maxLength}
      </TextCounter>
    </TextLengthValidatorContainer>
  );
};

export default TextLengthValidator;

const TextLengthValidatorContainer = styled.div`
  width: 100%;
  display: flex;
  position: relative;
`;

const InvalidMessageText = styled.div`
  color: red;
`;

const TextCounter = styled.div`
  position: absolute;
  right: 0;
  color: ${(props) => (props.isOverLength ? "red" : "gray")};
  p {
    font-size: 0.8rem;
  }
`;
