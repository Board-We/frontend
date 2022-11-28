import styled from "styled-components";

const EnterWithLink = () => {
  return (
    <EnterWithLinkContainer>
      <p>보드 링크로 입장하기</p>
      <EnterWithLinkBody>
        <EnterWithLinkInput placeholder="링크를 입력하세요" />
        <EnterWithLinkButton>확인</EnterWithLinkButton>
      </EnterWithLinkBody>
    </EnterWithLinkContainer>
  );
};

export default EnterWithLink;

const EnterWithLinkContainer = styled.div`
  width: 100%;
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
    font-size: 1rem;
  }
`;

const EnterWithLinkBody = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: 1rem;
`;

const EnterWithLinkInput = styled.input`
  width: 100%;
  border: none;
  border-radius: 1.2rem;
  padding: 1rem;
  margin-right: 1rem;
  background-color: #efeff0;
`;

const EnterWithLinkButton = styled.button`
  width: 20%;
  height: 100%;
  background-color: #8d8d8d;
  border: none;
  border-radius: 1.2rem;
  color: white;
  padding: 1rem;
`;
