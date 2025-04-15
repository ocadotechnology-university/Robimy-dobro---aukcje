import { SxProps, Theme } from '@mui/material/styles';

export const WrapperStyle: SxProps<Theme> = {
    position: 'relative',
    width: '100%',
    border: '1px solid',
    borderColor: 'grey.400',
    borderRadius: 1,
    px: 1,
    pt: 1,
};

export const LabelStyle: SxProps<Theme> = {
    position: 'absolute',
    top: '-10px',
    left: '12px',
    backgroundColor: 'white',
    px: 0.5,
    fontSize: '0.75rem',
    color: 'text.secondary',
};

export const ContentStyle = {
    '& .ProseMirror': {
        minHeight: '5em',
        padding: '4px',
        overflowY: 'auto',
    },
};

export const ToolbarStyle: SxProps<Theme> = {
    padding: '2px 0 0 0',
    '& svg': {
        fontSize: '18px',
    },
};