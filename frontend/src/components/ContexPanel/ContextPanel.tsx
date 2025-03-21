import "./ContextPanel.css"
import React from "react";
import {Route, Routes} from "react-router-dom";
import Home from "../HomePage/HomePage";
import AddAuction from "../AddPage/AddPage";

function ContextPanel() {
    return (
        <main className="ContextPanel">
            <Routes>
                <Route path="/home" element={<Home />} />
                <Route path="/add" element={<AddAuction />} />
            </Routes>
        </main>
    );
}

export default ContextPanel;
