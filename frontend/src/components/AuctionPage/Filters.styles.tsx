import { SxProps, Theme } from '@mui/material/styles';

export const FiltersPaperStyle: SxProps<Theme> = {
    p: 2,
    minWidth: { xs: '100%', sm: 250 },
};

export const ClearFiltersButtonStyle: SxProps<Theme> = {
    textTransform: 'none',
    minWidth: 'unset',
    padding: 0,
    fontSize: '0.75rem',
    '&:hover': {
        backgroundColor: 'transparent',
    },
};