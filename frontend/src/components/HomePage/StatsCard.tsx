import React from "react";
import {Card, CardContent, Box, Typography, Stack} from "@mui/material";

type StatsCardProps = {
    icon: React.ReactNode;
    title: string;
    description: string;
    link?: string;
};

export const StatsCardStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    boxShadow: 2,
    p: 0,
    minWidth: 240,
    minHeight: 180,
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    '&:hover': {
        transform: 'scale(1.03)',
    },
};

const StatsCard = ({ icon, title, description, link }: StatsCardProps) => {
    return (
        <Card sx={StatsCardStyle}>
            <CardContent>
                <Stack
                    direction="column"
                    alignItems="center"
                    textAlign="center"
                    justifyContent="center"
                    spacing={1}
                >
                    <Box sx={{color: 'primary.dark', display: 'flex', justifyContent: 'center'}}>
                        {icon}
                    </Box>
                    <Typography variant="h2">
                        {title}
                    </Typography>
                    <Typography variant="h3">
                        {description}
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default StatsCard;