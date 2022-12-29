import styled from "styled-components";

const ServiceFooter = () => {
  return (
    <ServiceFooterContainer>
      <ServiceFooterTitle>Team. Board.WE</ServiceFooterTitle>
      <ServiceFooterDescription>
        <p>서비스에 관해 궁금한게 있으신가요?</p>
        <p>페이지로 이동</p>
      </ServiceFooterDescription>
      <p>Copyright 2022. Board,we team. All rights reserved.</p>
    </ServiceFooterContainer>
  );
};

export default ServiceFooter;

const ServiceFooterContainer = styled.footer`
  width: 100%;
  padding: 2.5rem 1.5rem;
  background-color: ${(props) => props.theme.colors.grey_50};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-top: 27rem;
  margin-bottom: 7rem;

  p {
    margin: 0;
    color: ${(props) => props.theme.colors.grey_20};
  }
`;

const ServiceFooterTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
`;

const ServiceFooterDescription = styled.div`
  display: flex;
  margin-top: 1.2rem;

  p:first-child {
    margin-right: 0.5rem;
  }
`;
