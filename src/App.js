import React, { useEffect } from "react";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import CreateBoardPage from "./pages/CreateBoardPage";
import CreateMemoPage from "./pages/createMemoPage";
import BoardPage from "./pages/BoardPage";
import Main from "./pages/MainPage";

function App() {

  useEffect(()=>{
    console.log(document.styleSheets)
  }, [])

  return (
    <RecoilRoot>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/board/new" element={<CreateBoardPage />} />
            <Route path="/memo/*" element={<CreateMemoPage />}></Route>
            <Route path="/board" element={<BoardPage />} />
            <Route path="/" element={<Main />} />
          </Routes>
        </BrowserRouter>
      </div>
    </RecoilRoot>
  );
}

export default App;
