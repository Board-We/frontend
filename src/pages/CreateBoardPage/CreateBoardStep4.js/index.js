import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SlideModal from "../../../components/modals/slideModal.js";
import { ReactComponent as Vector } from "../../../assets/Vector.svg";
import ModalContents from "./ModalContents/index.js";
import { useRecoilState } from "recoil";
import { boardState, setDateStepId } from "../../../store/index.js";
// import { setCurrentDay } from "../../../utils/setCurrentDay.js";

function CreateBoardStep4({ setDisabledFooterButton }) {
  const [modalOpen, setModalOpen] = useState(true);

  const [board, setBoard] = useRecoilState(boardState);
  const [step, setStep] = useRecoilState(setDateStepId);

  const handleAttachableTerm = () => {
    setModalOpen(true);
    setStep(1);
  };

  const handleOpenTerm = () => {
    setModalOpen(true);
    setStep(3);
  };
  // console.log(setCurrentDay());
  return (
    <>
      <CreateBoardStepContainer>
        <CreateBoardStepCounter>3/4단계</CreateBoardStepCounter>
        <CreateBoardDescriptionText>
          <p>롤링페이퍼 받는 기간</p>
          <span>친구들이 롤링페이퍼를 작성할 수 있어요.</span>
        </CreateBoardDescriptionText>

        <SetTimeWrapper onClick={handleAttachableTerm}>
          <SetTimeContainer>
            <p>{board.attachableTerm.start}부터</p>
            <p>~ {board.attachableTerm.end} 까지</p>
          </SetTimeContainer>
          <ArrowBtn>
            <Vector />
          </ArrowBtn>
        </SetTimeWrapper>

        <CreateBoardDescriptionText>
          <p>롤링페이퍼 확인 기간</p>
          <span>친구들이 롤링페이퍼를 확인할 수 있어요.</span>
        </CreateBoardDescriptionText>

        <SetTimeWrapper onClick={handleOpenTerm}>
          <SetTimeContainer>
            <p>{board.openTerm.start}부터</p>
            <p>~ {board.openTerm.end} 까지</p>
          </SetTimeContainer>
          <ArrowBtn>
            <Vector />
          </ArrowBtn>
        </SetTimeWrapper>
      </CreateBoardStepContainer>
      {modalOpen && (
        <SlideModal
          height="65vh"
          children={<ModalContents setModalOpen={setModalOpen} />}
          open={modalOpen}
        />
      )}
    </>
  );
}

export default CreateBoardStep4;

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
  flex-direction: column;
  margin-bottom: 1.5rem;
  p {
    text-align: left;
    font-weight: 600;
    font-size: 1.5rem;
    margin: 0;
    margin-bottom: 0.8rem;
  }
  span {
    text-align: left;
    font-size: 1.3rem;
    color: #b1b1b1;
  }
`;

const SetTimeWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #d9d9d9;
  margin-bottom: 8vh;
  padding: 0 0.8rem 0 0;
  cursor: pointer;
  p {
    text-align: left;
    font-size: 1.3rem;
  }
`;

const SetTimeContainer = styled.div``;

const ArrowBtn = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`;
