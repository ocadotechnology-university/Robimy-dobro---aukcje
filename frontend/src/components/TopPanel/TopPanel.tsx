import "./TopPanel.css"
import Avatar from "./Avatar"
import React from "react";

function TopPanel() {
    return (
        <header className="TopFrame">
            <div className="homeFrame">
                <button className="homeButton">
                    <span className="material-symbols-outlined">home</span>
                </button>
            </div>

            <div className="logoFrame">
                <div className="textLeft">
                    <span className="upText">Robimy</span>
                    <span className="downText">Dobro</span>
                </div>
                <span className="separator">|</span>
                <span className="year">2025</span>
            </div>


            <div className="addFrame">
                <button className="addButton">Dodaj aukcję</button>
            </div>
            <div className="AvatarContainer">
                <Avatar />
            </div>
        </header>
    );
}

export default TopPanel;
