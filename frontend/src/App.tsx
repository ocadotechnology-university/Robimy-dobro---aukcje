import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from "./components/TopPanel/TopPanel";
import Context from "./components/ContexPanel/ContextPanel";
import Auth from "./components/GoogleLogin/Auth";

function App() {
  return (
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
  );
}

export default App;
