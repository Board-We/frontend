import React from "react";
import styled from "styled-components";
import FooterButton from "../../components/FooterButton";
import UserInputSection from "./UserInputSection";

function CreateBoardSection2() {
  const handleOnclick = () => {
    console.log("nextPage");
  };
  return (
    <MainContainer>
      <UserInputSection />
      <PageFooter>
        <FooterButton color={"#3a3a3a"} text={"다음"} onClick={handleOnclick} />
      </PageFooter>
    </MainContainer>
  );
}

export default CreateBoardSection2;

const MainContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
`;

const PageFooter = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
