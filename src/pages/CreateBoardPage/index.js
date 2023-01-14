import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import styled from "styled-components";
import CreateBoardStep1 from "./Steps/CreateBoardStep1";
import StepHeader from "../../components/layout/headers/stepHeader";
import { boardState, createBoardStepId, deviceScreenState } from "../../store";
import ServiceNameHeader from "../../components/layout/headers/serviceNameHeader";
import FooterButton from "../../components/buttons/FooterButton";
import CreateBoardStep3 from "./Steps/CreateBoardStep3";
import { useState } from "react";
import CreateBoardStep2 from "./Steps/CreateBoardStep2";
import CreateBoardStep5 from "./Steps/CreateBoardStep5";
import CompleteCreate from "./Steps/CompleteCreate";
import CreateBoardStep4 from "./Steps/CreateBoardStep4";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useEffect } from "react";
import Title from "../../components/label/title";

const CreateBoardPage = () => {
  const finalStepId = 6;
  const board = useRecoilValue(boardState)
  const resetBoard = useResetRecoilState(boardState)
  const [currentStepId, setCurrentStepId] = useRecoilState(createBoardStepId);
  const [disabledFooterButton, setDisabledFooterButton] = useState(true);
  const stepDescription = [
    "보드의 제목은 무엇인가요?",
    "간단한 설명을 적어주세요.",
    "보드를 마음껏 꾸며보세요!",
    "기간을 설정해 주세요.",
    "비밀번호를 설정해주세요.",
  ];
  const $stepDescription = useRef();
  const $footer = useRef();
  const [heightOfContentArea, setHeightOfContentArea] = useState(0);
  const deviceScreenSize = useRecoilValue(deviceScreenState);
  const navigate = useNavigate();

  useEffect(() => {
    resetBoard();
  }, [])

  useEffect(() => {
    if (
      !$footer.current ||
      !$stepDescription.current ||
      deviceScreenSize.y === 0
    )
      return;
    const bottomOfDescription =
      $stepDescription.current.clientHeight +
      Number(deviceScreenSize.rem.replace("px", "")) * 0.8125;
    const heightOfFooter = $footer.current.clientHeight;
    setHeightOfContentArea(
      deviceScreenSize.y - heightOfFooter - bottomOfDescription
    );
  }, [$stepDescription.current, $footer.current, deviceScreenSize]);

  const handleClickNext = () => {
    setCurrentStepId((prev) => prev + 1);
  };

  const handleClickBefore = () => {
    if (currentStepId === 1) {
      navigate(-1);
      return;
    }
    setCurrentStepId((prev) => prev - 1);
  };

  const controlCreatBoardStep = (
    stepId,
    setDisabledFooterButton,
    footerRef
  ) => {
    switch (stepId) {
      case 1: {
        return (
          <CreateBoardStep1 setDisabledFooterButton={setDisabledFooterButton} />
        );
      }
      case 2:
        return (
          <CreateBoardStep2 setDisabledFooterButton={setDisabledFooterButton} />
        );
      case 3:
        return <CreateBoardStep3 footerRef={footerRef} />;
      case 4:
        return <CreateBoardStep4 footerRef={footerRef} />;
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

  return (
    <PageWrapper>
      {currentStepId !== finalStepId ? (
        <StepHeader
          title="새 보드 만들기"
          onClick={handleClickBefore}
          isFinalStep={currentStepId === finalStepId}
          stepId={currentStepId}
        />
      ) : (
        <ServiceNameHeader />
      )}
      {currentStepId < 6 && (
        <ProgressBarContainer>
          <ProgressBar width={currentStepId} />
        </ProgressBarContainer>
      )}
      {currentStepId < 6 && (
        <StepDescriptionContainer ref={$stepDescription}>
          <p>{currentStepId}/5단계</p>
          <Title>
            {stepDescription[currentStepId - 1]}
            {currentStepId === 5 ? <span>(선택)</span> : null}
          </Title>
        </StepDescriptionContainer>
      )}
      <BoardInfoConatiner height={heightOfContentArea}>
        {controlCreatBoardStep(currentStepId, setDisabledFooterButton, $footer)}
      </BoardInfoConatiner>
      {currentStepId < 6 && (
        <PageFooter>
          <FooterButton
            ref={$footer}
            color="black"
            fontColor="white"
            text="다음"
            disabled={disabledFooterButton}
            onClick={handleClickNext}
          />
        </PageFooter>
      )}
    </PageWrapper>
  );
};

export default CreateBoardPage;

const PageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ProgressBarContainer = styled.div`
  width: 100%;
  height: 0.2rem;
  background-color: ${(props) => props.theme.colors.grey_40};
`;

const ProgressBar = styled.div`
  width: ${(props) => props.width * 15}%;
  background: linear-gradient(90deg, #fdc62e 17.69%, #ff7e36 98.49%);
  height: inherit;
`;

const StepDescriptionContainer = styled.div`
  height: fit-content;
  padding: 2rem 1.25rem 0.8125rem 1.25rem;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const BoardInfoConatiner = styled.div`
  width: 100%;
  height: ${(props) => props.height}px;
  overflow: hidden;
`;

const PageFooter = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: baseline;
  background: white;
`;
