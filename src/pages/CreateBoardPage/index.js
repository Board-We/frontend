import { useRecoilState } from "recoil";
import styled from "styled-components";
import CreateBoardStep1 from "./Steps/CreateBoardStep1";
import StepHeader from "../../components/layout/headers/stepHeader";
import { createBoardStepId } from "../../store";
import FooterButton from "../../components/buttons/FooterButton";
import CreateBoardStep2 from "./Steps/CreateBoardStep2";
import CreateBoardStep3 from "./Steps/CreateBoardStep3";
// import CreateBoardStep3 from "./Steps/CreateBoardStep3";

const controlCreatBoardStep = (stepId = 0) => {
  switch (stepId) {
    case 0:
      return <CreateBoardStep1 />;
    case 1:
      return <CreateBoardStep2 />;
    // case 2:
    //   return <CreateBoardStep3 />;
    case 3:
      return <CreateBoardStep3 />;
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

  const handleClickBefore = () => {
    console.log("hi");
    setCurrentStepId((prev) => prev - 1);
  };

  return (
    <PageWrapper>
      <CreateBoardContainer>
        <StepHeader title="보드 제작하기" onClick={handleClickBefore} />
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
`;

const CreateBoardBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
`;

const PageFooter = styled.div`
  width: 100%;
`;
