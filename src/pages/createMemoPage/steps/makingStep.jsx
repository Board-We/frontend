import React, { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { requestCreateMemo } from "../../../api/memoApi";
import FooterButton from "../../../components/buttons/FooterButton";
import SmallTitle from "../../../components/label/smallTitle";
import StepHeader from "../../../components/layout/headers/stepHeader";
import Memo from "../../../components/memo";
import AlertModal from "../../../components/modals/alertModal";
import { boardState, memoStyleState } from "../../../store";
import { theme } from "../../../styles/theme";

const MakingStep = () => {
  const board = useRecoilValue(boardState);
  const [memo, setMemo] = useRecoilState(memoStyleState);
  const [alertOpen, setAlertOpen] = useState(false);
  const navigate = useNavigate();

  const memoBackgroundOptions = {
    image: [],
    color: [
      { background: "white", textColor: "black" },
      { background: "red", textColor: "white" },
      { background: "green", textColor: "white" },
      { background: "blue", textColor: "white" },
      { background: "orange", textColor: "white" },
      { background: "yellow", textColor: "black" },
    ],
  };

  useEffect(() => {
    const initMemoStyle = memoBackgroundOptions.image[0]
      ? memoBackgroundOptions.image[0]
      : memoBackgroundOptions.color[0];
    setMemo({ ...memo, style: initMemoStyle });
  }, [board]);

  const onChangeText = (text) => {
    const newText = text;
    setMemo({ ...memo, text: newText });
  };

  const onClickBack = () => {
    setAlertOpen(true);
  };

  const goBack = () => {
    navigate(-1);
  };

  const cancelBack = () => {
    setAlertOpen(false);
  };

  const onClickMakeMemo = async () => {
    const created = await requestCreateMemo({
      boardCode: 14,
      memoContent: memo.text,
      memoThemeId: 12,
    }); // boardCode와 memoThemeId는 임시로 넣어놓음

    // if (created) navigate("/memo/end");
    navigate("/memo/end");
  };

  const onClickMemoPaper = (option) => {
    setMemo({ ...memo, style: option });
  };

  const alertOption = {
    buttonTextArray: ["중단하기", "편집으로 돌아가기"],
    onClickArray: [goBack, cancelBack],
  };

  return (
    <PageWrapper>
      {alertOpen ? (
        <AlertModal
          open={alertOpen}
          buttonTextArray={alertOption.buttonTextArray}
          onClickArray={alertOption.onClickArray}
          text={"편집을 중단할까요?"}
        />
      ) : null}
      <StepHeader title={"롤링페이퍼 남기기"} onClick={onClickBack} />
      <BoardArea background={board.boardBackground}>
        <Memo
          size={"75%"}
          background={memo.style.background}
          color={memo.style.textColor}
          text={memo.text}
          onChangeText={onChangeText}
        >
          <MemoTextIndicator>{memo.text.length}/100</MemoTextIndicator>
        </Memo>
      </BoardArea>
      <OptionArea>
        <OptionAreaTitleContainer>
          <SmallTitle text={"메모지를 선택해 롤링페이퍼를 남겨보세요."} />
        </OptionAreaTitleContainer>
        <OptionContainer>
          {memoBackgroundOptions.image.map((el) => {
            return (
              <Option key={el} onClick={() => onClickMemoPaper(el)}>
                {el}
              </Option>
            );
          })}
          {memoBackgroundOptions.color.map((el) => {
            return (
              <Option
                key={JSON.stringify(el)}
                onClick={() => onClickMemoPaper(el)}
              >
                <Memo
                  background={el.background}
                  text={"Aa"}
                  color={el.textColor}
                  isSelected={JSON.stringify(el) === JSON.stringify(memo.style)}
                />
              </Option>
            );
          })}
        </OptionContainer>
      </OptionArea>
      <FooterButtonArea>
        <FooterButton
          text={"완료"}
          disabled={memo.text.length === 0}
          color={"#3A3A3A"}
          textColor={"#FFFFFF"}
          onClick={onClickMakeMemo}
          filled={true}
        />
      </FooterButtonArea>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
`;

const BoardArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vw;
  max-width: 600px;
  max-height: 600px;
  background: ${(props) =>
    props.background.includes("http")
      ? `url(${props.background})`
      : props.background};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const MemoPlaceHolder = styled.div`
  width: 100%;
  opacity: 0.4;
  color: #000000;
  font-size: 1.25rem;
  font-weight: 400;
  line-height: 1.875rem;
`;

const MemoTextIndicator = styled.pre`
  position: absolute;
  bottom: 1rem;
  right: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${theme.colors.grey_20};
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: 0.25rem;
  margin-top: 0.5rem;
  padding: 0.25rem 0.75rem;
  background: ${theme.dimmed.opacitiy_w};
`;

const OptionArea = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: flex-start;
  padding: 1rem 0 0 0.25rem;
`;

const OptionAreaTitleContainer = styled.div`
  padding-left: 1rem;
`;

const OptionContainer = styled.ul`
  width: 100%;
  list-style: none;
  margin: 0;
  padding: 0 0.5rem;
  margin-top: 0.75rem;
  overflow: scroll;
  flex-grow: 1;
`;

const Option = styled.li`
  float: left;
  margin: 0.5rem;
`;

const FooterButtonArea = styled.div`
  display: inline-flex;
  width: 100%;
  bottom: 0;
  left: 0;
  flex-grow: 1;
`;

export default MakingStep;
