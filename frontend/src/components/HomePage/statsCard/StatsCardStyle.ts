export const StatsCardStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    boxShadow: 3,
    p: 0,
    minWidth: 240,
    minHeight: 180,
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
    '&:hover': {
        transform: 'scale(1.03)',
    },
    textDecoration: 'none',
};