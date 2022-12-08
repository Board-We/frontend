import styled from "styled-components";

const ServiceFooter = () => {
  return (
    <ServiceFooterContainer>
      <ServiceFooterTitle>Team. 보드 위</ServiceFooterTitle>
      <ServiceFooterDescription>
        <p>서비스에 관해 궁금한게 있으신가요?</p>
        <p>페이지로 이동</p>
      </ServiceFooterDescription>
      <p>저작권 표시</p>
    </ServiceFooterContainer>
  );
};

export default ServiceFooter;

const ServiceFooterContainer = styled.footer`
  width: 100%;
  padding: 0.8rem;
  background-color: #f0f0f0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 20rem;
`;

const ServiceFooterTitle = styled.div`
  font-size: 1.4rem;
  font-weight: 500;
`;

const ServiceFooterDescription = styled.div`
  display: flex;

  p:first-child {
    margin-right: 0.5rem;
  }
`;
