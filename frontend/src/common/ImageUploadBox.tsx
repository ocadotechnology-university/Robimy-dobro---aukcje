import React from 'react';
import { Box, SxProps, Theme } from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload';

const boxStyle: SxProps<Theme> = {
    alignSelf: 'center',
    width: 200,
    height: 120,
    border: '2px solid #aaa',
    borderRadius: 2,
    backgroundColor: '#ddd',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    '&:hover': {
        backgroundColor: '#f0f0f0',
    },
};

const ImageUploadBox = () => (
    <Box component="label" sx={boxStyle}>
        <UploadIcon fontSize="large" sx={{ color: '#666' }} />
    </Box>
);

export default ImageUploadBox;
