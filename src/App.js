import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import CreateBoardPage from "./pages/CreateBoardPage";
import CreateMemoPage from "./pages/createMemoPage";
import Main from "./pages/MainPage";
import { deviceScreenState } from "./store";
import BoardPage from "./pages/BoardPage";

function App() {
  const setDeviceScreenSize = useSetRecoilState(deviceScreenState);

  useEffect(() => {
    addEventListenerResize();
  });

  const addEventListenerResize = () => {
    setDeviceScreenSize({
      x: window.screen.width,
      y: window.screen.height,
      rem: getComputedStyle(document.documentElement).fontSize,
    });
    window.addEventListener("resize", () => {
      setDeviceScreenSize({
        x: window.screen.width,
        y: window.screen.height,
        rem: getComputedStyle(document.documentElement).fontSize,
      });
    });
  };

  return (
    <div className="App">
      <Routes>
        <Route path="/board/new" element={<CreateBoardPage />} />
        <Route path="/memo/*" element={<CreateMemoPage />}></Route>
        <Route path="/board/*" element={<BoardPage />} />
        <Route path="/" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
