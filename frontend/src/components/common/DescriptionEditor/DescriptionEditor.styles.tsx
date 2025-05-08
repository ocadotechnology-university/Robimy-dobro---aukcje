import { Theme } from '@mui/material/styles';

export const WrapperStyle= (theme: Theme) => ({
    position: 'relative',
    width: '100%',
    border: '1px solid',
    borderColor: theme.palette.grey[400],
    borderRadius: 1,
    px: 1,
    pt: 1,
});

export const LabelStyle = (theme: Theme) => ({
    position: 'absolute',
    top: '-10px',
    left: '12px',
    backgroundColor: theme.palette.background.default,
    px: 0.5,
    fontSize: '0.75rem',
    color: theme.palette.text.secondary,
});

export const ContentStyle = {
    '& .ProseMirror': {
        minHeight: '5em',
        padding: '4px',
        overflowY: 'auto',
    },
};

export const ToolbarStyle = {
    padding: '2px 0 0 0',
    '& svg': {
        fontSize: '18px',
    },
};