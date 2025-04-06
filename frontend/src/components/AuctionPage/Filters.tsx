import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';

import {
    FiltersPaperStyle,
    ClearFiltersButtonStyle
} from './Filters.styles';

const Filters = () => {
    return (
        <Paper elevation={3} sx={FiltersPaperStyle}>
                <Stack spacing={2}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6" fontWeight={700}>
                            Filtry
                        </Typography>
                        <Button
                            variant="text"
                            size="small"
                            sx={ClearFiltersButtonStyle}
                        >
                            Odznacz wszystkie
                        </Button>
                    </Stack>
                </Stack>
            </Paper>
    );
}

export default Filters;