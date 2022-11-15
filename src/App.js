import React from "react";
import "./App.css";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import { RecoilRoot } from "recoil";
import CreateBoardPage from "./pages/CreateBoardPage";

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/board/new" element={<CreateBoardPage />} />
            <Route path="/" element={<>test</>} />
          </Routes>
        </BrowserRouter>
      </div>
    </RecoilRoot>
  );
}

export default App;
