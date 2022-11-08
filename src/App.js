import React from 'react'
import './App.css';
import { Routes, BrowserRouter, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<>test</>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
