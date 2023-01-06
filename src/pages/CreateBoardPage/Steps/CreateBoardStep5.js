import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import TextInput from "../../../components/TextInput";
import { ReactComponent as Info } from "../../../assets/info.svg";
import { boardState } from "../../../store";

function CreateBoardStep5({ setDisabledFooterButton }) {
  const [board, setBoard] = useRecoilState(boardState);
  const [password, setPassword] = useState("");
  const [isValidLength, setIsValidLength] = useState(false);

  const [buttonValue, setButtonValue] = useState("PUBLIC");

  const handleOnKeyDownBlockSpacebar = (e) => {
    if (e.code === "Space") e.nativeEvent.returnValue = false;
  };

  const handlePasswordInput = (e) => {
    const boardState = { ...board, password: e.target.value };
    setPassword(e.target.value);
    setBoard(boardState);
  };

  const handleIsPublicMode = (e) => {
    setButtonValue((prev) => {
      return e.target.value;
    });
  };

  useEffect(() => {
    board.password.length < 4
      ? setDisabledFooterButton(true)
      : setDisabledFooterButton(false);
  }, [board.password, setDisabledFooterButton]);

  useEffect(() => {
    board.password.length < 4
      ? setIsValidLength(false)
      : setIsValidLength(true);
  }, [setIsValidLength, board.password]);

  useEffect(() => {
    if (buttonValue === "PUBLIC") {
      let setPublicMode = { ...board, openType: "PUBLIC" };
      setBoard(setPublicMode);
    } else {
      let setPrivateMode = { ...board, openType: "PRIVATE" };
      setBoard(setPrivateMode);
    }
  }, [buttonValue, setBoard]);

  return (
    <CreateBoardStepContainer>
      <PasswordInputContainer>
        <p>보드&롤링페이퍼를 삭제하거나 공개모드를 변경할 수 있어요.</p>
      </PasswordInputContainer>
      <TextInput
        type="password"
        commonSize={true}
        value={board.password}
        placeholder="4자 이상 입력하세요."
        pattern="[0-9]*"
        onKeyDown={handleOnKeyDownBlockSpacebar}
        onChange={handlePasswordInput}
        onClickDelete={() => setBoard({ ...board, password: "" })}
        isValidLength={isValidLength}
      />
      {!isValidLength && (
        <WarningSpan show={isValidLength}>4자 이상 입력해주세요.</WarningSpan>
      )}
      <ModeContainer>
        <ModeSelectContainer>
          <Info />
          <p>공개/비공개 모드 선택</p>
        </ModeSelectContainer>

        <ButtonContainer>
          <ModeButton
            value="PUBLIC"
            className={board.openType === "PUBLIC" ? "active" : ""}
            onClick={handleIsPublicMode}
          >
            공개
          </ModeButton>{" "}
          <ModeButton
            value="PRIVATE"
            className={board.openType === "PRIVATE" ? "active" : ""}
            onClick={handleIsPublicMode}
          >
            비공개
          </ModeButton>
        </ButtonContainer>
      </ModeContainer>

      <Ballon>
        <CommonSpan>공개모드: 모두에게 공개</CommonSpan>
        <CommonSpan>
          비공개모드: 비밀번호를 입력 후 확인가능 전체 보드 검색에서 보이지
          않아요.
        </CommonSpan>
      </Ballon>
    </CreateBoardStepContainer>
  );
}

export default CreateBoardStep5;

const CreateBoardStepContainer = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  padding: 1.25rem;
`;

const PasswordInputContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  p {
    margin: 0;
    text-align: left;
    font-size: 0.9rem;
    color: ${(props) => props.theme.colors.grey_20};
  }
`;

const WarningSpan = styled.span`
  color: red;
  font-size: 0.9rem;
  margin-top: 0.7rem;
  visibility: ${(props) => (props.show ? "hidden" : "visible")};
`;

const ModeContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.25rem;
  p {
    margin: 0;
    font-weight: 500;
    font-size: 1rem;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  margin-left: 1rem;
  padding: 0.2rem;
  background-color: ${(props) => props.theme.colors.grey_50};
  border-radius: 4px;
`;

const ModeButton = styled.button`
  width: 50%;
  height: 1.75rem;
  background-color: transparent;
  border: none;
  border-radius: 4px;
  font-weight: 400;
  box-shadow: ${(props) => props.theme.shadows.shadow_2};

  &.active {
    background-color: ${(props) => props.theme.colors.white};
    font-weight: 600;
  }
`;

const CommonSpan = styled.span`
  text-align: left;
  font-weight: 500;
  font-size: 0.8rem;
  margin: 0.25rem;
  color: ${(props) => props.theme.colors.grey_20};
`;

const ModeSelectContainer = styled.div`
  display: flex;
  align-items: center;
  svg {
    margin-right: 0.75rem;
  }
  p {
    color: ${(props) => props.theme.colors.grey_10};
  }
`;

const Ballon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: absolute;
  width: 15rem;
  height: 6.25rem;
  top: 95%;
  background: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.grey_40};
  color: white;
  border-radius: 4px;
  padding: 0.5rem;

  &::before {
    border-color: ${(props) => props.theme.colors.grey_40} transparent;
    border-style: solid;
    border-width: 0 8px 8px 6.5px;
    content: "";
    display: block;
    left: 6px;
    position: absolute;
    top: -8px;
    width: 0;
    z-index: 0;
  }

  &::after {
    border-color: ${(props) => props.theme.colors.white} transparent;
    border-style: solid;
    border-width: 0 8px 8px 6.5px;
    content: "";
    display: block;
    left: 6px;
    position: absolute;
    top: -7px;
    width: 0;
    z-index: 1;
  }
`;
