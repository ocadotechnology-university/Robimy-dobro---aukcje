import React from 'react';
import './App.css';
import {BrowserRouter } from 'react-router-dom';
import Header from "./components/TopPanel/TopPanel";
import Context from "./components/ContexPanel/ContextPanel";
import img1 from "./image/image1.jpg"
import img2 from "./image/image2.jpg"
import img3 from "./image/image3.jpg"
import img4 from "./image/image4.jpg"

function App() {
  return (
      <div className="Screen">
          <div className="LeftPanel">
              <img src={img4} alt="Left image" />
          </div>

          <div className="App">
              <BrowserRouter>
                  <Header />
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
