import {useState} from "react";
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from "@mui/material/Typography";
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

const statusOptions = ["Bez daty", "Niekompletne", "Zatwierdzone"];
const selectedOptions = ["Moje aukcje", "Ulubione"];
const dateOptions = ["21 listopada", "22 listopada", "23 listopada"];

const Filters = () => {
    const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
    const [selectedDates, setSelectedDates] = useState<string[]>([]);

    const isAnySelected =
        selectedStatuses.length > 0 ||
        selectedTypes.length > 0 ||
        selectedDates.length > 0;

    const handleClearAll = () => {
        setSelectedStatuses([]);
        setSelectedTypes([]);
        setSelectedDates([]);
    };

    return (
        <Paper elevation={0} variant={"outlined"} sx={FiltersPaperStyle}>
                <Stack spacing={2}>
                    <FiltersHeader showClear={isAnySelected} onClearAll={handleClearAll} />

                    <FilterSection
                        title="Status aukcji"
                        icon={<ShieldIcon fontSize="small" sx={{ color: '#fbc02d' }} />}
                        options={statusOptions}
                        selectedOptions={selectedStatuses}
                        setSelectedOptions={setSelectedStatuses}
                    />

                    <FilterSection
                        title="Wybrane aukcje"
                        options={selectedOptions}
                        selectedOptions={selectedTypes}
                        setSelectedOptions={setSelectedTypes}
                    />

                    <FilterSection
                        title="Dzień"
                        options={dateOptions}
                        selectedOptions={selectedDates}
                        setSelectedOptions={setSelectedDates}
                    />
                </Stack>
            </Paper>
    );
};

type FiltersHeaderProps = {
    showClear: boolean;
    onClearAll: () => void;
};

const FiltersHeader = ({ showClear, onClearAll }: FiltersHeaderProps) => (
    <Stack direction="row" justifyContent="space-between">
        <Typography variant="h5" fontWeight={700}>
            Filtry
        </Typography>
        {showClear && (
            <Typography variant="body1" sx={ClearAllTypographyStyle} onClick={onClearAll}>
                Odznacz wszystkie
            </Typography>
        )}
    </Stack>
);

type FilterSectionProps = {
    title: string;
    icon?: React.ReactNode;
    options: string[];
    selectedOptions: string[];
    setSelectedOptions: React.Dispatch<React.SetStateAction<string[]>>;
};

const FilterSection: React.FC<FilterSectionProps> = ({
         title,
         icon,
         options,
         selectedOptions,
         setSelectedOptions,
     }) => {
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