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

export const CheckboxBaseStyle: SxProps<Theme> = {
    color: '#666',
    backgroundColor: 'white',
    borderRadius: '4px',
    py: 0.1,
    px: 0.1,
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


export const DescriptionWrapperStyle: SxProps<Theme> = {
    position: 'relative',
    width: '100%',
    border: '1px solid',
    borderColor: 'grey.400',
    borderRadius: 1,
    px: 1,
    pt: 1,
};

export const DescriptionLabelStyle: SxProps<Theme> = {
    position: 'absolute',
    top: '-10px',
    left: '12px',
    backgroundColor: 'white',
    px: 0.5,
    fontSize: '0.75rem',
    color: 'text.secondary',
};

export const EditorContentStyle = {
    '& .ProseMirror': {
        minHeight: '5em',
        padding: '4px',
        overflowY: 'auto',
    },
};

export const EditorToolbarStyle: SxProps<Theme> = {
    padding: '2px 0 0 0',
    '& svg': {
        fontSize: '18px',
    },
};