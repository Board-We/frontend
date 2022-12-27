import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
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
import CompleteCreate from "./Steps/ComleteCreate";
import CreateBoardStep4 from "./Steps/CreateBoardStep4";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useEffect } from "react";
import { theme } from "../../styles/theme";
import Title from "../../components/label/title";

const CreateBoardPage = () => {
  const finalStepId = 6;
  const setBoard = useSetRecoilState(boardState);
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
  const [paddingBottomOfContentArea, setPaddingBottomOfContentArea] =
    useState(0);
  const deviceScreenSize = useRecoilValue(deviceScreenState);
  const navigate = useNavigate();

  useEffect(() => {
    const heightOfFooter = $footer.current.offsetHeight;
    setPaddingBottomOfContentArea(heightOfFooter);
    initBoard();
  }, [$stepDescription, $footer, deviceScreenSize]);

  const initBoard = () => {
    const initialBoardForm = {
      name: "",
      description: "",
      tags: [],
      writingStartTime: new Date(),
      writingEndTime: new Date(new Date().getTime() + 1209600000),
      openStartTime: new Date(new Date().getTime() + 1209600000),
      openEndTime: new Date(new Date().getTime() + 2419200000),
      password: undefined,
      openType: "", // "PUBLIC" or "PRIVATE"

      boardThemeId: 0,
      boardBackground: theme.colors.defaultBoardBg, // "Base-64" or "#FFFFFF"
      boardFont: "san-serif",
      memos: [],
      memoThemes: [
        {
          memoBackground: theme.colors.defaultMemoBg,
          memoTextColor: theme.colors.black,
        },
      ],
    };

    setBoard(initialBoardForm);
  };

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

  const handleClickGoToBoard = () => {
    // To Do: 생성된 보드 링크로 이동
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

  return (
    <PageWrapper>
      {currentStepId !== finalStepId ? (
        <StepHeader
          title="새 보드 만들기"
          onClick={handleClickBefore}
          isFinalStep={currentStepId === finalStepId}
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
        <StepDescriptionContainer>
          <p>{currentStepId}/5단계</p>
          <Title ref={$stepDescription}>
            {stepDescription[currentStepId - 1]}
            {currentStepId === 5 ? <span>(선택)</span> : null}
          </Title>
        </StepDescriptionContainer>
      )}
      <BoardInfoConatiner paddingBottom={paddingBottomOfContentArea}>
        {controlCreatBoardStep(currentStepId, setDisabledFooterButton, $footer)}
      </BoardInfoConatiner>
      <PageFooter>
        <FooterButton
          ref={$footer}
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
    </PageWrapper >
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
  height: 100%;
  padding-bottom: ${(props) => props.paddingBottomOfContentArea};
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
