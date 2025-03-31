import { SxProps, Theme } from '@mui/material/styles';

export const FormContainerStyle: SxProps<Theme> = {
    height: '100dvh',
    py: 2,
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

export const PriceUnitStyle: SxProps<Theme> = {
    mt: '2px',
    fontSize: '0.95rem',
};

export const CheckboxBaseStyle: SxProps<Theme> = {
    color: '#666',
    backgroundColor: 'white',
    borderRadius: '4px',
    '&.Mui-checked': {
        color: '#666',
        backgroundColor: 'white',
    },
};

export const FormControlLabelBaseStyle: SxProps<Theme> = {
    width: 'fit-content',
    '& .MuiFormControlLabel-label': {
        fontSize: '15px',
    },
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

export const DateToggleGroupStyle: SxProps<Theme> = {
    display: 'flex',
    gap: 1,
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