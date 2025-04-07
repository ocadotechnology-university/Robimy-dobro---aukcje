import {useState} from "react";
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";
import Button from '@mui/material/Button';
import ShieldIcon from '@mui/icons-material/Shield';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';

import {
    FiltersPaperStyle,
    SectionActionTypographyStyle,
    FilterChipStyle,
    StatusChipsContainerStyle,
    ClearAllTypographyStyle,
} from './Filters.styles';

const Filters = () => {
    const [selected, setSelected] = useState(false);
    return (
        <Paper elevation={0} variant={"outlined"} sx={FiltersPaperStyle}>
                <Stack spacing={2}>
                    <FiltersHeader />
                    <FilterSection
                        title="Status aukcji"
                        icon={<ShieldIcon fontSize="small" sx={{ color: '#fbc02d' }} />}
                        options={['Bez daty', 'Niekompletne', 'Zatwierdzone']}
                    />

                    <FilterSection
                        title="Wybrane aukcje"
                        options={['Moje aukcje', 'Ulubione']}
                    />

                    <FilterSection
                        title="Dzień"
                        options={['21 listopada', '22 listopada', '23 listopada']}
                    />
                </Stack>
            </Paper>
    );
}

const FiltersHeader = () => (
    <Stack direction="row" justifyContent="space-between">
        <Typography variant="h5" fontWeight={700}>
            Filtry
        </Typography>
        <Typography variant="body1" sx={ClearAllTypographyStyle}>
            Odznacz wszystkie
        </Typography>
    </Stack>
);

type FilterSectionProps = {
    title: string;
    icon?: React.ReactNode;
    options: string[];
};

const FilterSection = ({ title, icon, options }: FilterSectionProps) => {
    const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

    const toggleOption = (label: string) => {
        setSelectedOptions((prev) =>
            prev.includes(label)
                ? prev.filter((item) => item !== label)
                : [...prev, label]
        );
    };

    const hasAnySelected = selectedOptions.length > 0;

    return (
        <Stack spacing={0.5}>
            <Stack direction="row" alignItems="center" spacing={0.5}>
                <Typography variant="subtitle1" fontWeight={600}>
                    {title}
                </Typography>
                {icon}
            </Stack>

            <Typography
                onClick={() =>
                    hasAnySelected ? setSelectedOptions([]) : setSelectedOptions(options)
                }
                sx={SectionActionTypographyStyle}
            >
                {hasAnySelected ? 'Odznacz wszystkie' : 'Zaznacz wszystkie'}
            </Typography>

            <Box sx={StatusChipsContainerStyle}>
                {options.map((label) => (
                    <Chip
                        key={label}
                        label={label}
                        size="small"
                        variant={selectedOptions.includes(label) ? 'filled' : 'outlined'}
                        onClick={() => toggleOption(label)}
                        clickable
                        sx={FilterChipStyle}
                    />
                ))}
            </Box>
        </Stack>
    );
};

export default Filters;