import { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import TextInput from "../../../components/TextInput";
import { boardState } from "../../../store";

const CreateBoardStep1 = () => {
  const [board, setBoard] = useRecoilState(boardState);
  const [boardNameLength, setBoardNameLength] = useState(0);
  const [boardDescriptionLength, setBoardDescriptionLength] = useState(0);

  const handleChangeBoardName = (e) => {
    setBoardNameLength(e.target.value.length);
    const currentBoardState = { ...board, name: e.target.value };
    setBoard(currentBoardState);
  };

  const handleChangeBoardDescription = (e) => {
    setBoardDescriptionLength(e.target.value.length);
    const currentBoardState = { ...board, description: e.target.value };
    setBoard(currentBoardState);
  };

  return (
    <>
      <CreateBoardStep>
        <CreateBoardDescriptionText>
          <p>
            * 보드의 이름을 <br /> 작성해주세요.
          </p>
        </CreateBoardDescriptionText>
        <TextInput
          commonSize={true}
          placeholder="어떤 주제의 보드인가요?"
          type="text"
          onChange={handleChangeBoardName}
          disabled={boardNameLength === 50}
        />
        <CreateBoardGuide>
          <CreateBoardExample>
            <p>eg. 김땡땡 생일 축하해~!</p>
          </CreateBoardExample>
          <TextCounter>{boardNameLength}/50</TextCounter>
        </CreateBoardGuide>
      </CreateBoardStep>
      <CreateBoardStep>
        <CreateBoardDescriptionText>
          <p>
            보드에 대한
            <br />
            설명이 필요하시다면
            <br />
            작성해주세요.
          </p>
        </CreateBoardDescriptionText>
        <TextInput
          commonSize={true}
          placeholder="간단하게 추가 설명을 작성해주세요."
          type="text"
          onChange={handleChangeBoardDescription}
          disabled={boardDescriptionLength === 50}
        />
        <CreateBoardGuide>
          <CreateBoardExample>
            <p>eg. 이 보드는 3일동안만 사용할 수 있어요~!</p>
          </CreateBoardExample>
          <TextCounter>{boardDescriptionLength}/50</TextCounter>
        </CreateBoardGuide>
      </CreateBoardStep>
      <CreateBoardStep>
        <CreateBoardDescriptionText>
          <p>
            보드에 대한 <br /> 태그를 붙여주세요.
          </p>
        </CreateBoardDescriptionText>
        <TextInput commonSize={true} placeholder="#" type="text" />
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

const CreateBoardDescriptionText = styled.div`
  width: 100%;
  display: flex;
  p {
    text-align: left;
    font-weight: 600;
  }
`;

const CreateBoardGuide = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.5rem;
`;

const CreateBoardExample = styled.div`
  color: gray;
  p {
    font-size: 0.8rem;
  }
`;

const TextCounter = styled.div`
  color: gray;
  p {
    font-size: 0.8rem;
  }
`;
