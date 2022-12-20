import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import CreateBoardStep1 from "./Steps/CreateBoardStep1";
import StepHeader from "../../components/layout/headers/stepHeader";
import { boardState, createBoardStepId, deviceScreenState } from "../../store";
import ServiceNameHeader from "../../components/layout/headers/serviceNameHeader";
import FooterButton from "../../components/buttons/FooterButton";
import CreateBoardStep3 from "./Steps/CreateBoardStep3New";
import { useState } from "react";
import CreateBoardStep2 from "./Steps/CreateBoardStep2";
import CreateBoardStep5 from "./Steps/CreateBoardStep5";
import CompleteCreate from "./Steps/ComleteCreate";
import CreateBoardStep4 from "./Steps/CreateBoardStep4";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useEffect } from "react";
import { theme } from "../../styles/theme";

const CreateBoardPage = () => {
  const finalStepId = 6;
  const setBoard = useSetRecoilState(boardState)
  const [currentStepId, setCurrentStepId] = useRecoilState(createBoardStepId);
  const [disabledFooterButton, setDisabledFooterButton] = useState(true);
  const stepDescription = [
    "보드의 제목은 무엇인가요?",
    "간단한 설명을 적어주세요.",
    "보드를 마음껏 꾸며보세요!",
    "기간을 설정해 주세요.",
    "비밀번호를 설정할 수 있어요.",
  ];
  const $stepDescription = useRef();
  const $footer = useRef();
  const [maxHeightOfContentsArea, setMaxHeightOfContentsArea] = useState(0);
  const deviceScreenSize = useRecoilValue(deviceScreenState);
  const navigate = useNavigate();

  useEffect(() => {
    const deviceHeight = document.body.offsetHeight;
    const bottomOfDescription =
      $stepDescription.current.offsetHeight +
      $stepDescription.current.offsetTop +
      Number(deviceScreenSize.rem.replace("px", "")) * 2;
    const heightOfFooter = $footer.current.offsetHeight;

    setMaxHeightOfContentsArea(
      deviceHeight - bottomOfDescription - heightOfFooter
    );
    initBoard()
  }, []);


  const initBoard = () => {
    const initialBoardForm = {
      name: "",
      description: "",
      tags: [],
      writingStartTime: new Date(),
      writingEndTime: new Date(new Date().getTime() + 1209600),
      openStartTime: new Date(new Date().getTime() + 1209600),
      openEndTime: new Date(new Date().getTime() + 2419200),
      password: undefined,
      privateMode: false,
      background: "#FFFFFF",
      font: "san-serif",
      memos: [],
      memoThemes: [
        {
          memoBackground: theme.colors.grey_50,
          memoTextColor: "#000000",
        }
      ],
    }

    setBoard(initialBoardForm)
  }

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

  const controlCreatBoardStep = (stepId, setDisabledFooterButton) => {
    switch (stepId) {
      case 1: {
        return (
          <CreateBoardStep1
            setDisabledFooterButton={setDisabledFooterButton}
          />
        );
      }
      case 2:
        return (
          <CreateBoardStep2
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

  return (
    <PageWrapper>
      <CreateBoardContainer>
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
        <CreateBoardBody>
          {currentStepId < 6 && <p>{currentStepId}/5단계</p>}
          <h1 ref={$stepDescription}>{stepDescription[currentStepId - 1]}</h1>
          <BoardInfoConatiner maxHeight={maxHeightOfContentsArea}>
            {controlCreatBoardStep(currentStepId, setDisabledFooterButton)}
          </BoardInfoConatiner>
        </CreateBoardBody>
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
      </CreateBoardContainer>
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
  justify-content: center;
  align-items: flex-start;
`;

const CreateBoardContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    text-align: left;
    color: #bcbcbc;
    margin: 0;
    font-size: 1.2rem;
  }

  h1 {
    font-size: 1.5rem;
    text-align: left;
    margin-bottom: 1.2rem;
  }
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

const CreateBoardBody = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 1rem;
  padding: 1rem 1.5rem;
`;

const BoardInfoConatiner = styled.div`
  width: 100%;
  height: ${(props) => props.maxHeight}px;
  padding: 0.25rem;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const PageFooter = styled.div`
  flex-grow: 1;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: baseline;
`;
