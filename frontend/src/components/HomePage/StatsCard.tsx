import React from "react";
import {Card, CardContent, Box, Typography, Stack} from "@mui/material";
import {motion} from 'framer-motion';
import CountUp from 'react-countup';
import {Link as RouterLink} from 'react-router-dom';

type StatsCardProps = {
    icon: React.ReactNode;
    title?: string;
    value?: number;
    suffix?: string;
    description: string;
    animate?: boolean;
    useCounter?: boolean;
    iconColor?: 'primary' | 'secondary';
    link?: string;
};

const cardVariants = {
    hidden: {opacity: 0, y: 50},
    visible: {opacity: 1, y: 0},
};

export const StatsCardStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    boxShadow: 3,
    p: 0,
    minWidth: 240,
    minHeight: 180,
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    '&:hover': {
        transform: 'scale(1.03)',
    },
    textDecoration: 'none',
};

const StatsCard = ({
                       icon,
                       title,
                       value,
                       suffix = '',
                       description,
                       animate = false,
                       useCounter = false,
                       iconColor = 'primary',
                       link
                   }: StatsCardProps) => {
    const card = (
        <Card sx={{
            ...StatsCardStyle,
            cursor: link ? 'pointer' : 'default',
        }}
              component={link ? RouterLink : 'div'}
              to={link || undefined}
        >
            <CardContent>
                <Stack
                    direction="column"
                    alignItems="center"
                    textAlign="center"
                    justifyContent="center"
                    spacing={1}
                >
                    <Box sx={{color: `${iconColor}.dark`, display: 'flex', justifyContent: 'center'}}>
                        {icon}
                    </Box>
                    {value !== undefined && useCounter ? (
                        <Typography variant="h2" fontWeight={600}>
                            <CountUp end={value} duration={3} separator=" "/>{suffix}
                        </Typography>
                    ) : (
                        title && (
                            <Typography variant="h2" fontWeight={600}>
                                {title}
                            </Typography>
                        )
                    )}
                    <Typography variant="h4">
                        {description}
                    </Typography>
                </Stack>
            </CardContent>
        </Card>
    );

    return animate ? (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{once: true, amount: 0.5}}
            transition={{duration: 0.6, ease: 'easeOut'}}
        >
            {card}
        </motion.div>
    ) : (
        card
    );
};

export default StatsCard;