import "./AddPage.css"
import React, { useState } from "react";
import { TextField } from "@mui/material";

const AddPage: React.FC = () => {
    const [title, setTitle] = useState("");

    return (
        <main className="AddPage">
            <label className="ImageUploadFrame">
                <header className="ImageUploadTitle">Dodaj zdjęcie</header>
                <div className="ImageUploadBox">
                    <span className="material-symbols-outlined">upload</span>
                </div>
            </label>

            <div className="TitleFrame">
                <TextField
                    label="Tytuł"
                    variant="outlined"
                    fullWidth
                    value={title}
                    size={"small"}
                    onChange={(e) => setTitle(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                />
            </div>
        </main>
    );
}

export default AddPage;