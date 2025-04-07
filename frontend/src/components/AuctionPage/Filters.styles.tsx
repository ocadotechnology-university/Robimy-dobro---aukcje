import { SxProps, Theme } from '@mui/material/styles';

export const FiltersPaperStyle: SxProps<Theme> = {
    p: 2,
    minWidth: { xs: '50%', sm: 250 },
    borderRadius: 4,
    alignSelf: 'flex-start',
};

export const ClearAllTypographyStyle: SxProps<Theme> = {
    cursor: 'pointer',
    color: 'primary.main',
    fontSize: '0.9rem',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
};

export const SectionActionTypographyStyle: SxProps<Theme> = {
    cursor: 'pointer',
    color: 'primary.main',
    fontSize: '0.7rem',
    fontWeight: 500,
    margin: '0 !important',
};

export const FilterChipStyle: SxProps<Theme> = {
    fontSize: '0.7rem',
    textTransform: 'none',
};

export const StatusChipsContainerStyle: SxProps<Theme> = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 1,
};