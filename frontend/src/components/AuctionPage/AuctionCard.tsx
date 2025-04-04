import React from 'react';
import { Card, Grid, Stack } from '@mui/material';

const AuctionCard = () => {
    return (
        <Card>
            <Grid container spacing={2}>
                <Grid size={{ xs: 12, sm: 3 }}>
                    {/*Image*/}
                </Grid>
                <Grid size={{ xs: 12, sm: 9 }}>
                    <Stack spacing={1}>
                        {/*Auction content*/}
                    </Stack>
                </Grid>
            </Grid>
        </Card>
    );
};

export default AuctionCard;