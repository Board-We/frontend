import styled from "styled-components";
import ServiceNameHeader from "../../components/layout/headers/serviceNameHeader";
import ChipButton from "../../components/buttons/chipButton";
import Memo from "../../components/memo";

const BoardPage = () => {
  return (
    <PageWrapper>
      <BoardContainer>
        <ServiceNameHeader />
        <BoardBody>
          <BoardName>보드 이름</BoardName>
          <BoardDescription>보드 설명 보드 설명 어쩌구 저쩌구</BoardDescription>
          <BoardMemoGrid>
            <Memo text="메모 내용 어쩌구 저쩌구" />
            <Memo text="메모 내용 어쩌구 저쩌구" />
            <Memo text="메모 내용 어쩌구 저쩌구" />
          </BoardMemoGrid>
          <ChipButton text="롤링페이퍼 붙이기" />
        </BoardBody>
      </BoardContainer>
    </PageWrapper>
  );
};

export default BoardPage;

const PageWrapper = styled.div`
  position: relative;
  width: 100%;
  display: flex;
  min-height: 100vh;
  justify-content: center;
  align-items: flex-start;
`;

const BoardContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BoardBody = styled.div`
  width: 100%;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  padding: 0 1rem;
  padding-top: 5rem;
  background-color: #f3f3f3;
`;

const BoardMemoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  width: 100%;
  padding: 1rem;
`;

const BoardName = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
`;

const BoardDescription = styled.div``;
