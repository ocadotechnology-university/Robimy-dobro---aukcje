import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { deepOrange } from '@mui/material/colors';

export default function LetterAvatars() {
    return (
        <Stack direction="row" spacing={2}>
            <Avatar style={{scale: 0.9}} sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
        </Stack>
    );
}