import React from "react";
import { useEffect } from "react";
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import EndStep from "./steps/endStep";
import MakingStep from "./steps/makingStep";

const CreateMemoPage = () => {
  const { boardCode } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/board/${boardCode}/memo/making`);
  }, []);

  return (
    <PageWrapper>
      <Routes>
        <Route path={"/making"} element={<MakingStep boardCode={boardCode} />} />
        <Route path={"/end"} element={<EndStep boardCode={boardCode} />} />
      </Routes>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
`;

export default CreateMemoPage;
