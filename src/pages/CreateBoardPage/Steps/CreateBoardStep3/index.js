import React, { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { boardState } from "../../../../store";
import SelectModal from "./components/SelectModal";
import SelectBackground from "./SelectBackground";
import SelectMemo from "./SelectMemo";

function CreateBoardStep3() {
  const [selectState, setSelectState] = useState("");
  const btnValue = ["배경", "메모지"];
  const [modalOpen, setModalOpen] = useState(true);

  const selectCtrl = (e) => {
    setSelectState(e.target.value);
  };

  const handleClose = () => {
    setModalOpen(false);
    setSelectState("");
  };

  const renderingPicker = () => {
    switch (selectState) {
      case "0":
        return (
          <SelectModal
            height={"38vh"}
            open={modalOpen}
            onClose={handleClose}
            isBackground={true}
            children={<SelectBackground />}
          />
        );
      case "1":
        return (
          <SelectModal
            height={"50vh"}
            open={modalOpen}
            onClose={handleClose}
            isBackground={false}
            children={<SelectMemo />}
          />
        );

      default:
        break;
    }
  };

  return (
    <>
      <BoardArea>
        <p>2/4단계</p>
        <h1>보드를 마음껏 꾸며보세요!</h1>
        <BoardAreaBody>
          <BoardPreview />
        </BoardAreaBody>
      </BoardArea>
      <SelectButtonArea>
        {btnValue.map((value, idx) => {
          return (
            <React.Fragment key={idx}>
              <SelectButton
                value={idx}
                className={"btn" + (idx == selectState ? " active" : "")}
                onClick={selectCtrl}
              >
                {value}
              </SelectButton>
            </React.Fragment>
          );
        })}
      </SelectButtonArea>
      {renderingPicker()}
    </>
  );
}

export default CreateBoardStep3;

const BoardArea = styled.div`
  display: flex;
  flex-direction: column;
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

const BoardAreaBody = styled.div`
  display: flex;
  justify-content: center;
`;

const SelectButtonArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.2rem;
  gap: 1rem;
`;

const SelectButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  height: 5vh;
  border: none;
  font-size: 0.9rem;
  background-color: #eeeeee;
  border-radius: 8px;
  user-select: none;
  cursor: pointer;
  &.active {
    color: white;
    background-color: #626262;
  }
`;

const BoardPreview = () => {
  const [board, setBoard] = useRecoilState(boardState);

  return (
    <BoardContainer background={board.background}>
      <DescriptionContainer>
        <p>{board.name}</p>
        <TagContainer>
          {board.tags?.map((item) => {
            return (
              <React.Fragment key={item}>
                <span>{`#${item}`}</span>
              </React.Fragment>
            );
          })}
        </TagContainer>
      </DescriptionContainer>
      <MemoContainer>
        <Memo1
          memoBackground={board.memoBackground[0] ? board.memoBackground[0] : "white"}
          fontColor={board.memoColors[0]}
        >
          <span>우리 내년에도 친하게 지내자</span>
        </Memo1>
        <Memo2
          memoBackground={board.memoBackground[1] ? board.memoBackground[1] : "white"}
          fontColor={board.memoColors[2]}
        >
          <span>마라탕 모임 언제 가나요^^</span>
        </Memo2>
        <Memo3
          memoBackground={board.memoBackground[2] ? board.memoBackground[2] : "white"}
          fontColor={board.memoColors[3]}
        >
          <span>크리스마스 파티해서 맛있는거 먹자~~! 파티룸 찾아둘께</span>
        </Memo3>
        <Memo4
          memoBackground={board.memoBackground[3] ? board.memoBackground[3] : "white"}
          fontColor={board.memoColors[4]}
        >
          <span>선물 뭐 갖고싶어? 다 말해 사줄께ㅎㅎ -민지-</span>
        </Memo4>
        <Memo5
          memoBackground={board.memoBackground[4] ? board.memoBackground[4] : "white"}
          fontColor={board.memoColors[4]}
        >
          <span>크리스마스 파티해서 맛있는거 먹자~~! 파티룸 찾아둘께</span>
        </Memo5>
        <Memo6
          memoBackground={board.memoBackground[5] ? board.memoBackground[5] : "white"}
          fontColor={board.memoColors[5]}
        >
          <span>선물 뭐 갖고싶어? 다 말해 사줄께ㅎㅎ -민지-</span>
        </Memo6>
      </MemoContainer>
    </BoardContainer>
  );
};

const BoardContainer = styled.div`
  width: 95%;
  height: 60vh;
  border-radius: 4px;
  background: ${(props) =>
    props.background.includes("http")
      ? `url(${props.background})`
      : props.background};
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  padding: 1rem;
`;

const DescriptionContainer = styled.div`
  display: flex;
  flex-direction: column;
  p {
    color: black;
  }
`;

const TagContainer = styled.div`
  display: flex;
  span {
    margin-right: 1rem;
    text-align: left;
  }
`;

const MemoContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 1.5rem;
`;

const Memo1 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45%;
  height: 14.5vh;
  background-color: white;
  margin-bottom: 1.5rem;
  border-radius: 4px;
  background: ${(props) =>
    props.memoBackground.includes("http")
      ? `url(${props.memoBackground})`
      : props.memoBackground};
  background-position: center;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  color: ${(props) => (props.fontColor ? props.fontColor : "black")};

  span {
    padding: 0.5rem;
  }
`;

const Memo2 = styled(Memo1)``;

const Memo3 = styled(Memo1)``;

const Memo4 = styled(Memo1)``;

const Memo5 = styled(Memo1)``;

const Memo6 = styled(Memo1)``;
