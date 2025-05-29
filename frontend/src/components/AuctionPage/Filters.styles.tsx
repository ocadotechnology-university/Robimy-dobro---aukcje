import {SxProps, Theme} from '@mui/material/styles';

export const FiltersPaperStyle: SxProps<Theme> = {
    p: 2,
    minWidth: '18%',
    borderRadius: 4,
    alignSelf: 'flex-start',
    position: 'sticky',
    top: 80,
};

export const ClearAllTypographyStyle = (theme: Theme) => ({
    cursor: 'pointer',
    color: theme.palette.text.primary,
    fontSize: '0.9rem',
    fontWeight: 500,
    display: 'flex',
    alignItems: 'center',
});

export const SectionActionTypographyStyle: SxProps<Theme> = (theme) => ({
    cursor: 'pointer',
    color: theme.palette.text.primary,
    fontSize: '0.7rem',
    fontWeight: 500,
    margin: '0 !important',
});

export const FilterChipStyle: SxProps<Theme> = {
    fontSize: '0.7rem',
    textTransform: 'none',
};

export const MenuPaperStyle: SxProps<Theme> = (theme) => ({
    border: `1px solid ${theme.palette.grey[300]}`,
    borderTop: 0,
    borderRadius: '0 0 8px 8px',
    boxShadow: 0,
    mt: '-1px',
});

export const MenuItemStyle: SxProps<Theme> = {
    fontSize: '0.8rem',
    py: 0.5,
};