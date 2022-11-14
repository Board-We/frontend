import styled from "styled-components";

const CreateBoardStep1 = () => {
  return (
    <>
      <CreateBoardStep>
        <CreateBoardDescriptionText>
          <p>
            * 보드의 이름을 <br /> 작성해주세요.
          </p>
        </CreateBoardDescriptionText>
        <CreateBoardInput placeholder="어떤 주제의 보드인가요?" />
        <CreateBoardGuide>
          <CreateBoardExample>
            <p>eg. 김땡땡 생일 축하해~!</p>
          </CreateBoardExample>
          <TextCounter>0/50</TextCounter>
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
        <CreateBoardInput placeholder="간단하게 추가 설명을 작성해주세요." />
        <CreateBoardGuide>
          <CreateBoardExample>
            <p>eg. 이 보드는 3일동안만 사용할 수 있어요~!</p>
          </CreateBoardExample>
          <TextCounter>0/50</TextCounter>
        </CreateBoardGuide>
      </CreateBoardStep>
      <CreateBoardStep>
        <CreateBoardDescriptionText>
          <p>
            보드에 대한 <br /> 태그를 붙여주세요.
          </p>
        </CreateBoardDescriptionText>
        <CreateBoardInput placeholder="#" />
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

const CreateBoardInput = styled.input`
  width: 100%;
  background-color: #dddddd;
  border: none;
  padding: 1rem;
  border-radius: 0.2rem;
  box-sizing: border-box;
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
