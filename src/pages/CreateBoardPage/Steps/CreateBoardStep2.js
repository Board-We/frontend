import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import TextInput from "../../../components/TextInput";
import TextLengthValidator from "../../../components/textLengthValidator";
import { boardState } from "../../../store";

const CreateBoardStep2 = ({ stepId, setDisabledFooterButton }) => {
  const maxLength = 50;
  const [board, setBoard] = useRecoilState(boardState);
  const [boardDescription, setBoardDescription] = useState("");
  const [isValidLength, setIsValidLength] = useState(true);

  const handleChangeBoardDescription = (e) => {
    setBoardDescription(e.target.value);
    const currentBoardState = { ...board, description: e.target.value };
    setBoard(currentBoardState);
  };

  useEffect(() => {
    boardDescription.length >= 1 && boardDescription.length < maxLength + 1
      ? setDisabledFooterButton(false)
      : setDisabledFooterButton(true);
  }, [boardDescription, setDisabledFooterButton]);

  useEffect(() => {
    if (boardDescription.length > maxLength) setIsValidLength(false);
    else setIsValidLength(true);
  }, [boardDescription, maxLength, setIsValidLength]);

  return (
    <CreateBoardStepContainer>
      <CreateBoardStepCounter>{stepId}/4단계</CreateBoardStepCounter>
      <CreateBoardDescriptionText>
        <p>간단한 설명을 적어주세요</p>
      </CreateBoardDescriptionText>
      <TextInput
        value={boardDescription}
        commonSize={true}
        placeholder="ex. 이 보드에 3일동안 롤링페이퍼를 남겨줘!"
        type="text"
        onChange={handleChangeBoardDescription}
        inputMaxLength={maxLength + 1}
        setTextState={setBoardDescription}
        isValidLength={isValidLength}
      />
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
