import React from "react";
import Box from "@mui/material/Box";
import homeImage from "../../image/homePageImage.svg";

export const HomeImageStyle = {
    width: {
        xs: '30%',
        sm: '30%',
        md: '35% ',
        lg: '55%',
    },
    marginTop: {
        xs: '3vmin',
        sm: '3vmin',
        md: '4vmin',
        lg: '7vmin',
    }
};

const HomePageImage = () => {
    return (
        <Box component="img" src={homeImage} sx={HomeImageStyle}/>
    );
}

export default HomePageImage;