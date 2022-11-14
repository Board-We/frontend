import { useRecoilState } from "recoil";
import styled from "styled-components";
import CreateBoardStep1 from "./CreateBoardStep1";
import StepHeader from "../../components/layout/headers/stepHeader";
import { createBoardStepId } from "../../store";
import FooterButton from "../../components/buttons/FooterButton";

const controlCreatBoardStep = (stepId = 0) => {
  switch (stepId) {
    case 0:
      return <CreateBoardStep1 />;
    default:
      break;
  }
  return <CreateBoardPage />;
};

const CreateBoardPage = () => {
  const [currentStepId, setCurrentStepId] = useRecoilState(createBoardStepId);
  const handleClickNext = () => {
    setCurrentStepId((prev) => prev + 1);
  };
  return (
    <PageWrapper>
      <CreateBoardContainer>
        <StepHeader title="보드 제작하기" />
        <CreateBoardBody>
          {controlCreatBoardStep(currentStepId)}
        </CreateBoardBody>
        <PageFooter>
          <FooterButton
            color="black"
            fontColor="white"
            text="다음"
            onClick={handleClickNext}
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
  justify-content: space-between;
`;

const CreateBoardBody = styled.div`
  width: 100%;
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
`;

const PageFooter = styled.div`
  width: 100%;
`;
