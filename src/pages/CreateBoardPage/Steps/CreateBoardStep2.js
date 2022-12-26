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

  const [sizeUnit, setSizeUnit] = useState(0);
  const [heightInput, setHeightInput] = useState(30); // 임시값, 수정 필요

  const [isValidLength, setIsValidLength] = useState(true);

  console.log(boardDescription, prevBoardDescription.current);

  const handleChangeBoardDescription = (text) => {
    const description = text;
    setBoard({ ...board, description });
  };

  const handleChangeTextInput = (e) => {
    prevBoardDescription.current = boardDescription;
    setBoardDescription(e.target.value);
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
    if (boardDescription.length > maxLength) setIsValidLength(false);
    else setIsValidLength(true);
  }, [boardDescription, setIsValidLength]);

  useEffect(() => {
    if (boardDescription.length > maxLength + 1) {
      setBoardDescription(prevBoardDescription.current);
      return;
    } else {
      handleChangeBoardDescription(boardDescription);
    }
  }, [boardDescription]);

  return (
    <CreateBoardStepContainer>
      <MultilineTextInput
        value={boardDescription}
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
      <CreateBoardGuide>
        <TextLengthValidator
          maxLength={maxLength}
          text={boardDescription}
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
  top: 50%;
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
