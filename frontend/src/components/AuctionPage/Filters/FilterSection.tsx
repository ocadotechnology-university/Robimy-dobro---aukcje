import React from "react";
import {Chip, Stack, Typography} from "@mui/material";
import {FilterChipStyle, SectionActionTypographyStyle} from "./Filters.styles";

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

            <Stack direction="column" alignItems="flex-start" spacing={1}>
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
            </Stack>
        </Stack>
    );
};

export default FilterSection;