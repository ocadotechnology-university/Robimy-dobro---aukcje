import React from 'react';
import './App.css';
import {BrowserRouter } from 'react-router-dom';
import Header from "./components/TopPanel/TopPanel";
import Context from "./components/ContexPanel/ContextPanel";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Header />
            <Context />
        </BrowserRouter>
    </div>
  );
}

export default App;
