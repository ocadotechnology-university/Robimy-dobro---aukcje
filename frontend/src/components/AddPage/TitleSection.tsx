import Box from "@mui/material/Box";
import React from "react";
import TitleTextField from "../common/TitleTextField";

type TitleSectionProps = {
    title: string;
    setTitle: (value: string) => void;
};

const TitleSection = ({title, setTitle}: TitleSectionProps) => (
    <Box sx={{width: '100%'}}>
        <TitleTextField title={title} setTitle={setTitle}/>
    </Box>
);

export default TitleSection;