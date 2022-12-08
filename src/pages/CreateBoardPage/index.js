import { useRecoilState } from "recoil";
import styled from "styled-components";
import CreateBoardStep1 from "./Steps/CreateBoardStep1";
import StepHeader from "../../components/layout/headers/stepHeader";
import { createBoardStepId } from "../../store";
import FooterButton from "../../components/buttons/FooterButton";
import CreateBoardStep3 from "./Steps/CreateBoardStep3";

import { useState } from "react";
import CreateBoardStep2 from "./Steps/CreateBoardStep2";
import CreateBoardStep5 from "./Steps/CreateBoardStep5";
import CompleteCreate from "./Steps/CompleteCreate";
import CreateBoardStep4 from "./Steps/CreateBoardStep4";

const controlCreatBoardStep = (stepId, setDisabledFooterButton) => {
  switch (stepId) {
    case 1: {
      return (
        <CreateBoardStep1
          stepId={stepId}
          setDisabledFooterButton={setDisabledFooterButton}
        />
      );
    }
    case 2:
      return (
        <CreateBoardStep2
          stepId={stepId}
          setDisabledFooterButton={setDisabledFooterButton}
        />
      );
    case 3:
      return <CreateBoardStep3 />;
    case 4:
      return <CreateBoardStep4 />;
    case 5:
      return (
        <CreateBoardStep5 setDisabledFooterButton={setDisabledFooterButton} />
      );
    case 6:
      return <CompleteCreate />;
    default:
      break;
  }
  return <CreateBoardPage />;
};

const CreateBoardPage = () => {
  const finalStepId = 6;
  const [currentStepId, setCurrentStepId] = useRecoilState(createBoardStepId);
  const [disabledFooterButton, setDisabledFooterButton] = useState(true);

  const handleClickNext = () => {
    setCurrentStepId((prev) => prev + 1);
  };

  const handleClickBefore = () => {
    setCurrentStepId((prev) => prev - 1);
  };

  const handleClickGoToBoard = () => {
    // To Do: 생성된 보드 링크로 이동
  };

  return (
    <PageWrapper>
      <CreateBoardContainer>
        <StepHeader
          title="새 보드 만들기"
          onClick={handleClickBefore}
          isFinalStep={currentStepId === finalStepId}
        />
        {currentStepId < 6 && (
          <ProgressBarContainer>
            <ProgressBar width={currentStepId} />
          </ProgressBarContainer>
        )}

        <CreateBoardBody>
          {controlCreatBoardStep(currentStepId, setDisabledFooterButton)}
        </CreateBoardBody>
        <PageFooter>
          <FooterButton
            color="black"
            fontColor="white"
            text={currentStepId === finalStepId ? "내 보드로 이동하기" : "다음"}
            disabled={disabledFooterButton}
            onClick={
              currentStepId === finalStepId
                ? handleClickGoToBoard
                : handleClickNext
            }
          />
        </PageFooter>
      </CreateBoardContainer>
    </PageWrapper>
  );
};

export default CreateBoardPage;

const PageWrapper = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const CreateBoardContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 0.4vh;
  background-color: #d9d9d9;
`;

const ProgressBar = styled.div`
  margin-right: auto;
  width: ${(props) => props.width * 15}%;
  background-color: black;
  height: inherit;
`;

const CreateBoardBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  padding: 3rem 2rem;
`;

const PageFooter = styled.div`
  position: absolute;
  bottom: 0;
`;
