import { SxProps, Theme } from '@mui/material/styles';

export const FormContainerStyle: SxProps<Theme> = {
    height: '100dvh',
    width: '55%',
    py: 2,
};

export const ImageUploadStackStyle: SxProps<Theme> = {
    width: '100%',
    marginTop: 2,
};

export const CityLabelIconWrapperStyle: SxProps<Theme> = {
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
};

export const CitySelectStyle: SxProps<Theme> = {
    width: '100%',
    maxWidth: 150,
};

export const DateToggleButtonStyle = (selected: boolean): SxProps<Theme> => ({
    borderRadius: '16px',
    textTransform: 'none',
    fontSize: '13px',
    fontWeight: selected ? 'bold' : 'normal',
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
    px: 1,
    py: 0.5,
});

export const FormButtonsWrapperStyle: SxProps<Theme> = {
    width: '100%',
    mt: 4,
    pb: 4,
};

export const BackButtonStyle: SxProps<Theme> = {
    borderRadius: '45px',
    fontWeight: 600,
    textTransform: 'none',
    px: 1,
    py: 0.5,
};

export const SubmitButtonStyle: SxProps<Theme> = {
    borderRadius: '45px',
    fontWeight: 600,
    textTransform: 'none',
    backgroundColor: 'rgba(236, 142, 6, 0.9)',
    color: 'white',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    px: 2,
    py: 0.5,
    '&:hover': {
        backgroundColor: 'rgba(236, 142, 6, 1)',
    },
};