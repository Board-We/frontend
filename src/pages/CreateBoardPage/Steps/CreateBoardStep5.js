import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import TextInput from "../../../components/TextInput";
import { boardState } from "../../../store";

function CreateBoardStep5({ setDisabledFooterButton }) {
  const [board, setBoard] = useRecoilState(boardState);
  const [password, setPassword] = useState("");
  const [isValidLength, setIsValidLength] = useState(false);

  const buttonValue = ["공개", "비공개"];
  const [active, setActive] = useState("0");

  const handlePasswordInput = (e) => {
    const boardState = { ...board, password: e.target.value };
    setPassword(e.target.value);
    setBoard(boardState);
  };

  const handlePrivateMode = (e) => {
    setActive((prev) => {
      return e.target.value;
    });
  };

  useEffect(() => {
    password.length < 4
      ? setDisabledFooterButton(true)
      : setDisabledFooterButton(false);
  }, [password, setDisabledFooterButton]);

  useEffect(() => {
    password.length < 4 ? setIsValidLength(false) : setIsValidLength(true);
  }, [setIsValidLength, password]);

  useEffect(() => {
    if (active === "0") {
      let setPublicMode = { ...board, openType: "PUBLIC" };
      setBoard(setPublicMode);
    } else {
      let setPrivateMode = { ...board, openType: "PRIVATE" };
      setBoard(setPrivateMode);
    }
  }, [active, setBoard]);

  return (
    <CreateBoardStepContainer>
      <PasswordInputContainer>
        <p>비밀번호</p> <span>보드와 롤링페이퍼 삭제 가능</span>
      </PasswordInputContainer>
      <TextInput
        type="password"
        commonSize={true}
        value={password}
        placeholder="4자 이상 입력해주세요."
        pattern="[0-9]*"
        onChange={handlePasswordInput}
        setTextState={setPassword}
        isValidLength={isValidLength}
      />
      {!isValidLength && (
        <WarningSpan show={isValidLength}>4자 이상 입력해주세요.</WarningSpan>
      )}
      <ModeContainer>
        <p>모드</p>{" "}
        <div>
          <ButtonContainer>
            {buttonValue.map((item, idx) => {
              return (
                <React.Fragment key={idx}>
                  <ModeButton
                    value={idx}
                    className={idx == active ? "active" : ""}
                    onClick={handlePrivateMode}
                  >
                    {item}
                  </ModeButton>
                </React.Fragment>
              );
            })}
          </ButtonContainer>
        </div>
      </ModeContainer>
      <CommonSpan>공개모드: 아무나 볼 수 있어요.</CommonSpan>
      <CommonSpan>
        비공개 모드: 비밀번호가 있어야 보드를 확인할 수 있어요.
      </CommonSpan>
    </CreateBoardStepContainer>
  );
}

export default CreateBoardStep5;

const CreateBoardStepContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  padding: 1.25rem;
`;

const CreateBoardStepCounter = styled.div`
  color: #bcbcbc;
  margin-bottom: 0.8rem;
  font-size: 1.2rem;
`;

const CreateBoardDescriptionText = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 1.5rem;
  p {
    text-align: left;
    font-weight: 600;
    font-size: 1.5rem;
    margin: 0;
    margin-bottom: 0.8rem;
  }
`;

const PasswordInputContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  p {
    margin: 0;
    font-weight: 700;
    font-size: 1.3rem;
  }
  span {
    margin: 0;
    color: #b1b1b1;
    font-size: 1rem;
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
  margin-top: 3rem;
  p {
    margin: 0;
    font-weight: 700;
    font-size: 1.3rem;
  }
`;

const ButtonContainer = styled.div`
  width: 40vw;
  margin-top: 0.75rem;
  background-color: #f0f0f0;
  border-radius: 4px;
`;

const ModeButton = styled.button`
  width: 50%;
  height: 2.5rem;
  background-color: #f0f0f0;
  border: none;
  border-radius: 4px;
  &.active {
    background-color: #d9d9d9;
    font-weight: 600;
  }
`;

const CommonSpan = styled.span`
  text-align: left;
  font-weight: 500;
  font-size: 0.8rem;
  margin-top: 0.6rem;
  color: #797979;
`;
