import Button from "@mui/material/Button";
import React from "react";
import OutlinedActionButton from "./OutlinedActionButton";
import theme from "../../theme/theme";

interface CropConfirmButtonProps {
    onClick: () => void;
}

const CropConfirmButton = ({onClick}: CropConfirmButtonProps) => {
    return (
        <Button
            onClick={onClick}
            variant="outlined"
            color="inherit"
            sx={{
                [theme.breakpoints.up('xs')]: {
                    fontSize: '10px',
                },
                [theme.breakpoints.up('sm')]: {
                    fontSize: '11px',
                },
                [theme.breakpoints.up('md')]: {
                    fontSize: '14px',
                },
                [theme.breakpoints.up('lg')]: {
                    fontSize: '18px',
                },
                fontWeight: 600,
                borderRadius: 5,
                backgroundColor: theme.palette.primary.main,
                color: "white",
            }}
        >
            Zatwierdź
        </Button>
    );
};

export default CropConfirmButton;
