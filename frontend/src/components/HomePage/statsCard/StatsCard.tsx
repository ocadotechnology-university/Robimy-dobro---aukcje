import React from "react";
import {Card, CardContent, Box, Typography, Stack} from "@mui/material";
import {motion} from 'framer-motion';
import CountUp from 'react-countup';
import {Link as RouterLink} from 'react-router-dom';
import {StatsCardProps} from "./StatsCardProps";
import {StatsCardStyle} from "./StatsCardStyle";
import {getVariant} from "./StatsCardAnimations";

const StatsCard = ({
                       icon,
                       title,
                       value,
                       suffix = '',
                       description,
                       animate = false,
                       useCounter = false,
                       iconColor = 'primary',
                       link,
                       animationVariant = 'fade',
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
                            <CountUp end={value} duration={2} separator=" "/>{suffix}
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
            variants={getVariant(animationVariant)}
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