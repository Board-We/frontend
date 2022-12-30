import { useState } from "react";
import { useEffect, useRef } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import TapButton from "../../../../components/buttons/tapButton";
import Description from "../../../../components/label/description";
import SmallTitle from "../../../../components/label/smallTitle";
import { boardState, deviceScreenState } from "../../../../store";
import { theme } from "../../../../styles/theme";
import SelectModal from "./comopnents/selectModal";

const CreateBoardStep3 = ({ footerRef }) => {
  const [board, setBoard] = useRecoilState(boardState);
  const [memos, setMemos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState();
  const $desciprion = useRef();
  const $memoArea = useRef();
  const $buttonArea = useRef();
  const $component = useRef();
  const deviceScreenSize = useRecoilValue(deviceScreenState);
  const [heightOfMemoGrid, setHeightOfMemoGrid] = useState(0);

  useEffect(() => {
    // memoGrid의 높이를 정하는 방법
    // 화면 height => 1번
    // sample board 안에 존재하는 description의 bottom y pos => 2번
    // parent에 존재하는 footer의 height => 3번
    // button area의 height => 4번
    // memoGrid의 top margin => 5번
    // heightOfMemoGrid = 1번 - 2번 - 3번 - 4번 - 5번
    const bottomOfDescription =
      $desciprion.current.offsetTop + $desciprion.current.clientHeight;
    const heightOfButtonArea = $buttonArea.current.clientHeight;
    const marginTop = Number(deviceScreenSize.rem.replace("px", "")) * 0.5;
    setHeightOfMemoGrid(
      deviceScreenSize.y -
        bottomOfDescription -
        footerRef.current.clientHeight -
        heightOfButtonArea -
        marginTop +
        2
    );
  }, [
    deviceScreenSize,
    $component.current,
    $desciprion.current,
    footerRef.current,
  ]);

  useEffect(() => {
    setMemos(getMemos());
  }, [board.memoThemes]);

  const getMemos = () => {
    const result = [];
    const sampleText = [
      "우리 내년에도 친하게 지내자",
      "마라탕 모임 언제 가나요^^",
      "크리스마스 파티해서 맛있는거 먹자~~! 파티룸 찾아둘께",
      "선물 뭐 갖고싶어? 다 말해 사줄께ㅎㅎ -민지-",
      "테스트 메모",
      "",
    ];

    board.memoThemes.forEach((el, i) => {
      result.push(
        <SampleMemo
          size={$memoArea.current.clientWidth}
          background={el.memoBackground}
          color={el.memoTextColor}
          key={el + i}
        >
          {sampleText[i]}
        </SampleMemo>
      );
    });

    for (let i = 0; i < 6 - board.memoThemes.length; i++) {
      result.push(
        <SampleMemo
          size={$memoArea.current.clientWidth}
          background={board.memoThemes[0].memoBackground}
          color={board.memoThemes[0].memoTextColor}
          key={`sampleMemo${i}`}
        >
          {sampleText[i + board.memoThemes.length]}
        </SampleMemo>
      );
    }

    return result;
  };

  const onClickSetBackground = () => {
    setModalTitle("배경");
    setIsModalOpen(true);
  };

  const onClickSetMemoTheme = () => {
    setModalTitle("메모지");
    setIsModalOpen(true);
  };

  const onCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <ComponentWrapper ref={$component}>
      <SampleBoard>
        <MemoArea ref={$memoArea} background={board.boardBackground}>
          <SmallTitle>{board.name}</SmallTitle>
          <Description ref={$desciprion}>{board.description}</Description>
          <MemoGrid height={heightOfMemoGrid}>{memos}</MemoGrid>
        </MemoArea>
      </SampleBoard>
      <ButtonArea ref={$buttonArea}>
        <TapButton
          isSelected={true}
          text="배경"
          onClick={onClickSetBackground}
        />
        <TapButton
          isSelected={true}
          text="메모지"
          onClick={onClickSetMemoTheme}
        />
      </ButtonArea>
      {isModalOpen && (
        <SelectModal
          open={isModalOpen}
          onClose={onCloseModal}
          title={modalTitle}
          option={modalTitle}
          board={board}
          setBoard={setBoard}
        />
      )}
    </ComponentWrapper>
  );
};

const ComponentWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
  background-color: ${(props) => props.theme.colors.grey_50};
`;

const SampleBoard = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0 1rem;
`;

const MemoArea = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  background: ${(props) =>
    props.background.includes("base64") ? undefined : props.background};
  background-image: ${(props) =>
    props.background.includes("base64")
      ? `url(${props.background})`
      : undefined};
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 1rem 1rem 0 1rem;
  border: solid ${theme.colors.grey_30};
  border-width: 0 0.1rem 0 0.1rem;
`;

const MemoGrid = styled.div`
  height: ${(props) => props.height}px;
  width: 100%;
  overflow-y: scroll;
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  margin-top: 0.5rem;
  padding-bottom: 0.5rem;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SampleMemo = styled.div`
  width: ${(props) => props.size * 0.4}px;
  height: ${(props) => props.size * 0.4}px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: center;
  justify-self: center;
  background: ${(props) =>
    props.background.includes("base64") ? "white" : props.background};
  background-image: ${(props) =>
    props.background.includes("base64")
      ? `url(${props.background})`
      : undefined};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  color: ${(props) => props.color};
  border: 1px solid ${theme.colors.grey_40};
  border-radius: 0.5rem;
  font-size: ${(props) => props.size * 0.04}px;
`;

const ButtonArea = styled.div`
  display: flex;
  width: 100%;
  max-height: fit-content;
  flex-direction: row;
  gap: 0.5rem;
  align-items: flex-start;
  justify-content: flex-start;
  background: red;
  padding: 0.8rem 1.25rem;
`;

export default CreateBoardStep3;
