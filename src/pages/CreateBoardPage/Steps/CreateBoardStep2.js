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
  const [boardDescription, setBoardDescription] = useState("");

  const [heightInput, setHeightInput] = useState(30); // 임시값, 수정 필요

  const [isValidLength, setIsValidLength] = useState(true);

  const handleChangeTextInput = (e) => {
    prevBoardDescription.current = board.description;
    setBoard({ ...board, description: e.target.value });
    setHeightInput(e.target.scrollHeight);
  };

  const handleClickDeleteText = (e) => {
    setBoardDescription("");
  };

  useEffect(() => {
    board.description.length >= 1 && board.description.length < maxLength + 1
      ? setDisabledFooterButton(false)
      : setDisabledFooterButton(true);
  }, [boardDescription, setDisabledFooterButton, board.description.length]);

  useEffect(() => {
    if (board.description.length > maxLength) setIsValidLength(false);
    else setIsValidLength(true);
  }, [board.description, setIsValidLength]);

  useEffect(() => {
    if (board.description.length > maxLength + 1) {
      setBoard({ ...board, description: prevBoardDescription.current });
      return;
    }
  }, [board.description, board, setBoard]);

  return (
    <CreateBoardStepContainer>
      <TextInputSection>
        <MultilineTextInput
          value={board.description}
          onChange={handleChangeTextInput}
          height={heightInput}
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
          text={board.description}
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
  position: relative;
  width: 100%;
`;

const MultilineTextInput = styled.textarea`
  width: 100%;
  height: ${(props) => props.height}px;
  font-size: 1.2rem;
  margin-top: 1rem;
  text-align: start;
  padding-bottom: 0.5rem;
  border: 0;
  overflow: hidden;
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
  bottom: 10%;
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
  bottom: 10%;
  margin: auto;
  transform: translate(-50%);
`;
