import React from 'react'
import './App.css';
import { Routes, BrowserRouter, Route } from 'react-router-dom'
import BoardOnMessagingPage from './pages/BoardOnMessagingPage/index'
import { RecoilRoot } from 'recoil'
import MakeMemoPage from './pages/MakeMemoPage';

function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/bomp" element={<BoardOnMessagingPage />} />
            <Route path="/mmp" element={<MakeMemoPage />} />
            <Route path="/" element={<>test</>} />
          </Routes>
        </BrowserRouter>
      </div>
    </RecoilRoot>
  );
}

export default App;
