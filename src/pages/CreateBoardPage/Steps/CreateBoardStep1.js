import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import TextInput from "../../../components/TextInput";
import { boardState } from "../../../store";

const CreateBoardStep1 = ({ setDisabledFooterButton }) => {
  const [board, setBoard] = useRecoilState(boardState);
  const [boardName, setBoardName] = useState("");

  const handleChangeBoardName = (e) => {
    if (boardName.length >= 1 && boardName.length < 21)
      setDisabledFooterButton(false);
    else if (boardName.length >= 21) setDisabledFooterButton(true);
    setBoardName(e.target.value);
    const currentBoardState = { ...board, name: e.target.value };
    setBoard(currentBoardState);
  };

  return (
    <>
      <CreateBoardStep>
        <CreateBoardStepCounter>1/4단계</CreateBoardStepCounter>
        <CreateBoardDescriptionText>
          <p>보드의 제목은 무엇인가요?</p>
        </CreateBoardDescriptionText>
        <TextInput
          commonSize={true}
          placeholder="ex. 김땡땡 생일 축하해~!"
          type="text"
          onChange={handleChangeBoardName}
          maxLength={21}
        />
        <CreateBoardGuide>
          <TextCounter isOverLegth={boardName.length === 21}>
            {boardName.length} / 20
          </TextCounter>
        </CreateBoardGuide>
      </CreateBoardStep>
    </>
  );
};

export default CreateBoardStep1;

const CreateBoardStep = styled.div`
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

const TextCounter = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  color: ${(props) => (props.isOverLegth ? "red" : "gray")};
  p {
    font-size: 0.8rem;
  }
`;
