import React, { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import TextInput from "../../../components/TextInput";
import { boardState } from "../../../store";

function CreateBoardStep2() {
  const buttonValue = ["공개 모드", "프라이빗 모드"];
  const [board, setBoard] = useRecoilState(boardState);
  const [active, setActive] = useState("0");

  const handlePassword = (e) => {
    let setInput = { ...board, password: e.target.value };
    setBoard(setInput);
  };

  const handlePrivateMode = (e) => {
    setActive((prev) => {
      return e.target.value;
    });
  };

  useEffect(() => {
    if (active === "0") {
      let setPrivateFalse = { ...board, privateMode: false };
      setBoard(setPrivateFalse);
    } else {
      let setPrivateTrue = { ...board, privateMode: true };
      setBoard(setPrivateTrue);
    }
  }, [active]);

  return (
    <>
      <SubContainer>
        <h1>
          * 롤링페이퍼를 수집할수 있는 기간은 <br />
          &nbsp;언제인가요?
        </h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <div style={{ marginTop: "0.5rem" }}>
            <TextInput placeholder="YYYY.MM.DD" />{" "}
            <TextInput placeholder="00:00" /> 부터
          </div>
          <div>
            <TextInput placeholder="YYYY.MM.DD" />{" "}
            <TextInput placeholder="00:00" /> 까지
          </div>
        </div>
        <CommonSpan>
          기간은 최소 1시간부터 한달까지 설정할 수 있어요.
        </CommonSpan>
      </SubContainer>

      <SubContainer>
        <h1>
          * 롤링페이퍼를 확인할수 있는 기간은 <br />
          &nbsp;언제인가요?
        </h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <div style={{ marginTop: "0.5rem" }}>
            <TextInput placeholder="YYYY.MM.DD" />{" "}
            <TextInput placeholder="00:00" /> 부터
          </div>
          <div>
            <TextInput placeholder="YYYY.MM.DD" />{" "}
            <TextInput placeholder="00:00" /> 까지
          </div>
        </div>
        <CommonSpan>
          작성기간 이후부터 설정 할 수 있어요.
          <br />
          기간은 최소 1시간부터 한달까지 설정할 수 있어요.
        </CommonSpan>
      </SubContainer>

      <SubContainer>
        <h1>보드의 비밀번호를 설정할 수 있어요.</h1>
        <CommonSpan>
          비밀번호로 보드에 붙여진 롤링페이퍼를 삭제할 수 있어요.
        </CommonSpan>
        <TextInput
          type={"password"}
          placeholder="4자 이상 입력해주세요."
          onChange={handlePassword}
          commonSize
        />

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
        <CommonSpan>
          공개 모드 : 비밀번호로 삭제할 수 있어요. <br />
          프라이빗 모드 : 비밀번호가 있어야 보드를 확인할 수 있어요.
        </CommonSpan>
      </SubContainer>
    </>
  );
}

export default CreateBoardStep2;

export const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  h1 {
    font-size: 1.1rem;
    text-align: left;
    margin-bottom: 0;
  }
`;

export const CommonSpan = styled.span`
  text-align: left;
  font-weight: 500;
  font-size: 0.8rem;

  margin-top: 0.5rem;
  color: #797979;
`;

const ButtonContainer = styled.div`
  width: 100%;
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
