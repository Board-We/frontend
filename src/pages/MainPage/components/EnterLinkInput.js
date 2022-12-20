import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const EnterLinkInput = () => {
  const navigate = useNavigate();
  const [linkText, setLinkText] = useState("");

  const handleChnageLinkTextInput = (e) => {
    setLinkText(e.target.value);
  };

  const handleClickEnterLinkButton = () => {
    navigate(linkText);
  };

  return (
    <EnterLinkInputContainer>
      <p>보드 링크로 입장하기</p>
      <EnterLinkInputBody>
        <LinkTextInput
          placeholder="링크를 입력하세요"
          onChange={handleChnageLinkTextInput}
        />
        <SubmitButton
          disabled={!Boolean(linkText)}
          onClick={handleClickEnterLinkButton}
        >
          확인
        </SubmitButton>
      </EnterLinkInputBody>
    </EnterLinkInputContainer>
  );
};

export default EnterLinkInput;

const EnterLinkInputContainer = styled.div`
  width: 100%;
  height: 10vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;

  p {
    width: 100%;
    text-align: start;
    margin: 0;
    font-weight: 600;
    font-size: 1.1rem;
    color: ${(props) => props.theme.colors.grey_10};
  }
`;

const EnterLinkInputBody = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 1rem;
`;

const LinkTextInput = styled.input`
  width: 100%;
  border: none;
  border-radius: 8px;
  padding: 1rem;
  margin-right: 1rem;
  background-color: ${(props) => props.theme.colors.grey_50};
  font-size: 1rem;
  &:focus {
    outline: none;
    border: 1px solid ${(props) => props.theme.colors.primary};
  }
`;

const SubmitButton = styled.button`
  width: 20%;
  height: 100%;
  background-color: ${(props) =>
    props.disabled ? props.theme.colors.grey_40 : props.theme.colors.primary_2};
  border: none;
  border-radius: 8px;
  color: ${(props) =>
    props.disabled ? props.theme.colors.grey_20 : props.theme.colors.black};
  padding: 1rem;
  cursor: pointer;
`;
