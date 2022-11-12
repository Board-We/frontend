import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import TextInput from "../../../components/TextInput";
import { boardState } from "../../../store";

function UserInputSection() {
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
          * 롤링페이퍼를 <br />
          작성할수 있는 기간은 <br />
          언제인가요?
        </h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ marginBottom: "1rem" }}>
            <TextInput placeholder="YYYY.MM.DD" />{" "}
            <TextInput placeholder="00:00" /> 부터
          </div>
          <div>
            <TextInput placeholder="YYYY.MM.DD" />{" "}
            <TextInput placeholder="00:00" /> 까지
          </div>
        </div>
        <CommonSpan>1시간부터 한달까지 설정할 수 있어요</CommonSpan>
      </SubContainer>

      <SubContainer>
        <h1>
          * 롤링페이퍼를 <br />
          확인할수 있는 기간은 <br />
          언제인가요?
        </h1>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ marginBottom: "1rem" }}>
            <TextInput placeholder="YYYY.MM.DD" />{" "}
            <TextInput placeholder="00:00" /> 부터
          </div>
          <div>
            <TextInput placeholder="YYYY.MM.DD" />{" "}
            <TextInput placeholder="00:00" /> 까지
          </div>
        </div>
        <CommonSpan>
          작성기간 이후부터 설정 할 수 있어요
          <br />
          최대 한달까지 설정할 수 있어요.
        </CommonSpan>
      </SubContainer>

      <SubContainer>
        <h1>보드의 비밀번호를 설정할 수 있어요.</h1>
        <TextInput
          type={"password"}
          placeholder="영어와 숫자가 섞인 8자 이상의 비밀번호를 입력해주세요."
          onChange={handlePassword}
          commonSize
        />
        <CommonSpan>
          설정된 비밀번호는 롤링페이퍼를 삭제하거나 프라이빗 모드로 사용할 수
          있어요.
        </CommonSpan>

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

export default UserInputSection;

export const SubContainer = styled.div`
  margin: 30px 20px 30px 20px;
  display: flex;
  flex-direction: column;
  h1 {
    font-size: 18px;
    text-align: left;
  }
`;

export const CommonSpan = styled.span`
  text-align: left;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  margin-top: 8px;
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
