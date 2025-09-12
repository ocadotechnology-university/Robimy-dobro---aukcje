import Box from "@mui/material/Box";
import PriceTextField from "../common/PriceTextField";
import React from "react";

type PriceSectionProps = {
    price: string;
    setPrice: (value: string) => void;
};

const PriceSection = ({price, setPrice}: PriceSectionProps) => (
    <Box sx={{width: '25%'}}>
        <PriceTextField price={price} setPrice={setPrice}/>
    </Box>
);

export default PriceSection;