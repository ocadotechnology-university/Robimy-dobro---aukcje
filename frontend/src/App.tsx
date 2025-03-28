import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from "./components/NavBar/NavBar";
import Context from "./components/ContexPanel/ContextPanel";
import img1 from "./image/image1.jpg"
import img2 from "./image/image2.jpg"
import img3 from "./image/image3.jpg"
import img4 from "./image/image4.jpg"
import Auth from "./components/GoogleLogin/Auth";

function App() {
  return (
      <div className="Screen">
          <div className="LeftPanel">
              <img src={img4} alt="Left image" />
          </div>

          <div className="App">
              <BrowserRouter>
                  <Header />
                      <Routes>
                          <Route path="/" element={<Navigate to="/Auth" />} />
                          <Route path="/Auth" element={<Auth />} />
                      </Routes>
                  <Context />
              </BrowserRouter>
          </div>

          <div className="RightPanel">
              <img src={img3} alt="Left image" />
          </div>
      </div>
  );
}

export default App;