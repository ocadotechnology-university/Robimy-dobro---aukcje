import React from "react";
import {Stack, Typography} from "@mui/material";

type StatsCardStackProps = {
    title?: string;
    children: React.ReactNode;
};

const StatsCardStack = ({title, children}: StatsCardStackProps) => {
    return (
        <Stack spacing={3} mt={4}>
            {title && (
                <Typography variant="h2" align="center">
                    {title}
                </Typography>
            )}
            <Stack direction="row" spacing={2.5} justifyContent="center">
                {children}
            </Stack>
        </Stack>
    );
};

export default StatsCardStack;