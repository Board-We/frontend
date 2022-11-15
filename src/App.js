import React from "react";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import CreateBoardPage from "./pages/CreateBoardPage";
import CreateMemoPage from "./pages/createMemoPage";

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/board/new" element={<CreateBoardPage />} />
            <Route path="/memo/*" element={<CreateMemoPage />} >
            </Route>
            <Route path="/" element={<>test</>} />
          </Routes>
        </BrowserRouter>
      </div>
    </RecoilRoot>
  );
}

export default App;
