import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import TextLengthValidator from "../../../components/textLengthValidator";
import { boardState } from "../../../store";
import { ReactComponent as Delete } from "../../../assets/icons/delete.svg";
import { ReactComponent as AlertExclamation } from "../../../assets/icons/alertExclamation.svg";
import { keyboard } from "@testing-library/user-event/dist/keyboard";

const maxLength = 50;

const CreateBoardStep2 = ({ setDisabledFooterButton }) => {
  const [board, setBoard] = useRecoilState(boardState);
  const [boardDescription, setBoardDescription] = useState("");
  const [editable, setEditable] = useState(true);
  const [isValidLength, setIsValidLength] = useState(true);

  const handleChangeBoardDescription = (e) => {
    if (e.currentTarget.textContent.length <= maxLength) {
      setBoardDescription(e.currentTarget.textContent);
      const currentBoardState = { ...board, description: e.target.innerText };
      setBoard(currentBoardState);
    }
  };

  console.log(boardDescription);

  const handleClickDeleteText = () => {
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

  return (
    <CreateBoardStepContainer>
      <MultilineTextInput
        contentEditable={editable}
        suppressContentEditableWarning={true}
        textContent={boardDescription}
        isValidLength={isValidLength}
        placeholder="ex. 이 보드에 3일동안 메모를 남겨줘!"
        onInput={handleChangeBoardDescription}
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

const MultilineTextInput = styled.div`
  width: 100%;
  margin-top: 1rem;
  text-align: start;
  padding-bottom: 0.5rem;
  border-bottom: ${(props) =>
    props.isValidLength
      ? `0.1rem solid ${props.theme.colors.primary}`
      : `0.1rem solid ${props.theme.colors.error}`};

  &:focus {
    outline: none;
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
