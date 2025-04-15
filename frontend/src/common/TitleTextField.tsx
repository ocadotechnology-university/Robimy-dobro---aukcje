import React from 'react';
import TextField from '@mui/material/TextField';

type TitleTextFieldProps = {
    title: string;
    setTitle: (value: string) => void;
};

const TitleTextField: React.FC<TitleTextFieldProps> = ({ title, setTitle }) => {
    return (
        <TextField
            label="Tytuł"
            variant="outlined"
            fullWidth
            value={title}
            size="small"
            onChange={(e) => setTitle(e.target.value)}
            InputLabelProps={{ shrink: true }}
        />
    );
};

export default TitleTextField;
