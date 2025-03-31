import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from "./components/NavBar/NavBar";
import img1 from "./image/image3.jpg"
import img2 from "./image/image4.jpg"
import Auth from "./components/GoogleLogin/Auth";
import Home from "./components/HomePage/HomePage";
import AddAuction from "./components/AddPage/AddPage";



function App() {
  return (
      <div className="Screen">
          <div className="LeftPanel">
              <img src={img2} alt="Left image" />
          </div>

          <div className="App">
              <BrowserRouter>
                  <Header />
                  <Routes>
                      <Route path="/" element={<Navigate to="/auth" />} />
                      <Route path="/auth" element={<Auth />} />
                      <Route path="/home" element={<Home />} />
                      <Route path="/add" element={<AddAuction />} />
                  </Routes>
              </BrowserRouter>
          </div>

          <div className="RightPanel">
              <img src={img1} alt="Left image" />
          </div>
      </div>
  );
}

export default App;