import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useRecoilState } from "recoil";
import CreateBoardPage from "./pages/CreateBoardPage";
import CreateMemoPage from "./pages/createMemoPage";
import Main from "./pages/MainPage";
import { deviceScreenState } from "./store";
import BoardPage from "./pages/BoardPage";
import styled from "styled-components";

function App() {
  const [deviceScreenSize, setDeviceScreenSize] =
    useRecoilState(deviceScreenState);

  useEffect(() => {
    addEventListenerResize();
  }, []);

  const addEventListenerResize = () => {
    setDeviceScreenSize({
      x: window.innerWidth,
      y: window.innerHeight,
      rem: getComputedStyle(document.documentElement).fontSize,
    });
    window.addEventListener("resize", () => {
      setDeviceScreenSize({
        x: window.innerWidth,
        y: window.innerHeight,
        rem: getComputedStyle(document.documentElement).fontSize,
      });
    });
  };

  return (
    <AppContainer height={deviceScreenSize.y}>
      <Routes>
        <Route path="/board/new" element={<CreateBoardPage />} />
        <Route
          path="/board/:boardCode/memo/*"
          element={<CreateMemoPage />}
        ></Route>
        <Route path="/board/:boardCode/" element={<BoardPage />} />
        <Route path="/" element={<Main />} />
      </Routes>
    </AppContainer>
  );
}

const AppContainer = styled.div`
  text-align: center;
  width: 100vw;
  /* galaxy fold half screen size: 280px */
  min-width: 280px;
  max-width: 600px;
  height: ${(props) => props.height}px;
  min-height: ${(props) => props.height}px;
  margin: 0;
  padding: 0;
  background-color: #ffffff;
`;

export default App;
