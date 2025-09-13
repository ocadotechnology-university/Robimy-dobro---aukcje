import React from "react";
import {useState} from "react";
import {MenuItem, Select, Stack, Typography} from "@mui/material";
import {MenuItemStyle, MenuPaperStyle} from "./Filters.styles";

type SortSectionProps = {
    sort: string;
    setSort: (value: string) => void;
    options: string[];
};

const SortSection: React.FC<SortSectionProps> = ({sort, setSort, options}) => {
    const [open, setOpen] = useState(false);

    return (
        <Stack spacing={0.5}>
            <Typography variant="subtitle1" fontWeight={600}>
                Sortowanie
            </Typography>

            <Select
                open={open}
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                size="small"
                sx={{borderRadius: open ? '8px 8px 0 0' : '8px', fontSize: '0.8rem'}}
                MenuProps={{
                    PaperProps: {sx: MenuPaperStyle},
                    MenuListProps: {sx: {py: 0}},
                    disableScrollLock: true,
                }}
            >
                {options.map((option) => (
                    <MenuItem key={option} value={option} sx={MenuItemStyle}>
                        {option}
                    </MenuItem>
                ))}
            </Select>
        </Stack>
    );
};

export default SortSection;