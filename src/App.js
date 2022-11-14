import React from "react";
import "./App.css";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import BoardOnMessagingPage from "./pages/BoardOnMessagingPage/index";
import { RecoilRoot } from "recoil";
import MakeMemoPage from "./pages/MakeMemoPage";
import CreateBoardSection2 from "./pages/CreateBoardPage-2";
import CreateBoardSection3 from "./pages/CreateBoardPage-3";

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/bomp" element={<BoardOnMessagingPage />} />
            <Route path="/mmp" element={<MakeMemoPage />} />
            <Route path="/createBoard/2" element={<CreateBoardSection2 />} />
            <Route path="/createBoard/3" element={<CreateBoardSection3 />} />
            <Route path="/" element={<>test</>} />
          </Routes>
        </BrowserRouter>
      </div>
    </RecoilRoot>
  );
}

export default App;
