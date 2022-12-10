import React, { useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { boardState } from "../../../../store";
import SelectModal from "./components/SelectModal";
import SelectMenu from "./SelectMenu";
import SelectBackground from "./SelectMenu/SelectBackground";
import SelectMemo from "./SelectMenu/SelectMemo";
import SelectTheme from "./SelectMenu/SelectTheme";

function CreateBoardStep3() {
  const [selectState, setSelectState] = useState("");
  const btnValue = ["배경", "메모지"];
  const [boardURL, setBoardURL] = useState("");
  const [board, setBoard] = useRecoilState(boardState);
  const [modalOpen, setModalOpen] = useState(true);
  const selectCtrl = (e) => {
    setSelectState(e.target.value);
  };

  const renderingPicker = () => {
    switch (selectState) {
      case "0":
        return (
          <SelectModal
            height={"38vh"}
            open={modalOpen}
            children={<SelectMenu />}
          />
        );
      case "1":
        return <SelectModal height={"70vh"} />;
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

const BoardCanvas = styled.div`
  width: 100%;
  height: 55vh;
  background-color: #d9d9d9;
  border-radius: 4px;
`;

const SelectButtonArea = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1.2rem;
`;

const SelectButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 9.5rem;
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
  console.log(board.background);
  return (
    <BoardContainer url={board.background} color={board.background}>
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
        <Memo>
          <span>우리 내년에도 친하게 지내자</span>
        </Memo>
        <Memo>
          <span>마라탕 모임 언제 가나요^^</span>
        </Memo>
        <Memo>
          <span>크리스마스 파티해서 맛있는거 먹자~~! 파티룸 찾아둘께</span>
        </Memo>
        <Memo>
          <span>선물 뭐 갖고싶어? 다 말해 사줄께ㅎㅎ -민지-</span>
        </Memo>
        <Memo>
          <span>크리스마스 파티해서 맛있는거 먹자~~! 파티룸 찾아둘께</span>
        </Memo>
        <Memo>
          <span>선물 뭐 갖고싶어? 다 말해 사줄께ㅎㅎ -민지-</span>
        </Memo>
      </MemoContainer>
    </BoardContainer>
  );
};

const BoardContainer = styled.div.attrs((props) => {
  return {
    style: {
      background: props.color ? props.color : `url(${props.url})`,
    },
  };
})`
  width: 95%;
  height: 60vh;
  border-radius: 4px;
  background-position: center;
  background-size: cover;
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

const Memo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45%;
  height: 14.5vh;
  background-color: white;
  margin-bottom: 1.5rem;
  border-radius: 4px;

  span {
    padding: 0.5rem;
  }
`;
