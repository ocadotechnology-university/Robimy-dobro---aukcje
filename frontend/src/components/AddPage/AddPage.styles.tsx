import { SxProps, Theme } from '@mui/material/styles';

export const FormContainerStyle: SxProps<Theme> = {
    height: '100dvh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
};

export const ImageUploadStackStyle: SxProps<Theme> = {
    width: '100%',
    marginTop: 2,
};

export const ImageUploadBoxStyle: SxProps<Theme> = {
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