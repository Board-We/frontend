import { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import SlideModal from "../../../components/modals/slideModal";
import TextInput from "../../../components/TextInput";
import TextLengthValidator from "../../../components/textLengthValidator";
import { boardState } from "../../../store";

const CreateBoardStep1 = ({ stepId, setDisabledFooterButton }) => {
  const maxLength = 20;
  const inputRef = useRef();

  const [board, setBoard] = useRecoilState(boardState);
  const [boardName, setBoardName] = useState("");
  const [isValidLength, setIsValidLength] = useState(true);

  const handleChangeBoardName = (e) => {
    setBoardName(e.target.value);
    const currentBoardState = { ...board, name: e.target.value };
    setBoard(currentBoardState);
  };

  useEffect(() => {
    boardName.length >= 1 && boardName.length < maxLength + 1
      ? setDisabledFooterButton(false)
      : setDisabledFooterButton(true);
  }, [boardName, setDisabledFooterButton]);

  useEffect(() => {
    if (boardName.length > maxLength) setIsValidLength(false);
    else setIsValidLength(true);
  }, [boardName, maxLength, setIsValidLength]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <CreateBoardStepContainer>
      <CreateBoardStepCounter>{stepId}/4단계</CreateBoardStepCounter>
      <CreateBoardDescriptionText>
        <p>보드의 제목은 무엇인가요?</p>
      </CreateBoardDescriptionText>
      <TextInput
        value={boardName}
        commonSize={true}
        placeholder="ex. 김땡땡 생일 축하해~!"
        type="text"
        onChange={handleChangeBoardName}
        inputMaxLength={maxLength + 1}
        setTextState={setBoardName}
        isValidLength={isValidLength}
        ref={inputRef}
      />
      <CreateBoardGuide>
        <TextLengthValidator
          maxLength={maxLength}
          text={boardName}
          isValidLength={isValidLength}
        />
      </CreateBoardGuide>
    </CreateBoardStepContainer>
  );
};

export default CreateBoardStep1;

const CreateBoardStepContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
`;

const CreateBoardStepCounter = styled.div`
  color: #bcbcbc;
  margin-bottom: 0.8rem;
  font-size: 1.2rem;
`;

const CreateBoardDescriptionText = styled.div`
  width: 100%;
  display: flex;
  p {
    text-align: left;
    font-weight: 600;
    font-size: 1.5rem;
    margin: 0;
    margin-bottom: 0.8rem;
  }
`;

const CreateBoardGuide = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.5rem;
`;
