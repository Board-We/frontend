import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import TextInput from "../../../components/TextInput";
import { boardState } from "../../../store";

function CreateBoardStep2() {
  const [board, setBoard] = useRecoilState(boardState);

  const handlePassword = (e) => {
    let setInput = { ...board, password: e.target.value };
    setBoard(setInput);
  };

  const handlePrivateMode = (e) => {
    if (e.target.checked) {
      let setPrivateTrue = { ...board, privateMode: true };
      setBoard(setPrivateTrue);
    } else {
      let setPrivateFalse = { ...board, privateMode: false };
      setBoard(setPrivateFalse);
    }
  };

  console.log(board);
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

        <CheckBoxLabel htmlFor="private-mode">
          <CheckBoxInput
            type="checkbox"
            id="private-mode"
            onChange={handlePrivateMode}
          />
          <p>프라이빗 모드</p>
        </CheckBoxLabel>
        <CommonSpan style={{ marginLeft: "2rem", marginTop: 0 }}>
          비밀번호가 있는 사람만 들어올수 있어요.
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
  font-size: 0.7rem;

  margin-top: 0.5rem;
  color: #797979;
`;

const CheckBoxLabel = styled.label`
  display: flex;
  align-items: center;
  user-select: none;
  margin-top: 2rem;
  p {
    margin-left: 0.25rem;
  }
`;
const CheckBoxInput = styled.input`
  appearance: none;
  appearance: none;
  width: 1.5rem;
  height: 1.5rem;
  border: 1.5px solid gainsboro;
  border-radius: 0.4rem;

  &:checked {
    border-color: transparent;
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: gray;
  }
`;
