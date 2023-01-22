import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import TextLengthValidator from "../../../components/textLengthValidator";
import { boardState } from "../../../store";
import { ReactComponent as Delete } from "../../../assets/icons/delete.svg";
import { ReactComponent as AlertExclamation } from "../../../assets/icons/alertExclamation.svg";

const maxLength = 50;

const CreateBoardStep2 = ({ setDisabledFooterButton }) => {
  const prevBoardDescription = useRef();
  const [board, setBoard] = useRecoilState(boardState);

  const [heightInput, setHeightInput] = useState(30); // 임시값, 수정 필요
  const [isValidLength, setIsValidLength] = useState(true);

  const textAreaRef = useRef(null);

  const handleChangeTextInput = (e) => {
    prevBoardDescription.current = board.boardDescription;
    setBoard({ ...board, boardDescription: e.target.value });
    setHeightInput(e.target.scrollHeight);
  };

  const handleClickDeleteText = (e) => {
    setBoard({ ...board, boardDescription: "" });
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    board.boardDescription.length >= 1 &&
    board.boardDescription.length < maxLength + 1
      ? setDisabledFooterButton(false)
      : setDisabledFooterButton(true);
  }, [setDisabledFooterButton, board.boardDescription.length]);

  useEffect(() => {
    if (board.boardDescription.length > maxLength) setIsValidLength(false);
    else setIsValidLength(true);
  }, [board.boardDescription, setIsValidLength]);

  useEffect(() => {
    if (board.boardDescription.length === maxLength + 1) {
      setBoard({ ...board, description: prevBoardDescription.current });
    }
  }, [board.boardDescription]);

  useEffect(() => {
    if (textAreaRef) {
      textAreaRef.current.style.height = "auto";
      const scrollHeight = textAreaRef.current.scrollHeight;

      textAreaRef.current.style.height = scrollHeight + "px";
    }
  }, [textAreaRef, board.boardDescription]);

  return (
    <CreateBoardStepContainer>
      <TextInputSection>
        <MultilineTextInput
          value={board.boardDescription}
          onChange={handleChangeTextInput}
          onKeyDown={handleKeyDown}
          height={heightInput}
          ref={textAreaRef}
          maxLength={maxLength + 1}
          rows={1}
          isValidLength={isValidLength}
          placeholder="ex. 이 보드에 3일동안 메모를 남겨줘!"
        />
        {isValidLength ? (
          <DeleteButton onClick={handleClickDeleteText}>
            <Delete />
          </DeleteButton>
        ) : (
          <AlertExclamationWrapper>
            <AlertExclamation />
          </AlertExclamationWrapper>
        )}
      </TextInputSection>
      <CreateBoardGuide>
        <TextLengthValidator
          maxLength={maxLength}
          text={board.boardDescription}
          isValidLength={isValidLength}
        />
      </CreateBoardGuide>
    </CreateBoardStepContainer>
  );
};

export default CreateBoardStep2;

const CreateBoardStepContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  padding: 0 1.25rem;
`;

const CreateBoardGuide = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.5rem;
`;

const TextInputSection = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
`;

const MultilineTextInput = styled.textarea`
  width: 100%;
  font-size: 1.2rem;
  margin-top: 1rem;
  text-align: start;
  padding-right: 4rem;
  padding-bottom: 0.9rem;
  border: 0;
  overflow: hidden;
  border-style: hidden;
  resize: none;
  border-bottom: ${(props) =>
    props.isValidLength
      ? `0.1rem solid ${props.theme.colors.primary}`
      : `0.1rem solid ${props.theme.colors.error}`};

  &:focus {
    outline: none;
  }

  :disabled {
    background-color: inherit;
    color: inherit;
  }

  &:empty:before {
    content: attr(placeholder);
    color: grey;
    display: inline-block;
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  right: 1%;
  top: 40%;
  margin: auto;
  transform: translate(-50%);
  border: none;
  background-color: transparent;
  cursor: pointer;
  padding: 0;
`;

const AlertExclamationWrapper = styled.div`
  position: absolute;
  right: 1%;
  top: 50%;
  margin: auto;
  transform: translate(-50%);
`;
