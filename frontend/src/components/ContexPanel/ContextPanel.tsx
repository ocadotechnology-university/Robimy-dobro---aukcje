import "./ContextPanel.css"
import React from "react";
import {Route, Routes} from "react-router-dom";
import Home from "../HomePage/HomePage";

function ContextPanel() {
    return (
        <main className="ContextPanel">
            <Routes>
                <Route path="/home" element={<Home />} />
            </Routes>
        </main>
    );
}

export default ContextPanel;
